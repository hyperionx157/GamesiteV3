const GAMES = [
  { id: 1, name: "Slope", genre: "action", emoji: "🔵", bg: "#0d1929", badge: "hot", url: "https://slope-game.github.io/", featured: true },
  { id: 2, name: "1v1.LOL", genre: "action", emoji: "🎯", bg: "#1a0d0d", badge: "hot", url: "https://1v1.lol/", featured: true },
  { id: 3, name: "Retro Bowl", genre: "sports", emoji: "🏈", bg: "#0d1a0d", badge: "top", url: "https://retrobowl.me/", featured: true },
  { id: 4, name: "Snow Rider 3D", genre: "racing", emoji: "🛷", bg: "#0d1729", badge: "new", url: "https://snow-rider-3d.github.io/", featured: true },
  { id: 5, name: "2048", genre: "puzzle", emoji: "🔢", bg: "#1a1400", badge: null, url: "https://play2048.co/", featured: false },
  { id: 6, name: "Subway Surfers", genre: "action", emoji: "🛹", bg: "#1a0d1a", badge: "hot", url: "https://poki.com/en/g/subway-surfers", featured: false },
  { id: 7, name: "Cookie Clicker", genre: "casual", emoji: "🍪", bg: "#1a0e00", badge: "top", url: "https://orteil.dashnet.org/cookieclicker/", featured: false },
  { id: 8, name: "Wordle", genre: "puzzle", emoji: "🟩", bg: "#0d1a12", badge: null, url: "https://www.nytimes.com/games/wordle/", featured: false },
  { id: 9, name: "Soccer Random", genre: "sports", emoji: "⚽", bg: "#0a1a0a", badge: "new", url: "https://soccerandom.io/", featured: false },
  { id: 10, name: "Moto X3M", genre: "racing", emoji: "🏍️", bg: "#1a1000", badge: "top", url: "https://poki.com/en/g/moto-x3m", featured: false },
  { id: 11, name: "Tiny Fishing", genre: "casual", emoji: "🎣", bg: "#001020", badge: "new", url: "https://tinyfishing.github.io/", featured: false },
  { id: 12, name: "Drift Boss", genre: "racing", emoji: "🚗", bg: "#1a0800", badge: null, url: "https://driftboss.io/", featured: false },
  { id: 13, name: "Tetris", genre: "puzzle", emoji: "🟧", bg: "#100a1a", badge: null, url: "https://tetris.com/play-tetris", featured: false },
  { id: 14, name: "Basketball Stars", genre: "sports", emoji: "🏀", bg: "#1a0d00", badge: "hot", url: "https://poki.com/en/g/basketball-stars", featured: false },
  { id: 15, name: "Snake", genre: "casual", emoji: "🐍", bg: "#0a1a0a", badge: null, url: "https://playsnake.org/", featured: false },
  { id: 16, name: "Stickman Hook", genre: "action", emoji: "🕴️", bg: "#0a0a1a", badge: "new", url: "https://poki.com/en/g/stickman-hook", featured: false },
  { id: 17, name: "Paper.io 2", genre: "action", emoji: "📄", bg: "#1a1a0a", badge: null, url: "https://paper-io.com/", featured: false },
  { id: 18, name: "Sudoku", genre: "puzzle", emoji: "#️⃣", bg: "#101010", badge: "top", url: "https://sudoku.com/", featured: false }
];

let currentCategory = "all";
let currentTag = "all";
let searchQuery = "";

const LS = {
  theme: "av_theme",
  sound: "av_sound",
  accent: "av_accent",
  username: "av_username",
  status: "av_status",
  notes: "av_notes",
  chat: "av_chat"
};

function pageKey() {
  const file = location.pathname.split("/").pop() || "index.html";
  return file.replace(".html", "") || "index";
}

function setActiveNav() {
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.page === pageKey());
  });
}

function makeGameCard(g) {
  const badgeLabel = { hot: "Hot", new: "New", top: "Top" };
  const badgeClass = { hot: "hot", new: "new", top: "top" };
  return `
    <div class="card" onclick="openGame(${g.id})">
      <div class="thumb" style="background:${g.bg}">
        <span>${g.emoji}</span>
        ${g.badge ? `<span class="badge ${badgeClass[g.badge]}">${badgeLabel[g.badge]}</span>` : ""}
      </div>
      <div class="body">
        <h3>${g.name}</h3>
        <p>${g.genre}</p>
      </div>
    </div>
  `;
}

function renderGames() {
  const fg = document.getElementById("featuredGrid");
  const ag = document.getElementById("allGrid");
  if (!fg || !ag) return;

  const pool = GAMES.filter(g => {
    const matchCat = currentCategory === "all" || g.genre === currentCategory;
    const matchTag = currentTag === "all" || g.badge === currentTag;
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchTag && matchSearch;
  });

  const featured = pool.filter(g => g.featured);
  const rest = pool.filter(g => !g.featured);

  const featuredSection = fg.closest(".section");
  const allSection = ag.closest(".section");

  if (featuredSection) featuredSection.style.display = featured.length ? "" : "none";
  if (allSection) allSection.style.display = rest.length ? "" : "none";

  fg.innerHTML = featured.map(makeGameCard).join("");
  ag.innerHTML = rest.map(makeGameCard).join("");

  const count = document.getElementById("countAll");
  if (count) count.textContent = GAMES.length;
}

function setCategory(cat, el) {
  currentCategory = cat;
  document.querySelectorAll(".nav-link[data-group='games']").forEach(x => x.classList.remove("active"));
  if (el) el.classList.add("active");
  const titles = { all: "All Games", action: "Action", puzzle: "Puzzle", sports: "Sports", racing: "Racing", casual: "Casual" };
  const title = document.getElementById("pageTitle");
  if (title) title.textContent = titles[cat] || "Games";
  renderGames();
}

function setTag(tag, el) {
  currentTag = tag;
  document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
  renderGames();
}

function setFilter(filter, el) {
  currentTag = filter;
  document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
  const buttons = Array.from(document.querySelectorAll(".tag"));
  const match = buttons.find(t => t.textContent.trim().toLowerCase() === filter);
  if (match) match.classList.add("active");
  if (el) {
    document.querySelectorAll(".nav-link[data-group='games']").forEach(n => n.classList.remove("active"));
    el.classList.add("active");
  }
  renderGames();
}

function filterGames() {
  const input = document.getElementById("searchInput");
  searchQuery = input ? input.value : "";
  renderGames();
}

function openGame(id) {
  const g = GAMES.find(x => x.id === id);
  if (!g) return;
  const player = document.getElementById("player");
  const frame = document.getElementById("gameFrame");
  const title = document.getElementById("playerTitle");
  if (!player || !frame || !title) return;
  title.textContent = `Playing: ${g.name}`;
  frame.src = g.url;
  player.classList.add("open");
}

function closeGame() {
  const player = document.getElementById("player");
  const frame = document.getElementById("gameFrame");
  if (player) player.classList.remove("open");
  if (frame) frame.src = "";
}

function goFullscreen() {
  const frame = document.getElementById("gameFrame");
  if (!frame) return;
  if (frame.requestFullscreen) frame.requestFullscreen();
  else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}

function getJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function applyTheme() {
  const theme = localStorage.getItem(LS.theme) || "dark";
  const accent = localStorage.getItem(LS.accent) || "#7c6ef5";
  document.documentElement.style.setProperty("--accent", accent);

  if (theme === "light") {
    document.documentElement.style.setProperty("--bg", "#f4f6fb");
    document.documentElement.style.setProperty("--panel", "#ffffff");
    document.documentElement.style.setProperty("--panel-2", "#eef1f7");
    document.documentElement.style.setProperty("--panel-3", "#e4e8f2");
    document.documentElement.style.setProperty("--border", "#d5dbe8");
    document.documentElement.style.setProperty("--text", "#172033");
    document.documentElement.style.setProperty("--muted", "#667085");
    document.documentElement.style.setProperty("--shadow", "0 12px 24px rgba(15, 23, 42, 0.08)");
    document.body.style.background = "#f4f6fb";
  }
}

function initSettings() {
  const theme = document.getElementById("themeSelect");
  const sound = document.getElementById("soundToggle");
  const accent = document.getElementById("accentColor");
  const username = document.getElementById("usernameInput");
  const status = document.getElementById("statusInput");

  if (theme) theme.value = localStorage.getItem(LS.theme) || "dark";
  if (sound) sound.checked = (localStorage.getItem(LS.sound) ?? "on") === "on";
  if (accent) accent.value = localStorage.getItem(LS.accent) || "#7c6ef5";
  if (username) username.value = localStorage.getItem(LS.username) || "";
  if (status) status.value = localStorage.getItem(LS.status) || "";

  const notes = document.getElementById("notesArea");
  if (notes) notes.value = localStorage.getItem(LS.notes) || "";

  const unameDisplay = document.getElementById("accountName");
  if (unameDisplay) unameDisplay.textContent = localStorage.getItem(LS.username) || "Guest";

  if (theme) theme.addEventListener("change", () => {
    localStorage.setItem(LS.theme, theme.value);
    applyTheme();
  });

  if (sound) sound.addEventListener("change", () => {
    localStorage.setItem(LS.sound, sound.checked ? "on" : "off");
  });

  if (accent) accent.addEventListener("input", () => {
    localStorage.setItem(LS.accent, accent.value);
    applyTheme();
  });

  if (username) username.addEventListener("input", () => {
    localStorage.setItem(LS.username, username.value);
    if (unameDisplay) unameDisplay.textContent = username.value || "Guest";
  });

  if (status) status.addEventListener("input", () => {
    localStorage.setItem(LS.status, status.value);
  });

  if (notes) notes.addEventListener("input", () => {
    localStorage.setItem(LS.notes, notes.value);
  });

  const soundLabel = document.getElementById("soundLabel");
  if (soundLabel && sound) soundLabel.textContent = sound.checked ? "Sound is on" : "Sound is off";
  if (sound) {
    sound.addEventListener("change", () => {
      if (soundLabel) soundLabel.textContent = sound.checked ? "Sound is on" : "Sound is off";
    });
  }
}

function saveSetting(key, value) {
  localStorage.setItem(key, value);
}

function initChat() {
  const list = document.getElementById("messagesList");
  const input = document.getElementById("chatInput");
  if (!list) return;

  const saved = getJSON(LS.chat, [
    { who: "ArcadeVault Bot", time: "now", text: "Welcome to chat. You can send messages and they will stay after refresh." },
    { who: "PlayerOne", time: "2 min ago", text: "What game should I play first?" }
  ]);

  list.innerHTML = saved.map(m => `
    <div class="message">
      <div class="meta">${m.who} • ${m.time}</div>
      <div class="text">${m.text}</div>
    </div>
  `).join("");

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") sendChat();
    });
  }
}

function sendChat() {
  const input = document.getElementById("chatInput");
  const list = document.getElementById("messagesList");
  if (!input || !list || !input.value.trim()) return;

  const current = getJSON(LS.chat, []);
  current.push({ who: "You", time: "just now", text: input.value.trim() });
  setJSON(LS.chat, current);

  input.value = "";
  initChat();
}

function saveNote() {
  const notes = document.getElementById("notesArea");
  if (!notes) return;
  localStorage.setItem(LS.notes, notes.value);
}

function clearNotes() {
  localStorage.removeItem(LS.notes);
  const notes = document.getElementById("notesArea");
  if (notes) notes.value = "";
}

let timerInterval = null;

function startTimer() {
  stopTimer();
  const minutes = Number(document.getElementById("timerMinutes")?.value || 0);
  const seconds = Number(document.getElementById("timerSeconds")?.value || 0);
  let total = (minutes * 60) + seconds;
  const display = document.getElementById("timerDisplay");
  const startBtn = document.getElementById("timerStart");
  if (!display || !startBtn) return;
  if (total <= 0) {
    display.textContent = "00:00";
    return;
  }

  const tick = () => {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    display.textContent = `${m}:${s}`;
    if (total <= 0) {
      stopTimer();
      display.textContent = "00:00";
      return;
    }
    total -= 1;
  };

  tick();
  timerInterval = setInterval(tick, 1000);
  startBtn.textContent = "Running...";
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  const startBtn = document.getElementById("timerStart");
  if (startBtn) startBtn.textContent = "Start";
}

function clearChat() {
  localStorage.removeItem(LS.chat);
  initChat();
}

function init() {
  setActiveNav();
  applyTheme();
  renderGames();
  initSettings();
  initChat();

  const page = pageKey();
  const title = document.getElementById("pageTitle");
  if (title && pages[page]) title.textContent = pages[page];
}

document.addEventListener("DOMContentLoaded", init);
