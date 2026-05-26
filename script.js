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

function makeCard(g) {
  const badgeMap = { hot: "badge-hot", new: "badge-new", top: "badge-top" };
  const badgeLabel = { hot: "🔥 Hot", new: "✨ New", top: "⭐ Top" };

  return `
    <div class="game-card" onclick="openGame(${g.id})">
      <div class="card-thumb" style="background:${g.bg}">
        <span>${g.emoji}</span>
        ${g.badge ? `<span class="badge ${badgeMap[g.badge]}">${badgeLabel[g.badge]}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-name">${g.name}</div>
        <div class="card-genre">${g.genre}</div>
      </div>
    </div>
  `;
}

function render() {
  const pool = GAMES.filter(g => {
    const matchCat = currentCategory === "all" || g.genre === currentCategory;
    const matchTag = currentTag === "all" || g.badge === currentTag;
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchTag && matchSearch;
  });

  const featured = pool.filter(g => g.featured);
  const rest = pool.filter(g => !g.featured);

  const fg = document.getElementById("featuredGrid");
  const ag = document.getElementById("allGrid");
  const fs = fg.previousElementSibling;
  const as = ag.previousElementSibling;

  fs.style.display = featured.length ? "" : "none";
  fg.innerHTML = featured.map(makeCard).join("");

  as.style.display = rest.length ? "" : "none";
  ag.innerHTML = rest.map(makeCard).join("");

  document.getElementById("countAll").textContent = GAMES.length;
}

function setCategory(cat, el) {
  currentCategory = cat;
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  if (el) el.classList.add("active");

  const titles = {
    all: "All Games",
    action: "Action",
    puzzle: "Puzzle",
    sports: "Sports",
    racing: "Racing",
    casual: "Casual"
  };

  document.getElementById("pageTitle").textContent = titles[cat] || "Games";
  render();
}

function setTag(tag, el) {
  currentTag = tag;
  document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
  render();
}

function setFilter(filter, el) {
  currentTag = filter;
  document.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
  const tagButtons = document.querySelectorAll(".tag");
  tagButtons.forEach(t => {
    if (t.textContent.trim().toLowerCase() === filter) t.classList.add("active");
  });
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  if (el) el.classList.add("active");
  render();
}

function filterGames() {
  searchQuery = document.getElementById("searchInput").value;
  render();
}

function openGame(id) {
  const g = GAMES.find(x => x.id === id);
  if (!g) return;
  document.getElementById("playerTitle").textContent = `Playing: ${g.name}`;
  document.getElementById("gameFrame").src = g.url;
  document.getElementById("player").classList.add("open");
}

function closeGame() {
  document.getElementById("player").classList.remove("open");
  document.getElementById("gameFrame").src = "";
}

function goFullscreen() {
  const frame = document.getElementById("gameFrame");
  if (frame.requestFullscreen) frame.requestFullscreen();
  else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}

render();
