const state = {
  role: "admin",
  view: "dashboard",
  query: "",
  selectedTag: "all",
  selectedEvent: "all",
  selectedAccess: "all",
  selectedType: "all",
  eventSort: "date",
  eventCategory: "all",
  previews: [],
  notifications: [
    { text: "Meera commented on your upload from Tech Expo 2026.", time: "2 min ago" },
    { text: "Rohan tagged you in Cultural Fest Night.", time: "8 min ago" },
    { text: "A private album was shared with club members.", time: "18 min ago" }
  ],
  events: [
    {
      id: "ev-cultural",
      name: "Cultural Fest Night",
      category: "Fest",
      date: "2026-02-18",
      description: "Main stage performances, backstage moments, crowd highlights, and winner portraits.",
      cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "ev-mountain",
      name: "Mountain Photography Trip",
      category: "Trip",
      date: "2026-01-12",
      description: "Outdoor shoot curated by the photography club with landscapes, portraits, and travel clips.",
      cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "ev-workshop",
      name: "AI Media Workshop",
      category: "Workshop",
      date: "2026-03-04",
      description: "Hands-on session covering image tagging, editing workflow, media rights, and cloud storage.",
      cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "ev-sports",
      name: "Inter-Club Sports League",
      category: "Sports",
      date: "2026-03-21",
      description: "Matchday photos, team huddles, action shots, trophy presentations, and short reels.",
      cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80"
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
      favourites: 18
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
      favourites: 22
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
      favourites: 34
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
      favourites: 15
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
      favourites: 46
    },
    {
      id: "m6",
      eventId: "ev-workshop",
      title: "Cloud upload walkthrough",
      type: "video",
      access: "public",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      uploader: "Meera Nair",
      date: "2026-03-04",
      tags: ["cloud", "demo", "workshop", "video"],
      faces: ["meera"],
      likes: 53,
      comments: ["Trim intro before publishing."],
      favourites: 9
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
      favourites: 19
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
      favourites: 38
    }
  ]
};

const roleCopy = {
  admin: "Full control over events, private albums, uploads, and moderation.",
  photographer: "Can upload media, manage own albums, and view assigned private collections.",
  member: "Can access member-only albums, comment, favourite, download, and run face discovery.",
  viewer: "Can browse public albums and interact with public media only."
};

const roleAccess = {
  admin: { private: true, upload: true, events: true },
  photographer: { private: true, upload: true, events: false },
  member: { private: true, upload: false, events: false },
  viewer: { private: false, upload: false, events: false }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function eventById(id) {
  return state.events.find((event) => event.id === id);
}

function canView(media) {
  return media.access === "public" || roleAccess[state.role].private;
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
    event?.name,
    event?.category,
    ...media.tags
  ].map(normalize).join(" ");

  return haystack.includes(normalize(state.query));
}

function filteredMedia() {
  return state.media.filter((media) => {
    const tagMatch = state.selectedTag === "all" || media.tags.includes(state.selectedTag);
    const eventMatch = state.selectedEvent === "all" || media.eventId === state.selectedEvent;
    const accessMatch = state.selectedAccess === "all" || media.access === state.selectedAccess;
    const typeMatch = state.selectedType === "all" || media.type === state.selectedType;
    return tagMatch && eventMatch && accessMatch && typeMatch && matchesQuery(media);
  });
}

function render() {
  updateNavigation();
  renderDashboard();
  renderEvents();
  renderGallery();
  renderUploadOptions();
  renderMatches();
  renderAnalytics();
  renderNotifications();
}

function updateNavigation() {
  $$("#viewTitle").forEach((el) => {
    el.textContent = state.view.replace(/^\w/, (char) => char.toUpperCase());
  });
  $$(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === state.view));
  $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.viewLink === state.view));
  $("#roleSelect").value = state.role;
  $("#roleCopy").textContent = roleCopy[state.role];
}

function renderDashboard() {
  const publicCount = state.media.filter((media) => media.access === "public").length;
  const privateCount = state.media.length - publicCount;
  const totalLikes = state.media.reduce((sum, media) => sum + media.likes, 0);
  const tagCount = new Set(state.media.flatMap((media) => media.tags)).size;

  $("#heroMediaCount").textContent = state.media.length;
  $("#statGrid").innerHTML = [
    ["Events", state.events.length, "active albums"],
    ["Media", state.media.length, "photos and videos"],
    ["AI tags", tagCount, "search labels"],
    ["Engagement", totalLikes, "likes tracked"]
  ].map(([label, value, copy]) => `
    <article class="stat-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <span>${copy}</span>
    </article>
  `).join("");

  $("#activityFeed").innerHTML = state.media.slice(0, 5).map((media) => `
    <article class="activity-item">
      <div>
        <strong>${media.title}</strong>
        <p>${media.uploader} uploaded to ${eventById(media.eventId).name}</p>
      </div>
      <span class="pill">${media.access}</span>
    </article>
  `).join("");

  const roles = [
    ["Admin", "Events, uploads, private media, moderation"],
    ["Photographer", "Uploads, assigned albums, social activity"],
    ["Club Member", "Private viewing, favourites, downloads"],
    ["Viewer", "Public browsing and sharing"]
  ];
  $("#roleMatrix").innerHTML = roles.map(([role, scope]) => `
    <div class="matrix-row">
      <strong>${role}</strong>
      <span>${scope}</span>
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
    const mediaCount = state.media.filter((media) => media.eventId === event.id).length;
    return `
      <article class="event-card">
        <img src="${event.cover}" alt="${event.name}" />
        <div class="event-card-body">
          <span class="card-kicker">${event.category}</span>
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <div class="event-meta">
            <span>${formatDate(event.date)}</span>
            <span>${mediaCount} assets</span>
            <span>${event.id}</span>
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
  $("#mediaGrid").innerHTML = items.length ? items.map(renderMediaCard).join("") : `
    <div class="empty-state">No media matches the current filters.</div>
  `;
}

function renderMediaCard(media) {
  const event = eventById(media.eventId);
  const locked = !canView(media);
  const thumb = locked
    ? `<div class="locked"><strong>Private media</strong><span>Switch to a club role to preview.</span></div>`
    : media.type === "video"
      ? `<video src="${media.url}" muted></video>`
      : `<img src="${media.url}" alt="${media.title}" />`;

  return `
    <article class="media-card">
      <button class="media-thumb" type="button" data-open-media="${media.id}" ${locked ? "disabled" : ""}>
        ${thumb}
        <span class="access-badge pill">${media.access}</span>
      </button>
      <div class="media-body">
        <span class="card-kicker">${event.name}</span>
        <h3>${media.title}</h3>
        <p>${media.uploader} • ${formatDate(media.date)}</p>
        <div class="tag-list">${media.tags.slice(0, 3).map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="media-actions">
          <button type="button" data-like="${media.id}">Like ${media.likes}</button>
          <button type="button" data-comment="${media.id}">Comment</button>
          <button type="button" data-fav="${media.id}">Fav ${media.favourites}</button>
          <button type="button" data-download="${media.id}" ${locked ? "disabled" : ""}>Download</button>
          <button type="button" data-share="${media.id}">Share</button>
        </div>
      </div>
    </article>
  `;
}

function renderTagCloud() {
  const tags = ["all", ...new Set(state.media.flatMap((media) => media.tags))].slice(0, 18);
  $("#tagCloud").innerHTML = tags.map((tag) => `
    <button class="tag ${state.selectedTag === tag ? "active" : ""}" type="button" data-tag="${tag}">
      ${tag}
    </button>
  `).join("");
}

function renderUploadOptions() {
  const options = state.events.map((event) => `<option value="${event.id}">${event.name}</option>`).join("");
  $("#uploadEvent").innerHTML = options;
  $("#publishUploads").disabled = !roleAccess[state.role].upload || state.previews.length === 0;
  $("#chooseFiles").disabled = !roleAccess[state.role].upload;
  $("#previewGrid").innerHTML = state.previews.length ? state.previews.map((file, index) => `
    <article class="upload-card">
      ${file.type.startsWith("video")
        ? `<video src="${file.url}" muted controls></video>`
        : `<img src="${file.url}" alt="${file.name}" />`}
      <h3>${file.name}</h3>
      <p>${file.type || "media"} • ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
      <div class="tag-list">${suggestTags(file.name).map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <button class="ghost-btn" type="button" data-remove-preview="${index}">Remove</button>
    </article>
  `).join("") : `<div class="empty-state">${roleAccess[state.role].upload ? "Selected files will appear here before publishing." : "Current role cannot upload media."}</div>`;
}

function renderMatches() {
  const matches = state.media.filter((media) => canView(media) && media.faces.includes("navya"));
  $("#matchCount").textContent = `${matches.length} matches`;
  $("#matchGrid").innerHTML = matches.map(renderMediaCard).join("");
}

function renderAnalytics() {
  const maxLikes = Math.max(...state.events.map((event) => eventEngagement(event.id)));
  $("#engagementChart").innerHTML = state.events.map((event) => {
    const value = eventEngagement(event.id);
    const width = maxLikes ? Math.round((value / maxLikes) * 100) : 0;
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
    .slice(0, 8);
  $("#tagCoverage").innerHTML = coverage.map(([tag, count]) => `
    <div class="matrix-row"><span>${tag}</span><strong>${count} assets</strong></div>
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
  const eventOptions = state.events.map((event) => `
    <option value="${event.id}" ${state.selectedEvent === event.id ? "selected" : ""}>${event.name}</option>
  `).join("");
  $("#eventFilter").innerHTML = `<option value="all">All events</option>${eventOptions}`;
  $("#eventFilter").value = state.selectedEvent;
  $("#accessFilter").value = state.selectedAccess;
  $("#typeFilter").value = state.selectedType;
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
  return [...tags].slice(0, 4);
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
        <h2>${media.title}</h2>
        <p>${event.name}</p>
        <p>${media.uploader} • ${formatDate(media.date)}</p>
        <div class="tag-list">${media.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <h3>Comments</h3>
        ${media.comments.map((comment) => `<p>${comment}</p>`).join("")}
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
    const label = `EventVault • ${event.name} • ${state.role}`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(0, canvas.height - 72, canvas.width, 72);
    ctx.fillStyle = "#fff";
    ctx.font = `${Math.max(24, Math.round(canvas.width / 38))}px Arial`;
    ctx.fillText(label, 28, canvas.height - 28);
    const link = document.createElement("a");
    link.download = `${media.title.toLowerCase().replaceAll(" ", "-")}-watermarked.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    createNotification(`Downloaded watermarked copy of ${media.title}.`);
  };
  img.onerror = () => createNotification("This browser blocked watermarking for the remote image.");
  img.src = media.url;
}

function bindEvents() {
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setView(link.dataset.viewLink);
    });
  });

  $$("[data-jump]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.jump)));
  $("#roleSelect").addEventListener("change", (event) => {
    state.role = event.target.value;
    render();
  });
  $("#globalSearch").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderGallery();
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
    if (target.dataset.share) shareMedia(target.dataset.share);
    if (target.dataset.download) downloadWatermarked(target.dataset.download);
    if (target.dataset.removePreview) {
      state.previews.splice(Number(target.dataset.removePreview), 1);
      renderUploadOptions();
    }
  });

  $("#createEventButton").addEventListener("click", createEvent);
  $("#chooseFiles").addEventListener("click", () => $("#fileInput").click());
  $("#fileInput").addEventListener("change", (event) => handleFiles(event.target.files));
  $("#publishUploads").addEventListener("click", publishUploads);
  $("#notificationButton").addEventListener("click", () => {
    $("#notificationDrawer").hidden = !$("#notificationDrawer").hidden;
  });
  $("#clearNotifications").addEventListener("click", () => {
    state.notifications = [];
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

function updateMetric(id, field, amount, action) {
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  media[field] += amount;
  createNotification(`You ${action} "${media.title}".`);
  renderGallery();
  renderAnalytics();
}

function addComment(id) {
  const media = state.media.find((item) => item.id === id);
  if (!media) return;
  const comment = prompt("Add a comment");
  if (!comment) return;
  media.comments.push(comment);
  createNotification(`You commented on "${media.title}".`);
  renderGallery();
}

function shareMedia(id) {
  const media = state.media.find((item) => item.id === id);
  const event = eventById(media.eventId);
  const shareLink = `${location.origin}${location.pathname}#gallery?event=${event.id}&media=${media.id}`;
  navigator.clipboard?.writeText(shareLink);
  createNotification(`Share link copied for ${media.title}.`);
}

function createEvent() {
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

  state.events.unshift({
    id: `ev-${Date.now()}`,
    name,
    category,
    date,
    description: "New event album ready for media uploads, access controls, and AI tag indexing.",
    cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80"
  });
  $("#eventName").value = "";
  $("#eventCategory").value = "";
  $("#eventDate").value = "";
  createNotification(`Created event album "${name}".`);
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
    url: URL.createObjectURL(file)
  })));
  renderUploadOptions();
}

function publishUploads() {
  if (!state.previews.length) return;
  const eventId = $("#uploadEvent").value;
  const access = $("#uploadAccess").value;
  const uploader = $("#uploadUser").value.trim() || "Club Photographer";

  state.previews.forEach((file) => {
    state.media.unshift({
      id: `m-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      eventId,
      title: file.name.replace(/\.[^.]+$/, "").replaceAll("-", " "),
      type: file.type.startsWith("video") ? "video" : "photo",
      access,
      url: file.url,
      uploader,
      date: new Date().toISOString().slice(0, 10),
      tags: suggestTags(file.name),
      faces: ["navya"],
      likes: 0,
      comments: [],
      favourites: 0
    });
  });
  createNotification(`${state.previews.length} media item(s) uploaded and indexed.`);
  state.previews = [];
  setView("gallery");
}

function previewSelfie(event) {
  const file = event.target.files[0];
  if (!file) return;
  $("#selfiePreview").innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Reference selfie preview" />`;
  createNotification("Face discovery completed for accessible albums.");
  renderMatches();
}

function boot() {
  const initial = location.hash.replace("#", "");
  if (initial && document.querySelector(`[data-view="${initial}"]`)) {
    state.view = initial;
  }
  bindEvents();
  render();
}

boot();
