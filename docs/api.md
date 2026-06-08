# API Notes

These endpoints describe the production API shape that would replace the current in-browser demo state.

## Auth

- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Events

- `GET /events?sort=date&category=Fest`
- `POST /events`
- `GET /events/:eventId`
- `PATCH /events/:eventId`
- `DELETE /events/:eventId`

## Media

- `POST /media/uploads/sign` returns signed S3 upload URLs.
- `POST /media` creates a pending media record.
- `GET /media?eventId=&tag=&access=&type=&q=`
- `GET /media/:mediaId`
- `POST /media/:mediaId/download` returns a watermarked signed URL.
- `POST /media/:mediaId/tags`

## Social

- `POST /media/:mediaId/likes`
- `DELETE /media/:mediaId/likes`
- `POST /media/:mediaId/comments`
- `POST /media/:mediaId/favourites`
- `POST /media/:mediaId/share`
- `POST /media/:mediaId/tag-users`

## AI

- `POST /ai/tag-media/:mediaId`
- `POST /ai/find-me` accepts a selfie reference and returns matching media IDs.
- `POST /ai/moderate/:mediaId`
- `POST /ai/deduplicate`

## Notifications

- `GET /notifications`
- `PATCH /notifications/:notificationId/read`
- `GET /notifications/stream` for WebSocket or server-sent events.
