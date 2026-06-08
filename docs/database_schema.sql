CREATE TABLE clubs (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  club_id UUID REFERENCES clubs(id),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'photographer', 'member', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE events (
  id UUID PRIMARY KEY,
  club_id UUID NOT NULL REFERENCES clubs(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  starts_on DATE NOT NULL,
  ends_on DATE,
  cover_media_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE albums (
  id UUID PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  access_level TEXT NOT NULL CHECK (access_level IN ('public', 'private')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE media_assets (
  id UUID PRIMARY KEY,
  album_id UUID NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('photo', 'video')),
  access_level TEXT NOT NULL CHECK (access_level IN ('public', 'private')),
  storage_key TEXT NOT NULL,
  thumbnail_key TEXT,
  file_size_bytes BIGINT,
  width INT,
  height INT,
  duration_seconds INT,
  status TEXT NOT NULL DEFAULT 'processing',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE media_tags (
  media_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  confidence NUMERIC(5, 4),
  source TEXT NOT NULL CHECK (source IN ('ai', 'user', 'system')),
  PRIMARY KEY (media_id, tag)
);

CREATE TABLE face_embeddings (
  id UUID PRIMARY KEY,
  media_id UUID REFERENCES media_assets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  embedding VECTOR(512),
  confidence NUMERIC(5, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE likes (
  media_id UUID REFERENCES media_assets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (media_id, user_id)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY,
  media_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE favourites (
  media_id UUID REFERENCES media_assets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (media_id, user_id)
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  body TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_club_date ON events(club_id, starts_on DESC);
CREATE INDEX idx_media_event_access ON media_assets(event_id, access_level);
CREATE INDEX idx_media_uploaded_at ON media_assets(uploaded_at DESC);
CREATE INDEX idx_media_tags_tag ON media_tags(tag);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read_at);
