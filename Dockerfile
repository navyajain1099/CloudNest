FROM python:3.12-slim

WORKDIR /app

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5173
ENV DATABASE_PATH=/data/eventvault.db
ENV UPLOAD_DIR=/data/uploads

RUN mkdir -p /data/uploads

EXPOSE 5173

CMD ["python", "server.py"]
