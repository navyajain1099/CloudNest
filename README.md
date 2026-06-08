# EventVault

EventVault is a polished prototype for the **Event & Media Management Platform** problem statement. It helps clubs, photographers, organizers, and members centralize event media, control access, discover photos, share albums, and manage AI-assisted workflows from one workspace.

## What Is Built

- Event-wise albums with category/date metadata, collaborators, storage labels, highlights, and sorting.
- Advanced gallery search by event, tag, upload date, uploader, face name, access, type, and review status.
- Public/private access behavior with Admin, Photographer, Club Member, and Viewer roles.
- Upload Studio with drag-and-drop bulk upload, previews, cloud target selection, generated tags, captions, and review status.
- Social features: like, comment, share, download with watermark, add to favourites, and tag friends/users.
- Realtime-style notifications for likes, tags, comments, album links, uploads, AI scans, and moderation actions.
- AI Lab for smart tags, AI captions, duplicate signals, moderation signals, and advanced search examples.
- Facial recognition workflow with reference selfie upload and personalized matching results.
- Cloud-ready storage model using S3/CloudFront style object paths and signed URL assumptions.
- Share Hub with QR-style album cards and copyable album links.
- Moderation Queue for private media, duplicate bursts, review items, and admin approval.
- Analytics dashboard for engagement, storage mix, AI tag coverage, and cloud usage.
- Documentation, database schema, architecture diagram, API notes, and PPT deliverable.

## Run Locally

Run the real integrated app with the local backend:

```powershell
cd "C:\Users\navya\OneDrive\Desktop\Cig_dev"
python server.py
```

Then open:

```text
http://127.0.0.1:5173/index.html
```

No install step is required. The backend uses Python standard library modules, SQLite, and local file storage in `uploads/`.

Do not use `python -m http.server` for the final demo, because that only serves static files and does not run the database/API layer.

## Suggested Demo Flow

1. Start on **Dashboard** and switch roles from the sidebar to show access control.
2. Use **Events** to create a collaborative album, open an album, and generate a QR share link.
3. Use **Gallery** to filter by event, access, media type, moderation status, and AI tags.
4. Switch to Viewer and confirm private media is locked while public media remains available.
5. Use **Upload Studio** to choose files, preview generated tags/captions, select a cloud target, and publish.
6. Open **AI Lab**, run an AI scan, then click search chips such as `sports trophy navya` or `private backstage`.
7. Use **Face Match**, upload a selfie, and review personalized matches.
8. Use **Share Hub** to copy QR album links.
9. Use **Moderation** as Admin to approve review/duplicate items.
10. Finish with **Analytics** to show engagement, storage, AI coverage, and cloud usage.

## Production Architecture

This prototype is browser-side for easy evaluation. A production implementation should split the platform into:

- Frontend: React or Next.js SPA/PWA.
- Backend API: Node.js/Express or NestJS.
- Database: PostgreSQL for users, events, albums, media metadata, comments, permissions, and audit logs.
- Object storage: AWS S3 with CloudFront CDN and signed URLs.
- AI services: image tagging, moderation, duplicate detection, captions, and face embeddings.
- Realtime: WebSocket or managed pub/sub for notifications.
- Workers: asynchronous upload compression, watermarking, thumbnail generation, indexing, and moderation.

See `docs/architecture.md` and `docs/database_schema.sql` for implementation details.

## Folder Structure

```text
.
|-- index.html
|-- styles.css
|-- app.js
|-- server.py
|-- eventvault.db
|-- uploads/
|-- README.md
|-- docs/
|   |-- api.md
|   |-- architecture.md
|   `-- database_schema.sql
|-- deliverables/
|   `-- EventVault-Pitch-Deck.pptx
`-- tools/
    `-- build_pitch_deck.py
```

## Notes

The app now uses a real local backend for events, media metadata, uploads, comments, likes, favourites, friend tags, AI scan updates, moderation approvals, sharing notifications, and persistence. Cloud storage and ML features are implemented through local working adapters and clearly named S3/AI boundaries, so they can be replaced with AWS S3, Rekognition, OpenSearch, or a custom ML service when credentials/models are available.
