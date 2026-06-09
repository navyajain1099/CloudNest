# Deployment Guide

EventVault is deployable as a single Python web service. The backend serves the frontend, APIs, SQLite database, and uploaded media files.

## Local Production Run

```powershell
cd "C:\Users\navya\OneDrive\Desktop\Cig_dev"
python server.py
```

Open:

```text
http://127.0.0.1:5173/index.html
```

## Environment Variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Use `0.0.0.0` on deployment platforms. |
| `PORT` | `5173` | Web server port. Most hosts set this automatically. |
| `DATABASE_PATH` | `./eventvault.db` | SQLite database file. Use a persistent disk path in production. |
| `UPLOAD_DIR` | `./uploads` | Uploaded media storage directory. Use a persistent disk path in production. |

## Render Deployment

This repo includes `render.yaml`.

1. Push the project to GitHub.
2. In Render, create a new Blueprint from the repository.
3. Render will use:
   - `startCommand: python server.py`
   - `healthCheckPath: /api/health`
   - persistent disk mounted at `/var/data`
4. Open the Render URL after deploy.

## Docker Deployment

Build:

```bash
docker build -t eventvault .
```

Run with persistent data:

```bash
docker run -p 5173:5173 -v eventvault-data:/data eventvault
```

Open:

```text
http://127.0.0.1:5173/index.html
```

## What Is Real

- Event, media, notification, comments, likes, favourites, moderation, and tags persist in SQLite.
- Uploaded files are stored on the server filesystem.
- Frontend actions call backend APIs.
- Viewer API requests are filtered so private media records are not returned to unauthorized users.
- `/api/health` is available for deployment health checks.

## External Integrations

The project does not require AWS or paid ML credentials to deploy. Current storage and AI workflows run locally. For a production cloud version, replace the local storage functions in `server.py` with S3 upload/read adapters and replace deterministic AI tagging with a real ML service.
