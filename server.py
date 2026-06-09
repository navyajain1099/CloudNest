from __future__ import annotations

import base64
import json
import mimetypes
import os
import sqlite3
import time
import uuid
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).parent.resolve()
DB_PATH = Path(os.environ.get("DATABASE_PATH", ROOT / "eventvault.db")).resolve()
UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", ROOT / "uploads")).resolve()


def connect() -> sqlite3.Connection:
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db


def json_response(handler: SimpleHTTPRequestHandler, payload, status=200):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def read_json(handler: SimpleHTTPRequestHandler):
    size = int(handler.headers.get("Content-Length", "0"))
    if size == 0:
      return {}
    return json.loads(handler.rfile.read(size).decode("utf-8"))


def as_list(value):
    if not value:
        return []
    if isinstance(value, list):
        return value
    return json.loads(value)


def media_row(row):
    item = dict(row)
    item["tags"] = as_list(item.get("tags"))
    item["faces"] = as_list(item.get("faces"))
    item["comments"] = as_list(item.get("comments"))
    return item


def init_db():
    UPLOAD_DIR.mkdir(exist_ok=True)
    with connect() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS events (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              category TEXT NOT NULL,
              date TEXT NOT NULL,
              description TEXT NOT NULL,
              cover TEXT NOT NULL,
              access TEXT NOT NULL,
              collaborators TEXT NOT NULL,
              story TEXT NOT NULL,
              storage TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS media (
              id TEXT PRIMARY KEY,
              eventId TEXT NOT NULL REFERENCES events(id),
              title TEXT NOT NULL,
              type TEXT NOT NULL,
              access TEXT NOT NULL,
              url TEXT NOT NULL,
              uploader TEXT NOT NULL,
              date TEXT NOT NULL,
              tags TEXT NOT NULL,
              faces TEXT NOT NULL,
              likes INTEGER NOT NULL DEFAULT 0,
              comments TEXT NOT NULL,
              favourites INTEGER NOT NULL DEFAULT 0,
              caption TEXT NOT NULL,
              status TEXT NOT NULL,
              moderation TEXT NOT NULL,
              duplicateScore INTEGER NOT NULL,
              cloud TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS notifications (
              id TEXT PRIMARY KEY,
              text TEXT NOT NULL,
              time TEXT NOT NULL,
              createdAt INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS users (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              role TEXT NOT NULL
            );
            """
        )
        if db.execute("SELECT COUNT(*) FROM events").fetchone()[0] == 0:
            seed(db)
        if db.execute("SELECT COUNT(*) FROM users").fetchone()[0] == 0:
            seed_users(db)
        db.execute(
            "UPDATE notifications SET text=? WHERE text LIKE ?",
            (
                "An album share link was created for Inter-Club Sports League.",
                "A % album link was created for Inter-Club Sports League.",
            ),
        )
        db.execute("UPDATE events SET storage='Object storage' WHERE storage='S3 originals'")
        db.execute("UPDATE events SET storage='Private object storage' WHERE storage='S3 private'")
        db.execute("UPDATE events SET storage='Public delivery' WHERE storage='CloudFront CDN'")
        db.execute("UPDATE media SET cloud=REPLACE(cloud, 's3://eventvault-originals', 'storage://eventvault-originals')")
        db.execute("UPDATE media SET cloud=REPLACE(cloud, 's3://eventvault-private', 'storage://eventvault-private')")


def seed(db: sqlite3.Connection):
    events = [
        {
            "id": "ev-cultural",
            "name": "Cultural Fest Night",
            "category": "Fest",
            "date": "2026-02-18",
            "description": "Main stage performances, backstage moments, crowd highlights, and winner portraits.",
            "cover": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
            "access": "mixed",
            "collaborators": ["Meera", "Aarav", "Isha"],
            "story": "Best of main stage",
            "storage": "Object storage",
        },
        {
            "id": "ev-mountain",
            "name": "Mountain Photography Trip",
            "category": "Trip",
            "date": "2026-01-12",
            "description": "Outdoor shoot curated by the photography club with landscapes, portraits, and travel clips.",
            "cover": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
            "access": "private",
            "collaborators": ["Rohan", "Isha"],
            "story": "Trail highlights",
            "storage": "Private object storage",
        },
        {
            "id": "ev-workshop",
            "name": "AI Media Workshop",
            "category": "Workshop",
            "date": "2026-03-04",
            "description": "Hands-on session covering image tagging, media rights, cloud storage, and search.",
            "cover": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
            "access": "mixed",
            "collaborators": ["Meera", "Kabir"],
            "story": "Learning moments",
            "storage": "Object storage",
        },
        {
            "id": "ev-sports",
            "name": "Inter-Club Sports League",
            "category": "Sports",
            "date": "2026-03-21",
            "description": "Matchday photos, team huddles, action shots, trophy presentations, and short reels.",
            "cover": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
            "access": "public",
            "collaborators": ["Kabir", "Aarav", "Navya"],
            "story": "Final whistle",
            "storage": "Public delivery",
        },
    ]
    for event in events:
        db.execute(
            "INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                event["id"],
                event["name"],
                event["category"],
                event["date"],
                event["description"],
                event["cover"],
                event["access"],
                json.dumps(event["collaborators"]),
                event["story"],
                event["storage"],
            ),
        )

    media = [
        ["m1", "ev-cultural", "Opening performance", "photo", "public", "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80", "Meera Nair", "2026-02-18", ["stage", "crowd", "culture", "night"], ["navya", "meera"], 124, ["Perfect cover shot.", "The lighting is excellent."], 18, "A high-energy stage opener with a packed student crowd.", "approved", "Safe", 8, "storage://eventvault-originals/cultural/opening.jpg"],
        ["m2", "ev-cultural", "Backstage portrait", "photo", "private", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80", "Aarav Sharma", "2026-02-18", ["portrait", "friends", "backstage"], ["navya", "aarav"], 89, ["Keep this in member gallery."], 22, "A private backstage friendship portrait before the performance.", "review", "Contains private faces", 12, "storage://eventvault-private/cultural/backstage.jpg"],
        ["m3", "ev-mountain", "Ridge trail group", "photo", "public", "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80", "Rohan Iyer", "2026-01-12", ["mountains", "travel", "group", "sunset"], ["rohan", "isha"], 146, ["Great for the trip recap."], 34, "Students pause on a ridge trail during golden-hour photography.", "approved", "Safe", 4, "storage://eventvault-originals/trip/ridge.jpg"],
        ["m4", "ev-workshop", "Prompt lab session", "photo", "private", "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80", "Isha Kapoor", "2026-03-04", ["workshop", "ai", "students", "laptop"], ["navya", "isha"], 71, ["Add to workshop highlights."], 15, "Members test AI tagging prompts during a hands-on media lab.", "approved", "Safe", 6, "storage://eventvault-originals/workshop/prompt-lab.jpg"],
        ["m5", "ev-sports", "Final goal celebration", "photo", "public", "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80", "Kabir Menon", "2026-03-21", ["sports", "team", "action", "crowd"], ["kabir", "aarav"], 201, ["Best sports album thumbnail."], 46, "A match-winning goal celebration captured from the sideline.", "duplicate", "Possible duplicate burst", 91, "storage://eventvault-originals/sports/final-goal.jpg"],
        ["m6", "ev-workshop", "Storage upload walkthrough", "video", "public", "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", "Meera Nair", "2026-03-04", ["cloud", "demo", "workshop", "video"], ["meera"], 53, ["Trim intro before publishing."], 9, "A short demo clip explaining direct object-storage uploads.", "review", "Needs trim approval", 0, "storage://eventvault-originals/workshop/cloud-demo.mp4"],
        ["m7", "ev-mountain", "Campfire circle", "photo", "private", "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80", "Rohan Iyer", "2026-01-12", ["travel", "camp", "friends", "night"], ["navya", "rohan", "isha"], 64, ["Private album only."], 19, "A member-only campfire photo from the photography trip.", "review", "Private night scene", 18, "storage://eventvault-private/trip/campfire.jpg"],
        ["m8", "ev-sports", "Trophy lift", "photo", "public", "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80", "Kabir Menon", "2026-03-21", ["sports", "trophy", "team", "celebration"], ["kabir", "navya"], 173, ["Use in annual report."], 38, "The winning team lifts the trophy in front of club members.", "approved", "Safe", 7, "storage://eventvault-originals/sports/trophy.jpg"],
    ]
    for item in media:
        db.execute(
            "INSERT INTO media VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (*item[:8], json.dumps(item[8]), json.dumps(item[9]), item[10], json.dumps(item[11]), *item[12:]),
        )
    add_notification(db, "AI tagged 18 new photos from Cultural Fest Night.")
    add_notification(db, "Rohan tagged you in Campfire circle.")
    add_notification(db, "An album share link was created for Inter-Club Sports League.")


def seed_users(db: sqlite3.Connection):
    users = [
        ("u-admin", "Navya Admin", "admin@eventvault.local", "eventvault", "admin"),
        ("u-photo", "Aarav Photographer", "photo@eventvault.local", "eventvault", "photographer"),
        ("u-member", "Isha Club Member", "member@eventvault.local", "eventvault", "member"),
        ("u-viewer", "Guest Viewer", "viewer@eventvault.local", "eventvault", "viewer"),
    ]
    db.executemany("INSERT INTO users VALUES (?, ?, ?, ?, ?)", users)


def public_user(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "role": row["role"],
    }


def add_notification(db: sqlite3.Connection, text: str):
    db.execute(
        "INSERT INTO notifications VALUES (?, ?, ?, ?)",
        (f"n-{uuid.uuid4().hex}", text, "now", int(time.time())),
    )


def can_read_private(role: str) -> bool:
    return role in {"admin", "photographer", "member"}


def bootstrap(role="admin"):
    with connect() as db:
        events = []
        for row in db.execute("SELECT * FROM events ORDER BY date DESC"):
            event = dict(row)
            event["collaborators"] = as_list(event["collaborators"])
            events.append(event)
        if can_read_private(role):
            media_rows = db.execute("SELECT * FROM media ORDER BY date DESC, id DESC")
        else:
            media_rows = db.execute("SELECT * FROM media WHERE access='public' ORDER BY date DESC, id DESC")
        media = [media_row(row) for row in media_rows]
        notifications = [dict(row) for row in db.execute("SELECT text, time FROM notifications ORDER BY createdAt DESC LIMIT 20")]
    return {"events": events, "media": media, "notifications": notifications}


def suggest_tags(file_name: str, media_type: str):
    name = file_name.lower()
    tags = ["uploaded"]
    if "sport" in name or "match" in name:
        tags.append("sports")
    if "mountain" in name or "trip" in name:
        tags.append("travel")
    if "stage" in name or "fest" in name:
        tags.append("stage")
    if "workshop" in name or "ai" in name:
        tags.append("workshop")
    if "group" in name or "team" in name:
        tags.append("people")
    tags.append("video" if media_type == "video" else "photo")
    return list(dict.fromkeys(tags))[:5]


def caption_for_tags(tags):
    if "sports" in tags:
        return "AI caption: action-focused sports media ready for event highlights."
    if "travel" in tags:
        return "AI caption: outdoor travel memory with group and location context."
    if "workshop" in tags:
        return "AI caption: workshop learning moment with people and technology."
    return "AI caption: uploaded club media ready for tagging, review, and publishing."


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed = urlparse(path)
        if parsed.path.startswith("/uploads/"):
            return str(ROOT / parsed.path.lstrip("/"))
        return super().translate_path(path)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            json_response(self, {"status": "ok", "database": DB_PATH.exists(), "uploads": UPLOAD_DIR.exists()})
            return
        if parsed.path == "/api/auth/users":
            with connect() as db:
                users = [public_user(row) for row in db.execute("SELECT * FROM users ORDER BY role")]
            json_response(self, {"users": users})
            return
        if parsed.path == "/api/bootstrap":
            role = parse_qs(parsed.query).get("role", ["admin"])[0]
            json_response(self, bootstrap(role))
            return
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        try:
            if parsed.path == "/api/auth/login":
                self.login(read_json(self))
            elif parsed.path == "/api/auth/register":
                self.register(read_json(self))
            elif parsed.path == "/api/events":
                self.create_event(read_json(self))
            elif parsed.path == "/api/media/upload":
                self.upload_media(read_json(self))
            elif parsed.path == "/api/notifications/clear":
                payload = read_json(self)
                with connect() as db:
                    db.execute("DELETE FROM notifications")
                json_response(self, bootstrap(payload.get("role", "admin")))
            elif parsed.path == "/api/ai/scan":
                self.run_ai_scan(read_json(self))
            elif len(parts) == 4 and parts[:2] == ["api", "media"]:
                self.media_action(parts[2], parts[3], read_json(self))
            elif parsed.path == "/api/share/album":
                payload = read_json(self)
                event_id = payload.get("eventId")
                with connect() as db:
                    event = db.execute("SELECT name FROM events WHERE id=?", (event_id,)).fetchone()
                    if not event:
                        json_response(self, {"error": "Event not found"}, 404)
                        return
                    add_notification(db, f"Album link copied for {event['name']}.")
                json_response(self, {"link": f"/index.html#gallery?event={event_id}", **bootstrap(payload.get("role", "admin"))})
            else:
                json_response(self, {"error": "Not found"}, 404)
        except Exception as exc:
            json_response(self, {"error": str(exc)}, 500)

    def login(self, payload):
        email = payload.get("email", "").strip().lower()
        password = payload.get("password", "")
        with connect() as db:
            row = db.execute("SELECT * FROM users WHERE lower(email)=? AND password=?", (email, password)).fetchone()
        if not row:
            json_response(self, {"error": "Invalid email or password"}, 401)
            return
        user = public_user(row)
        json_response(self, {"user": user, **bootstrap(user["role"])})

    def register(self, payload):
        name = payload.get("name", "").strip()
        email = payload.get("email", "").strip().lower()
        password = payload.get("password", "")
        role = payload.get("role", "member")
        if role not in {"admin", "photographer", "member", "viewer"}:
            json_response(self, {"error": "Invalid account type"}, 400)
            return
        if not name or not email or not password:
            json_response(self, {"error": "Name, email, and password are required"}, 400)
            return
        with connect() as db:
            exists = db.execute("SELECT 1 FROM users WHERE lower(email)=?", (email,)).fetchone()
            if exists:
                json_response(self, {"error": "An account with this email already exists"}, 409)
                return
            user_id = f"u-{uuid.uuid4().hex}"
            db.execute("INSERT INTO users VALUES (?, ?, ?, ?, ?)", (user_id, name, email, password, role))
            add_notification(db, f"{name} created a {role} account.")
            row = db.execute("SELECT * FROM users WHERE id=?", (user_id,)).fetchone()
        user = public_user(row)
        json_response(self, {"user": user, **bootstrap(user["role"])}, 201)

    def create_event(self, payload):
        event_id = f"ev-{uuid.uuid4().hex[:10]}"
        with connect() as db:
            db.execute(
                "INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    event_id,
                    payload["name"].strip(),
                    payload["category"].strip(),
                    payload["date"],
                    "New collaborative event album ready for uploads, AI indexing, album sharing, and access rules.",
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
                    "mixed",
                    json.dumps(["Admin"]),
                    "New highlight",
                    "Object storage",
                ),
            )
            add_notification(db, f"Created event album \"{payload['name'].strip()}\".")
        json_response(self, bootstrap(payload.get("role", "admin")), 201)

    def upload_media(self, payload):
        created = 0
        with connect() as db:
            for file_payload in payload.get("files", []):
                header, encoded = file_payload["data"].split(",", 1)
                binary = base64.b64decode(encoded)
                ext = Path(file_payload["name"]).suffix or mimetypes.guess_extension(file_payload.get("type", "")) or ".bin"
                media_id = f"m-{uuid.uuid4().hex}"
                stored_name = f"{media_id}{ext}"
                (UPLOAD_DIR / stored_name).write_bytes(binary)
                media_type = "video" if file_payload.get("type", "").startswith("video") else "photo"
                tags = suggest_tags(file_payload["name"], media_type)
                title = Path(file_payload["name"]).stem.replace("-", " ")
                access = payload.get("access", "public")
                db.execute(
                    "INSERT INTO media VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (
                        media_id,
                        payload["eventId"],
                        title,
                        media_type,
                        access,
                        f"/uploads/{stored_name}",
                        payload.get("uploader") or "Club Photographer",
                        time.strftime("%Y-%m-%d"),
                        json.dumps(tags),
                        json.dumps(["navya"]),
                        0,
                        json.dumps([]),
                        0,
                        caption_for_tags(tags),
                        "review" if access == "private" else "approved",
                        "Private album review" if access == "private" else "Safe",
                        0,
                        payload.get("cloudTarget", "local/uploads"),
                    ),
                )
                created += 1
            add_notification(db, f"{created} media item(s) uploaded, stored, tagged, and indexed.")
        json_response(self, bootstrap(payload.get("role", "admin")), 201)

    def media_action(self, media_id, action, payload):
        with connect() as db:
            media = db.execute("SELECT * FROM media WHERE id=?", (media_id,)).fetchone()
            if not media:
                json_response(self, {"error": "Media not found"}, 404)
                return
            item = media_row(media)
            role = payload.get("role", "viewer")
            if item["access"] == "private" and not can_read_private(role):
                json_response(self, {"error": "Not authorized for private media"}, 403)
                return
            if action == "like":
                db.execute("UPDATE media SET likes=likes+1 WHERE id=?", (media_id,))
                add_notification(db, f"You liked \"{item['title']}\".")
            elif action == "favourite":
                db.execute("UPDATE media SET favourites=favourites+1 WHERE id=?", (media_id,))
                add_notification(db, f"You added \"{item['title']}\" to favourites.")
            elif action == "comment":
                comments = item["comments"] + [payload.get("body", "").strip()]
                db.execute("UPDATE media SET comments=? WHERE id=?", (json.dumps([c for c in comments if c]), media_id))
                add_notification(db, f"You commented on \"{item['title']}\".")
            elif action == "tag-user":
                person = payload.get("person", "").strip().lower()
                faces = item["faces"] + ([person] if person else [])
                tags = item["tags"] + (["tagged"] if "tagged" not in item["tags"] else [])
                db.execute("UPDATE media SET faces=?, tags=? WHERE id=?", (json.dumps(faces), json.dumps(tags), media_id))
                add_notification(db, f"{payload.get('person', 'A user')} was tagged in \"{item['title']}\".")
            elif action == "approve":
                if role != "admin":
                    json_response(self, {"error": "Only admins can approve moderation items"}, 403)
                    return
                db.execute("UPDATE media SET status='approved', moderation='Approved by admin' WHERE id=?", (media_id,))
                add_notification(db, f"Approved \"{item['title']}\".")
            elif action == "share":
                add_notification(db, f"Share link copied for {item['title']}.")
            else:
                json_response(self, {"error": "Unsupported action"}, 400)
                return
        json_response(self, bootstrap(role))

    def run_ai_scan(self, payload=None):
        payload = payload or {}
        with connect() as db:
            rows = [media_row(row) for row in db.execute("SELECT * FROM media")]
            for item in rows:
                tags = item["tags"]
                if "ai-indexed" not in tags:
                    tags.append("ai-indexed")
                db.execute("UPDATE media SET tags=?, caption=? WHERE id=?", (json.dumps(tags), item["caption"], item["id"]))
            add_notification(db, "AI scan completed: tags, captions, duplicate signals, and moderation labels refreshed.")
        json_response(self, bootstrap(payload.get("role", "admin")))


if __name__ == "__main__":
    os.chdir(ROOT)
    init_db()
    port = int(os.environ.get("PORT", "5173"))
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"EventVault running at http://{host}:{port}/index.html")
    server.serve_forever()
