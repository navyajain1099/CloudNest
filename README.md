# EventVault

EventVault is a presentable prototype for the **Event & Media Management Platform** problem statement. It helps clubs, photographers, and members organize event media, control access, discover photos, and interact with albums from a single workspace.

## What Is Built

- Event-wise albums with category/date metadata and sorting.
- Gallery search by event name, tag, upload date, uploader, access, and media type.
- Public/private access behavior with Admin, Photographer, Club Member, and Viewer roles.
- Drag-and-drop bulk upload with preview, access selection, and suggested AI tags.
- Social features: like, comment, share link, favourite, download, and notifications.
- Personalized face discovery section using a simulated face-match workflow.
- Watermarked photo download using club, event, and active role details.
- Analytics dashboard for engagement, storage mix, and tag coverage.
- Documentation, database schema, architecture diagram, API notes, and PPT deliverable.

## Run Locally

Open `index.html` in a browser.

No install step is required. The app is intentionally dependency-free so it can be reviewed quickly during demos.

## Suggested Demo Flow

1. Start on **Dashboard** and switch roles from the sidebar to show access control.
2. Go to **Events**, create a new event as Admin, then sort by name/date/category.
3. Go to **Gallery**, search for `sports`, `navya`, `workshop`, or `private`.
4. Switch to Viewer and confirm private media is locked.
5. Go to **Upload**, choose multiple local files as Admin or Photographer, preview them, and publish.
6. Use **Like**, **Comment**, **Favourite**, **Share**, and **Download** on a media card.
7. Go to **Face Match**, upload a selfie, and review personalized matches.
8. Finish with **Analytics** to show operational insight.

## Production Architecture

This prototype is browser-side for easy evaluation. A production implementation should split the platform into:

- Frontend: React or Next.js SPA/PWA.
- Backend API: Node.js/Express or NestJS.
- Database: PostgreSQL for users, events, albums, media metadata, comments, permissions, and audit logs.
- Object storage: AWS S3 with CloudFront CDN and signed URLs.
- AI services: image tagging, moderation, duplicate detection, and face embeddings.
- Realtime: WebSocket or managed pub/sub for notifications.
- Workers: asynchronous upload compression, watermarking, thumbnail generation, and indexing.

See `docs/architecture.md` and `docs/database_schema.sql` for implementation details.

## Folder Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── README.md
├── docs/
│   ├── api.md
│   ├── architecture.md
│   └── database_schema.sql
└── deliverables/
    └── EventVault-Pitch-Deck.pptx
```

## Notes

The current app simulates AI tagging, facial recognition, cloud storage, and realtime notifications in the browser. The code is structured so these behaviors can be replaced with backend APIs without changing the user-facing workflow.
