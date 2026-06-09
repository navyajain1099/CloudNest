const state = {
  role: "admin",
  currentUser: null,
  view: "dashboard",
  query: "",
  selectedTag: "all",
  selectedEvent: "all",
  selectedAccess: "all",
  selectedType: "all",
  selectedStatus: "all",
  eventSort: "date",
  eventCategory: "all",
  previews: [],
  aiLastRun: "2 min ago",
  authMode: "login",
  notifications: [
    { text: "AI tagged 18 new photos from Cultural Fest Night.", time: "now" },
    { text: "Rohan tagged you in Campfire circle.", time: "8 min ago" },
    { text: "An album share link was created for Inter-Club Sports League.", time: "18 min ago" }
  ],
  events: [
    {
      id: "ev-cultural",
      name: "Cultural Fest Night",
      category: "Fest",
      date: "2026-02-18",
      description: "Main stage performances, backstage moments, crowd highlights, and winner portraits.",
      cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      access: "mixed",
      collaborators: ["Meera", "Aarav", "Isha"],
      story: "Best of main stage",
      storage: "Object storage"
    },
    {
      id: "ev-mountain",
      name: "Mountain Photography Trip",
      category: "Trip",
      date: "2026-01-12",
      description: "Outdoor shoot curated by the photography club with landscapes, portraits, and travel clips.",
      cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      access: "private",
      collaborators: ["Rohan", "Isha"],
      story: "Trail highlights",
      storage: "Private object storage"
    },
    {
      id: "ev-workshop",
      name: "AI Media Workshop",
      category: "Workshop",
      date: "2026-03-04",
      description: "Hands-on session covering image tagging, media rights, cloud storage, and search.",
      cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
      access: "mixed",
      collaborators: ["Meera", "Kabir"],
      story: "Learning moments",
      storage: "Object storage"
    },
    {
      id: "ev-sports",
      name: "Inter-Club Sports League",
      category: "Sports",
      date: "2026-03-21",
      description: "Matchday photos, team huddles, action shots, trophy presentations, and short reels.",
      cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
      access: "public",
      collaborators: ["Kabir", "Aarav", "Navya"],
      story: "Final whistle",
      storage: "Public delivery"
    }
  ],
  media: [
    {
      id: "m1",
      eventId: "ev-cultural",
      title: "Opening performance",
      type: "photo",
      access: "public",
      url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
      uploader: "Meera Nair",
      date: "2026-02-18",
      tags: ["stage", "crowd", "culture", "night"],
      faces: ["navya", "meera"],
      likes: 124,
      comments: ["Perfect cover shot.", "The lighting is excellent."],
      favourites: 18,
      caption: "A high-energy stage opener with a packed student crowd.",
      status: "approved",
      moderation: "Safe",
      duplicateScore: 8,
      cloud: "storage://eventvault-originals/cultural/opening.jpg"
    },
    {
      id: "m2",
      eventId: "ev-cultural",
      title: "Backstage portrait",
      type: "photo",
      access: "private",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
      uploader: "Aarav Sharma",
      date: "2026-02-18",
      tags: ["portrait", "friends", "backstage"],
      faces: ["navya", "aarav"],
      likes: 89,
      comments: ["Keep this in member gallery."],
      favourites: 22,
      caption: "A private backstage friendship portrait before the performance.",
      status: "review",
      moderation: "Contains private faces",
      duplicateScore: 12,
      cloud: "storage://eventvault-private/cultural/backstage.jpg"
    },
    {
      id: "m3",
      eventId: "ev-mountain",
      title: "Ridge trail group",
      type: "photo",
      access: "public",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
      uploader: "Rohan Iyer",
      date: "2026-01-12",
      tags: ["mountains", "travel", "group", "sunset"],
      faces: ["rohan", "isha"],
      likes: 146,
      comments: ["Great for the trip recap."],
      favourites: 34,
      caption: "Students pause on a ridge trail during golden-hour photography.",
      status: "approved",
      moderation: "Safe",
      duplicateScore: 4,
      cloud: "storage://eventvault-originals/trip/ridge.jpg"
    },
    {
      id: "m4",
      eventId: "ev-workshop",
      title: "Prompt lab session",
      type: "photo",
      access: "private",
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      uploader: "Isha Kapoor",
      date: "2026-03-04",
      tags: ["workshop", "ai", "students", "laptop"],
      faces: ["navya", "isha"],
      likes: 71,
      comments: ["Add to workshop highlights."],
      favourites: 15,
      caption: "Members test AI tagging prompts during a hands-on media lab.",
      status: "approved",
      moderation: "Safe",
      duplicateScore: 6,
      cloud: "storage://eventvault-originals/workshop/prompt-lab.jpg"
    },
    {
      id: "m5",
      eventId: "ev-sports",
      title: "Final goal celebration",
      type: "photo",
      access: "public",
      url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
      uploader: "Kabir Menon",
      date: "2026-03-21",
      tags: ["sports", "team", "action", "crowd"],
      faces: ["kabir", "aarav"],
      likes: 201,
      comments: ["Best sports album thumbnail."],
      favourites: 46,
      caption: "A match-winning goal celebration captured from the sideline.",
      status: "duplicate",
      moderation: "Possible duplicate burst",
      duplicateScore: 91,
      cloud: "storage://eventvault-originals/sports/final-goal.jpg"
    },
    {
      id: "m6",
      eventId: "ev-workshop",
      title: "Storage upload walkthrough",
      type: "video",
      access: "public",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      uploader: "Meera Nair",
      date: "2026-03-04",
      tags: ["cloud", "demo", "workshop", "video"],
      faces: ["meera"],
      likes: 53,
      comments: ["Trim intro before publishing."],
      favourites: 9,
      caption: "A short demo clip explaining direct object-storage uploads.",
      status: "review",
      moderation: "Needs trim approval",
      duplicateScore: 0,
      cloud: "storage://eventvault-originals/workshop/cloud-demo.mp4"
    },
    {
      id: "m7",
      eventId: "ev-mountain",
      title: "Campfire circle",
      type: "photo",
      access: "private",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
      uploader: "Rohan Iyer",
      date: "2026-01-12",
      tags: ["travel", "camp", "friends", "night"],
      faces: ["navya", "rohan", "isha"],
      likes: 64,
      comments: ["Private album only."],
      favourites: 19,
      caption: "A member-only campfire photo from the photography trip.",
      status: "review",
      moderation: "Private night scene",
      duplicateScore: 18,
      cloud: "storage://eventvault-private/trip/campfire.jpg"
    },
    {
      id: "m8",
      eventId: "ev-sports",
      title: "Trophy lift",
      type: "photo",
      access: "public",
      url: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80",
      uploader: "Kabir Menon",
      date: "2026-03-21",
      tags: ["sports", "trophy", "team", "celebration"],
      faces: ["kabir", "navya"],
      likes: 173,
      comments: ["Use in annual report."],
      favourites: 38,
      caption: "The winning team lifts the trophy in front of club members.",
      status: "approved",
      moderation: "Safe",
      duplicateScore: 7,
      cloud: "storage://eventvault-originals/sports/trophy.jpg"
    }
  ]
};

const roleCopy = {
  admin: "Full control over events, private albums, uploads, AI review, and moderation.",
  photographer: "Can upload media, manage own albums, view assignments, and submit review items.",
  member: "Can access member albums, comment, favourite, download, tag friends, and run face discovery.",
  viewer: "Can browse public albums, share public album links, and interact with public media."
};

const roleAccess = {
  admin: { private: true, upload: true, events: true, moderate: true },
  photographer: { private: true, upload: true, events: false, moderate: false },
  member: { private: true, upload: false, events: false, moderate: false },
  viewer: { private: false, upload: false, events: false, moderate: false }
};

const processingSteps = [
  ["Upload", "Signed URL"],
  ["Compress", "Thumbnail ready"],
  ["Tag", "AI labels"],
  ["Moderate", "Policy scan"],
  ["Index", "Searchable"]
];

const systemHealth = [
  ["Storage sync", "Object storage and private bucket active", "99.9%"],
  ["AI indexing", "Tags, captions, faces, duplicates", "Live"],
  ["Access policy", "Signed URLs enforced for private media", "Healthy"],
  ["Review queue", "Items waiting for admin decision", "3"]
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "API request failed");
  }
  return payload;
}

async function syncFromServer() {
  try {
    const data = await apiRequest(`/api/bootstrap?role=${encodeURIComponent(state.role)}`);
    applyServerState(data);
  } catch (error) {
    createNotification("Backend unavailable. Running with browser fallback data.");
  }
}

function applyServerState(data) {
  if (data.events) state.events = data.events;
  if (data.media) state.media = data.media;
  if (data.notifications) state.notifications = data.notifications;
  if (data.user) {
    state.currentUser = data.user;
    state.role = data.user.role;
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function eventById(id) {
  return state.events.find((event) => event.id === id);
}

function canView(media) {
  return media.access === "public" || roleAccess[state.role].private;
}

function showLogin() {
  $("#loginScreen").classList.remove("hidden");
}

function hideLogin() {
  $("#loginScreen").classList.add("hidden");
}

function saveSession(user) {
  localStorage.setItem("eventvault_user", JSON.stringify(user));
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem("eventvault_user") || "null");
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("eventvault_user");
}

function setAuthMode(mode) {
  state.authMode = mode;
  $("#loginForm").classList.toggle("register-mode", mode === "register");
  $("#authSubmit").textContent = mode === "register" ? "Create ID" : "Sign In";
  $$(".auth-tab").forEach((button) => button.classList.toggle("active", button.dataset.authMode === mode));
  $("#loginError").textContent = "";
  if (mode === "register" && $("#loginEmail").value.endsWith("@eventvault.local")) {
    $("#loginEmail").value = "";
    $("#loginPassword").value = "";
  }
  if (mode === "login" && !$("#loginPassword").value) {
    $("#loginPassword").value = "eventvault";
  }
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesQuery(media) {
  const event = eventById(media.eventId);
  const haystack = [
    media.title,
    media.uploader,
    media.date,
    media.access,
    media.type,
    media.status,
    media.caption,
    media.moderation,
    event?.name,
    event?.category,
    ...media.tags,
    ...media.faces
  ].map(normalize).join(" ");

  return haystack.includes(normalize(state.query));
}

function filteredMedia() {
  return state.media.filter((media) => {
    const tagMatch = state.selectedTag === "all" || media.tags.includes(state.selectedTag);
    const eventMatch = state.selectedEvent === "all" || media.eventId === state.selectedEvent;
    const accessMatch = state.selectedAccess === "all" || media.access === state.selectedAccess;
    const typeMatch = state.selectedType === "all" || media.type === state.selectedType;
    const statusMatch = state.selectedStatus === "all" || media.status === state.selectedStatus;
    return tagMatch && eventMatch && accessMatch && typeMatch && statusMatch && matchesQuery(media);
  });
}

function render() {
  updateNavigation();
  renderDashboard();
  renderEvents();
  renderGallery();
  renderUploadOptions();
  renderAiLab();
  renderMatches();
  renderSharing();
  renderModeration();
  renderAnalytics();
  renderNotifications();
}

function updateNavigation() {
  const labels = {
    dashboard: "Dashboard",
    events: "Events",
    gallery: "Gallery",
    upload: "Upload Studio",
    ai: "AI Lab",
    discover: "Face Match",
    sharing: "Share Hub",
    moderation: "Moderation",
    analytics: "Analytics"
  };
  $("#viewTitle").textContent = labels[state.view] || "Dashboard";
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === state.view));
  $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === state.view));
  $("#sessionName").textContent = state.currentUser?.name || "Signed out";
  $("#sessionRole").textContent = formatRole(state.role);
  $("#roleCopy").textContent = roleCopy[state.role];
}

function formatRole(role) {
  return {
    admin: "Admin",
    photographer: "Photographer",
    member: "Club Member",
    viewer: "Viewer"
  }[role] || role;
}

function renderDashboard() {
  const totalLikes = state.media.reduce((sum, media) => sum + media.likes, 0);
  const tagCount = new Set(state.media.flatMap((media) => media.tags)).size;
  const reviewCount = state.media.filter((media) => media.status !== "approved").length;
  const privateCount = state.media.filter((media) => media.access === "private").length;
  const userName = state.currentUser?.name?.split(" ")[0] || "there";
  $("#dashboardGreeting").textContent = `Welcome back, ${userName}. Here is the current media workload for your workspace.`;

  $("#statGrid").innerHTML = [
    ["Events", state.events.length, "active album spaces"],
    ["Assets", state.media.length, "photos and videos"],
    ["Private", privateCount, "authorized records"],
    ["AI coverage", tagCount, "searchable labels"],
    ["Review", reviewCount, "open decisions"]
  ].map(([label, value, copy]) => `
    <article class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${copy}</span>
    </article>
  `).join("");

  const queue = state.media
    .filter((media) => media.status !== "approved")
    .concat(state.media.filter((media) => media.status === "approved").slice(0, 3))
    .slice(0, 6);
  $("#activityFeed").innerHTML = queue.map((media) => `
    <article class="activity-item">
      <div>
        <strong>${media.title}</strong>
        <p>${media.status === "approved" ? "Recently indexed" : "Needs decision"} - ${eventById(media.eventId).name}</p>
      </div>
      <span class="risk-badge ${media.status}">${media.status}</span>
    </article>
  `).join("");

  const permissions = [
    ["View private media", roleAccess[state.role].private ? "Enabled" : "Public only"],
    ["Upload media", roleAccess[state.role].upload ? "Enabled" : "Restricted"],
    ["Create events", roleAccess[state.role].events ? "Enabled" : "Restricted"],
    ["Moderate queue", roleAccess[state.role].moderate ? "Enabled" : "Restricted"]
  ];
  $("#roleMatrix").innerHTML = permissions.map(([label, status]) => `
    <div class="matrix-row">
      <strong>${label}</strong>
      <span>${status}</span>
    </div>
  `).join("");

  $("#dashboardAlbums").innerHTML = state.events.slice(0, 4).map((event) => {
    const assets = state.media.filter((media) => media.eventId === event.id).length;
    return `
      <button class="album-mini" type="button" data-filter-event="${event.id}">
        <img src="${event.cover}" alt="${event.name}" />
        <span>${event.category}</span>
        <strong>${event.name}</strong>
        <small>${assets} assets - ${formatDate(event.date)}</small>
      </button>
    `;
  }).join("");

  const healthRows = systemHealth.map((row) => [...row]);
  healthRows[3][2] = String(reviewCount);
  $("#featureChecklist").innerHTML = healthRows.map(([label, detail, value]) => `
    <div class="matrix-row">
      <div>
        <strong>${label}</strong>
        <small>${detail}</small>
      </div>
      <span>${value}</span>
    </div>
  `).join("");
}

function renderEvents() {
  updateEventFilters();
  let events = [...state.events];
  if (state.eventCategory !== "all") {
    events = events.filter((event) => event.category === state.eventCategory);
  }
  events.sort((a, b) => {
    if (state.eventSort === "name") return a.name.localeCompare(b.name);
    if (state.eventSort === "category") return a.category.localeCompare(b.category);
    return new Date(b.date) - new Date(a.date);
  });

  $("#eventGrid").innerHTML = events.map((event) => {
    const assets = state.media.filter((media) => media.eventId === event.id);
    const people = event.collaborators.map((name) => `<span class="avatar">${name[0]}</span>`).join("");
    return `
      <article class="event-card">
        <div class="event-cover">
          <img src="${event.cover}" alt="${event.name}" />
          <span class="pill">${event.access}</span>
        </div>
        <div class="event-card-body">
          <span class="card-kicker">${event.category}</span>
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <div class="event-meta">
            <span>${formatDate(event.date)}</span>
            <span>${assets.length} assets</span>
            <span>${event.storage}</span>
          </div>
          <div class="collab-row">${people}<span>${event.collaborators.length} collaborators</span></div>
          <div class="media-actions">
            <button type="button" data-filter-event="${event.id}">Open Album</button>
            <button type="button" data-share-event="${event.id}">Share Album</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderGallery() {
  updateGalleryFilters();
  renderTagCloud();
  const items = filteredMedia();
  $("#gallerySummary").innerHTML = `
    <strong>${items.length}</strong>
    <span>matching assets</span>
    <p>${state.query ? `Search: ${state.query}` : "Use search, tags, access, type, and status filters."}</p>
  `;
  $("#mediaGrid").innerHTML = items.length ? items.map(renderMediaCard).join("") : `
    <div class="empty-state">No media matches the current filters.</div>
  `;
}

function renderMediaCard(media) {
  const event = eventById(media.eventId);
  const locked = !canView(media);
  const thumb = locked
    ? `<div class="locked"><strong>Private media</strong><span>Your account is not authorized to preview this item.</span></div>`
    : media.type === "video"
      ? `<video src="${media.url}" muted></video>`
      : `<img src="${media.url}" alt="${media.title}" />`;

  return `
    <article class="media-card">
      <button class="media-thumb" type="button" data-open-media="${media.id}" ${locked ? "disabled" : ""}>
        ${thumb}
        <span class="access-badge pill">${media.access}</span>
        <span class="media-status risk-badge ${media.status}">${media.status}</span>
      </button>
      <div class="media-body">
        <span class="card-kicker">${event.name}</span>
        <h3>${media.title}</h3>
        <p>${media.uploader} - ${formatDate(media.date)}</p>
        <div class="tag-list">${media.tags.slice(0, 4).map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="caption-box">${media.caption}</div>
        <div class="media-actions">
          <button type="button" data-like="${media.id}">Like ${media.likes}</button>
          <button type="button" data-comment="${media.id}">Comment</button>
          <button type="button" data-tag-user="${media.id}">Tag Friend</button>
          <button type="button" data-fav="${media.id}">Fav ${media.favourites}</button>
          <button type="button" data-download="${media.id}" ${locked ? "disabled" : ""}>Watermark</button>
          <button type="button" data-share="${media.id}">Share</button>
        </div>
      </div>
    </article>
  `;
}

function renderTagCloud() {
  const tags = ["all", ...new Set(state.media.flatMap((media) => media.tags))].slice(0, 26);
  $("#tagCloud").innerHTML = tags.map((tag) => `
    <button class="tag ${state.selectedTag === tag ? "active" : ""}" type="button" data-tag="${tag}">
      ${tag}
    </button>
  `).join("");
}

function renderUploadOptions() {
  $("#uploadEvent").innerHTML = state.events.map((event) => `<option value="${event.id}">${event.name}</option>`).join("");
  $("#publishUploads").disabled = !roleAccess[state.role].upload || state.previews.length === 0;
  $("#chooseFiles").disabled = !roleAccess[state.role].upload;

  $("#processingBoard").innerHTML = processingSteps.map(([step, status]) => `
    <div class="processing-step">
      <strong>${step}</strong>
      <span>${state.previews.length ? "Ready" : status}</span>
    </div>
  `).join("");

  $("#previewGrid").innerHTML = state.previews.length ? state.previews.map((file, index) => `
    <article class="upload-card">
      ${file.type.startsWith("video")
        ? `<video src="${file.url}" muted controls></video>`
        : `<img src="${file.url}" alt="${file.name}" />`}
      <h3>${file.name}</h3>
      <p>${file.type || "media"} - ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
      <div class="tag-list">${suggestTags(file.name).map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <div class="caption-box">${captionForTags(suggestTags(file.name))}</div>
      <button class="ghost-btn" type="button" data-remove-preview="${index}">Remove</button>
    </article>
  `).join("") : `<div class="empty-state">${roleAccess[state.role].upload ? "Selected files will appear here with generated tags, captions, and review status." : "Current role cannot upload media."}</div>`;
}

function renderAiLab() {
  $("#aiTagBoard").innerHTML = state.media.slice(0, 6).map((media) => {
    const visual = media.type === "video"
      ? `<video src="${media.url}" muted></video>`
      : `<img src="${media.url}" alt="${media.title}" />`;
    return `
      <article class="ai-card">
        ${visual}
        <div>
          <strong>${media.title}</strong>
          <p>${media.caption}</p>
          <div class="tag-list">${media.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        </div>
      </article>
    `;
  }).join("");

  $("#duplicateBoard").innerHTML = state.media
    .filter((media) => media.duplicateScore > 10)
    .map((media) => `
      <div class="stack-item">
        <strong>${media.title}</strong>
        <span>${media.duplicateScore}% similarity</span>
      </div>
    `).join("");

  $("#moderationSignals").innerHTML = state.media
    .filter((media) => media.status !== "approved")
    .map((media) => `
      <div class="stack-item">
        <strong>${media.moderation}</strong>
        <span>${media.title}</span>
      </div>
    `).join("");

  $("#queryChips").innerHTML = [
    "sports trophy navya",
    "private backstage",
    "workshop cloud video",
    "mountains sunset rohan",
    "review duplicate"
  ].map((query) => `<button type="button" data-query="${query}">${query}</button>`).join("");
}

function renderMatches() {
  const matches = state.media.filter((media) => canView(media) && media.faces.includes("navya"));
  $("#matchCount").textContent = `${matches.length} matches`;
  $("#matchGrid").innerHTML = matches.length ? matches.map(renderMediaCard).join("") : `
    <div class="empty-state">No accessible matches for the current role.</div>
  `;
}

function renderSharing() {
  $("#shareGrid").innerHTML = state.events.map((event) => {
    const assets = state.media.filter((media) => media.eventId === event.id);
    return `
      <article class="share-card">
        <span class="card-kicker">${event.category}</span>
        <h3>${event.name}</h3>
        <p>${assets.length} assets - ${event.access} album - ${event.storage}</p>
        ${shareLinkPreview(event.id)}
        <div class="media-actions">
          <button type="button" data-copy-album="${event.id}">Copy Album Link</button>
          <button type="button" data-filter-event="${event.id}">Open</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderModeration() {
  const items = state.media.filter((media) => media.status !== "approved");
  $("#moderationGrid").innerHTML = items.length ? items.map((media) => {
    const visual = media.type === "video"
      ? `<video src="${media.url}" muted></video>`
      : `<img src="${media.url}" alt="${media.title}" />`;
    return `
      <article class="moderation-card">
        ${visual}
        <div class="event-meta">
          <span class="risk-badge ${media.status}">${media.status}</span>
          <span>${media.moderation}</span>
        </div>
        <h3>${media.title}</h3>
        <p>${eventById(media.eventId).name} - ${media.uploader}</p>
        <div class="moderation-actions">
          <button class="primary-btn" type="button" data-approve="${media.id}">Approve</button>
          <button class="secondary-btn" type="button" data-keep-review="${media.id}">Keep Review</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Everything is approved.</div>`;
}

function renderAnalytics() {
  const maxEngagement = Math.max(...state.events.map((event) => eventEngagement(event.id)));
  $("#engagementChart").innerHTML = state.events.map((event) => {
    const value = eventEngagement(event.id);
    const width = maxEngagement ? Math.round((value / maxEngagement) * 100) : 0;
    return `
      <div class="bar-row">
        <strong>${event.name}</strong>
        <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
        <span>${value}</span>
      </div>
    `;
  }).join("");

  $("#storageChart").innerHTML = `
    <div class="donut">
      <span>${state.media.length}<br />assets</span>
    </div>
  `;

  const coverage = [...new Set(state.media.flatMap((media) => media.tags))]
    .map((tag) => [tag, state.media.filter((media) => media.tags.includes(tag)).length])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 9);
  $("#tagCoverage").innerHTML = coverage.map(([tag, count]) => `
    <div class="matrix-row"><span>${tag}</span><strong>${count} assets</strong></div>
  `).join("");

  $("#cloudUsage").innerHTML = [
    ["Original storage", "42.8 GB"],
    ["Compressed delivery", "11.4 GB"],
    ["Private signed reads", "218"],
    ["Watermarked downloads", "76"],
    ["Delivery cache hit", "91%"]
  ].map(([label, value]) => `
    <div class="stack-item"><strong>${label}</strong><span>${value}</span></div>
  `).join("");
}

function renderNotifications() {
  $("#notificationDot").classList.toggle("hidden", state.notifications.length === 0);
  $("#notificationList").innerHTML = state.notifications.length ? state.notifications.map((item) => `
    <article class="notification-item">
      <p>${item.text}</p>
      <span>${item.time}</span>
    </article>
  `).join("") : `<div class="empty-state">No new notifications.</div>`;
}

function updateEventFilters() {
  const categories = ["all", ...new Set(state.events.map((event) => event.category))];
  $("#categoryFilter").innerHTML = categories.map((category) => `
    <option value="${category}" ${state.eventCategory === category ? "selected" : ""}>${category === "all" ? "All" : category}</option>
  `).join("");
  $("#eventSort").value = state.eventSort;
}

function updateGalleryFilters() {
  $("#eventFilter").innerHTML = `<option value="all">All events</option>${state.events.map((event) => `
    <option value="${event.id}" ${state.selectedEvent === event.id ? "selected" : ""}>${event.name}</option>
  `).join("")}`;
  $("#eventFilter").value = state.selectedEvent;
  $("#accessFilter").value = state.selectedAccess;
  $("#typeFilter").value = state.selectedType;
  $("#statusFilter").value = state.selectedStatus;
}

function eventEngagement(eventId) {
  return state.media
    .filter((media) => media.eventId === eventId)
    .reduce((sum, media) => sum + media.likes + media.comments.length + media.favourites, 0);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function suggestTags(fileName) {
  const name = normalize(fileName);
  const tags = new Set(["uploaded"]);
  if (name.includes("sport") || name.includes("match")) tags.add("sports");
  if (name.includes("mountain") || name.includes("trip")) tags.add("travel");
  if (name.includes("stage") || name.includes("fest")) tags.add("stage");
  if (name.includes("workshop") || name.includes("ai")) tags.add("workshop");
  if (name.includes("group") || name.includes("team")) tags.add("people");
  tags.add(name.match(/\.(mp4|mov|webm)$/) ? "video" : "photo");
  return [...tags].slice(0, 5);
}

function captionForTags(tags) {
  if (tags.includes("sports")) return "AI caption: action-focused sports media ready for event highlights.";
  if (tags.includes("travel")) return "AI caption: outdoor travel memory with group and location context.";
  if (tags.includes("workshop")) return "AI caption: workshop learning moment with people and technology.";
  return "AI caption: uploaded club media ready for tagging, review, and publishing.";
}

function createNotification(text) {
  state.notifications.unshift({ text, time: "now" });
  renderNotifications();
}

function openMedia(id) {
  const media = state.media.find((item) => item.id === id);
  if (!media || !canView(media)) return;
  const event = eventById(media.eventId);
  $("#dialogContent").innerHTML = `
    <div class="dialog-layout">
      ${media.type === "video"
        ? `<video src="${media.url}" controls autoplay></video>`
        : `<img src="${media.url}" alt="${media.title}" />`}
      <aside class="dialog-side">
        <span class="pill">${media.access}</span>
        <span class="risk-badge ${media.status}">${media.status}</span>
        <h2>${media.title}</h2>
        <p>${event.name}</p>
        <p>${media.uploader} - ${formatDate(media.date)}</p>
        <div class="tag-list">${media.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="caption-box">${media.caption}</div>
        <h3>Cloud object</h3>
        <p>${media.cloud}</p>
        <h3>Detected faces</h3>
        <p>${media.faces.join(", ")}</p>
        <h3>Comments</h3>
        ${media.comments.map((comment) => `<p>${comment}</p>`).join("") || "<p>No comments yet.</p>"}
      </aside>
    </div>
  `;
  $("#mediaDialog").showModal();
}

function downloadWatermarked(id) {
  const media = state.media.find((item) => item.id === id);
  if (!media || !canView(media) || media.type !== "photo") {
    createNotification("Video downloads and private locked media are disabled in this demo.");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    const event = eventById(media.eventId);
    const label = `EventVault - ${event.name} - ${state.role}`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, canvas.height - 78, canvas.width, 78);
    ctx.fillStyle = "#fff";
    ctx.font = `${Math.max(24, Math.round(canvas.width / 38))}px Arial`;
    ctx.fillText(label, 28, canvas.height - 30);
    const link = document.createElement("a");
    link.download = `${media.title.toLowerCase().replaceAll(" ", "-")}-watermarked.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    createNotification(`Downloaded watermarked copy of ${media.title}.`);
  };
  img.onerror = () => createNotification("This browser blocked watermarking for the remote image.");
  img.src = media.url;
}

function shareLinkPreview(eventId) {
  return `<div class="share-link-preview">${location.origin || "http://localhost:5173"}/index.html#gallery?event=${eventId}</div>`;
}

function bindEvents() {
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setView(link.dataset.viewLink);
    });
  });

  $$("[data-jump]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.jump)));
  $("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    $("#loginError").textContent = "";
    try {
      const endpoint = state.authMode === "register" ? "/api/auth/register" : "/api/auth/login";
      const requestBody = state.authMode === "register"
        ? {
            name: $("#registerName").value,
            email: $("#loginEmail").value,
            password: $("#loginPassword").value,
            role: $("#registerRole").value
          }
        : {
            email: $("#loginEmail").value,
            password: $("#loginPassword").value
          };
      const payload = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(requestBody)
      });
      applyServerState(payload);
      saveSession(payload.user);
      hideLogin();
      render();
    } catch (error) {
      $("#loginError").textContent = error.message;
    }
  });
  $("#logoutButton").addEventListener("click", () => {
    clearSession();
    state.currentUser = null;
    state.role = "viewer";
    showLogin();
  });
  $$(".auth-tab").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });
  $("#globalSearch").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderGallery();
    renderMatches();
  });
  $("#eventSort").addEventListener("change", (event) => {
    state.eventSort = event.target.value;
    renderEvents();
  });
  $("#categoryFilter").addEventListener("change", (event) => {
    state.eventCategory = event.target.value;
    renderEvents();
  });
  $("#eventFilter").addEventListener("change", (event) => {
    state.selectedEvent = event.target.value;
    renderGallery();
  });
  $("#accessFilter").addEventListener("change", (event) => {
    state.selectedAccess = event.target.value;
    renderGallery();
  });
  $("#typeFilter").addEventListener("change", (event) => {
    state.selectedType = event.target.value;
    renderGallery();
  });
  $("#statusFilter").addEventListener("change", (event) => {
    state.selectedStatus = event.target.value;
    renderGallery();
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;
    if (target.dataset.tag) {
      state.selectedTag = target.dataset.tag;
      renderGallery();
    }
    if (target.dataset.openMedia) openMedia(target.dataset.openMedia);
    if (target.dataset.like) updateMetric(target.dataset.like, "likes", 1, "liked");
    if (target.dataset.fav) updateMetric(target.dataset.fav, "favourites", 1, "added to favourites");
    if (target.dataset.comment) addComment(target.dataset.comment);
    if (target.dataset.tagUser) tagUser(target.dataset.tagUser);
    if (target.dataset.share) shareMedia(target.dataset.share);
    if (target.dataset.download) downloadWatermarked(target.dataset.download);
    if (target.dataset.removePreview) {
      state.previews.splice(Number(target.dataset.removePreview), 1);
      renderUploadOptions();
    }
    if (target.dataset.filterEvent) {
      state.selectedEvent = target.dataset.filterEvent;
      setView("gallery");
    }
    if (target.dataset.shareEvent || target.dataset.copyAlbum) {
      copyAlbumLink(target.dataset.shareEvent || target.dataset.copyAlbum);
    }
    if (target.dataset.query) {
      state.query = target.dataset.query;
      $("#globalSearch").value = state.query;
      setView("gallery");
    }
    if (target.dataset.approve) approveMedia(target.dataset.approve);
    if (target.dataset.keepReview) createNotification("Review item kept in moderation queue.");
  });

  $("#createEventButton").addEventListener("click", createEvent);
  $("#chooseFiles").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", (event) => handleFiles(event.target.files));
  $("#publishUploads").addEventListener("click", publishUploads);
  $("#runAiButton").addEventListener("click", runAiScan);
  $("#notificationButton").addEventListener("click", () => {
    $("#notificationDrawer").hidden = !$("#notificationDrawer").hidden;
  });
  $("#clearNotifications").addEventListener("click", async () => {
    try {
    applyServerState(await apiRequest("/api/notifications/clear", {
      method: "POST",
      body: JSON.stringify({ role: state.role })
    }));
    } catch {
      state.notifications = [];
    }
    renderNotifications();
  });
  $("#selfieButton").addEventListener("click", () => $("#selfieInput").click());
  $("#selfieInput").addEventListener("change", previewSelfie);
  $("#closeDialog").addEventListener("click", () => $("#mediaDialog").close());

  const dropZone = $("#dropZone");
  ["dragenter", "dragover"].forEach((type) => {
    dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      dropZone.classList.add("dragging");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      dropZone.classList.remove("dragging");
    });
  });
  dropZone.addEventListener("drop", (event) => handleFiles(event.dataTransfer.files));
}

function setView(view) {
  state.view = view;
  history.replaceState(null, "", `#${view}`);
  render();
}

async function updateMetric(id, field, amount, action) {
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  try {
    const endpoint = field === "favourites" ? "favourite" : "like";
    applyServerState(await apiRequest(`/api/media/${id}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({ role: state.role })
    }));
  } catch {
    media[field] += amount;
    createNotification(`You ${action} "${media.title}".`);
  }
  renderGallery();
  renderAnalytics();
}

async function addComment(id) {
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  const comment = prompt("Add a comment");
  if (!comment) return;
  try {
    applyServerState(await apiRequest(`/api/media/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ body: comment, role: state.role })
    }));
  } catch {
    media.comments.push(comment);
    createNotification(`You commented on "${media.title}".`);
  }
  renderGallery();
}

async function tagUser(id) {
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  const person = prompt("Tag friend/user");
  if (!person) return;
  try {
    applyServerState(await apiRequest(`/api/media/${id}/tag-user`, {
      method: "POST",
      body: JSON.stringify({ person, role: state.role })
    }));
  } catch {
    media.faces.push(normalize(person));
    media.tags.push("tagged");
    createNotification(`${person} was tagged in "${media.title}".`);
  }
  renderGallery();
  renderMatches();
}

async function shareMedia(id) {
  const media = state.media.find((item) => item.id === id);
  const event = eventById(media.eventId);
  const shareLink = `${location.origin}${location.pathname}#gallery?event=${event.id}&media=${media.id}`;
  navigator.clipboard?.writeText(shareLink);
  try {
    applyServerState(await apiRequest(`/api/media/${id}/share`, {
      method: "POST",
      body: JSON.stringify({ role: state.role })
    }));
  } catch {
    createNotification(`Share link copied for ${media.title}.`);
  }
}

async function copyAlbumLink(id) {
  const event = eventById(id);
  const shareLink = `${location.origin}${location.pathname}#gallery?event=${event.id}`;
  navigator.clipboard?.writeText(shareLink);
  try {
    applyServerState(await apiRequest("/api/share/album", {
      method: "POST",
      body: JSON.stringify({ eventId: id, role: state.role })
    }));
  } catch {
    createNotification(`Album link copied for ${event.name}.`);
  }
  renderNotifications();
}

async function createEvent() {
  if (!roleAccess[state.role].events) {
    createNotification("Only admins can create events.");
    return;
  }

  const name = $("#eventName").value.trim();
  const category = $("#eventCategory").value.trim();
  const date = $("#eventDate").value;
  if (!name || !category || !date) {
    createNotification("Add event name, category, and date first.");
    return;
  }

  try {
    applyServerState(await apiRequest("/api/events", {
      method: "POST",
      body: JSON.stringify({ name, category, date, role: state.role })
    }));
  } catch {
    state.events.unshift({
      id: `ev-${Date.now()}`,
      name,
      category,
      date,
      description: "New collaborative event album ready for uploads, AI indexing, album sharing, and access rules.",
      cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
      access: "mixed",
      collaborators: ["Admin"],
      story: "New highlight",
      storage: "Object storage"
    });
    createNotification(`Created event album "${name}".`);
  }
  $("#eventName").value = "";
  $("#eventCategory").value = "";
  $("#eventDate").value = "";
  render();
}

function handleFiles(files) {
  if (!roleAccess[state.role].upload) {
    createNotification("Current role cannot upload media.");
    return;
  }
  state.previews.push(...[...files].map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
    file
  })));
  createNotification(`${files.length} file(s) added to upload studio.`);
  renderUploadOptions();
}

async function publishUploads() {
  if (!state.previews.length) return;
  const eventId = $("#uploadEvent").value;
  const access = $("#uploadAccess").value;
  const uploader = $("#uploadUser").value.trim() || "Club Photographer";
  const cloudTarget = $("#cloudTarget").value;

  try {
    const files = await Promise.all(state.previews.map(async (preview) => ({
      name: preview.name,
      type: preview.type,
      size: preview.size,
      data: await fileToDataUrl(preview.file)
    })));
    applyServerState(await apiRequest("/api/media/upload", {
      method: "POST",
      body: JSON.stringify({ eventId, access, uploader, cloudTarget, files, role: state.role })
    }));
  } catch {
    state.previews.forEach((file) => {
      const tags = suggestTags(file.name);
      state.media.unshift({
        id: `m-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        eventId,
        title: file.name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
        type: file.type.startsWith("video") ? "video" : "photo",
        access,
        url: file.url,
        uploader,
        date: new Date().toISOString().slice(0, 10),
        tags,
        faces: ["navya"],
        likes: 0,
        comments: [],
        favourites: 0,
        caption: captionForTags(tags),
        status: access === "private" ? "review" : "approved",
        moderation: access === "private" ? "Private album review" : "Safe",
        duplicateScore: Math.floor(Math.random() * 20),
        cloud: cloudTarget
      });
    });
    createNotification(`${state.previews.length} media item(s) uploaded, compressed, tagged, and indexed.`);
  }
  state.previews = [];
  setView("gallery");
}

async function runAiScan() {
  try {
    applyServerState(await apiRequest("/api/ai/scan", {
      method: "POST",
      body: JSON.stringify({ role: state.role })
    }));
  } catch {
    state.media.forEach((media) => {
      if (!media.tags.includes("ai-indexed")) media.tags.push("ai-indexed");
    });
    createNotification("AI scan completed: tags, captions, duplicate signals, and moderation labels refreshed.");
  }
  state.aiLastRun = "now";
  render();
}

function previewSelfie(event) {
  const file = event.target.files[0];
  if (!file) return;
  $("#selfiePreview").innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Reference selfie preview" />`;
  createNotification("Face discovery completed for accessible albums.");
  renderMatches();
}

async function approveMedia(id) {
  if (!roleAccess[state.role].moderate) {
    createNotification("Only admins can approve moderation items.");
    return;
  }
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  try {
    applyServerState(await apiRequest(`/api/media/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ role: state.role })
    }));
  } catch {
    media.status = "approved";
    media.moderation = "Approved by admin";
    createNotification(`Approved "${media.title}".`);
  }
  render();
}

async function boot() {
  const initial = location.hash.replace("#", "");
  if (initial && document.querySelector(`[data-view="${initial}"]`)) {
    state.view = initial;
  }
  bindEvents();
  const session = loadSession();
  if (session) {
    state.currentUser = session;
    state.role = session.role;
    hideLogin();
    await syncFromServer();
  } else {
    state.role = "viewer";
    showLogin();
  }
  render();
}

boot();
