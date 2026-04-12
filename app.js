const CAT_KEY = "live_ifq5V5uV2iFjsYp2ojM3jLpOI845n2KIrfEbJAVgDm8hJTc8PawjT0BAkOBbGxmX";
const DOG_KEY = "live_Q94AB0FiAcP2qGXt8r34UUTMcDydYo8smtpPB8Bbxc22Gkixu4WUeIZJsSTe8qKM";

let allPets = [];
let favorites = JSON.parse(localStorage.getItem("pb_favs") || "[]");
let sortAsc = true;

// --- THEME ---
const theme = localStorage.getItem("pb_theme") || "light";
document.body.className = theme;
document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";

document.getElementById("themeToggle").onclick = () => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("pb_theme", dark ? "dark" : "light");
  document.getElementById("themeToggle").textContent = dark ? "☀️" : "🌙";
};

// --- NAV ---
document.querySelectorAll(".nav-link").forEach(link => {
  link.onclick = (e) => {
    e.preventDefault();
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    link.classList.add("active");
    document.getElementById("page-" + link.dataset.page).classList.add("active");
    if (link.dataset.page === "favorites") renderFavs();
    if (link.dataset.page === "browse") renderGrid("browseCards", allPets);
  };
});

// --- FETCH ---
async function fetchAPI(url, key, type) {
  try {
    const response = await fetch(url, { headers: { "x-api-key": key } });
    const data = await response.json();
    
    return data.map(item => {
      // Ensure we safely access the first breed object
      const b = (item.breeds && item.breeds.length > 0) ? item.breeds[0] : {};
      
      return {
        id: item.id,
        image: item.url,
        // Shows breed name (e.g., Golden Retriever) instead of just "Dog"
        name: b.name || (type === "dog" ? "Friendly Dog" : "Sweet Cat"),
        breed: b.name || "Mixed Breed",
        age: Math.floor(Math.random() * 8) + 1,
        desc: b.temperament || (type === "dog" ? "Loyal, brave, and adventurous" : "Calm, curious, and lovable"),
        type
      };
    });
  } catch (err) { 
    console.error("API Error:", err);
    return []; 
  }
}

async function loadPets() {
  const [cats, dogs] = await Promise.all([
    fetchAPI(`https://api.thecatapi.com/v1/images/search?limit=15&has_breeds=1`, CAT_KEY, "cat"),
    fetchAPI(`https://api.thedogapi.com/v1/images/search?limit=15&has_breeds=1`, DOG_KEY, "dog")
  ]);
  
  allPets = [...cats, ...dogs];
  renderGrid("homeCards", allPets);
}

// --- CARD UI ---
const moods = ["Calm", "Active", "Playful"];
const tagClass = { Calm: "tag-calm", Active: "tag-active", Playful: "tag-playful" };

function buildCard(pet) {
  const mood = moods[pet.name.charCodeAt(0) % 3];
  const faved = favorites.some(f => f.id === pet.id);
  return `
    <div class="pet-card">
      <div class="card-img-wrap">
        <img src="${pet.image}" alt="${pet.name}" loading="lazy" />
        <button class="heart-btn ${faved ? "faved" : ""}" data-id="${pet.id}">${faved ? "❤️" : "🤍"}</button>
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3>${pet.name}</h3>
          <span class="tag ${tagClass[mood]}">${mood}</span>
        </div>
        <p class="card-breed">${pet.type === "dog" ? "🐶" : "🐱"} ${pet.breed} • ${pet.age} yr</p>
        <p class="card-desc">${pet.desc.split(",").slice(0, 2).join(", ")}</p>
        <button class="view-btn" data-id="${pet.id}">View Profile</button>
      </div>
    </div>`;
}

function renderGrid(gridId, pets) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = pets.length ? pets.map(buildCard).join("") : "<div class='loading-msg'>No pets found 🐾</div>";

  grid.querySelectorAll(".heart-btn").forEach(btn => {
    btn.onclick = () => {
      const pet = allPets.find(p => p.id === btn.dataset.id) || favorites.find(p => p.id === btn.dataset.id);
      if (!pet) return;
      
      const isFaved = favorites.some(f => f.id === pet.id);
      if (isFaved) {
        favorites = favorites.filter(f => f.id !== pet.id);
        toast("Removed " + pet.name);
      } else {
        favorites.push(pet);
        toast("❤️ Saved " + pet.name);
      }
      
      localStorage.setItem("pb_favs", JSON.stringify(favorites));
      
      // Update all hearts on screen
      document.querySelectorAll(`.heart-btn[data-id="${pet.id}"]`).forEach(b => {
        b.textContent = !isFaved ? "❤️" : "🤍";
        b.classList.toggle("faved", !isFaved);
      });

      if (gridId === "favCards") renderFavs();
    };
  });
}

// --- SEARCH & FILTER LOGIC ---
function renderHome() {
  const activeTab = document.querySelector(".tab.active");
  const filterType = activeTab ? activeTab.dataset.filter : "all";
  const query = document.getElementById("heroSearch").value.trim().toLowerCase();

  let filtered = allPets.filter(p => {
    const matchesType = filterType === "all" || p.type === filterType;
    const matchesSearch = !query || 
                          p.name.toLowerCase().includes(query) || 
                          p.breed.toLowerCase().includes(query) ||
                          p.desc.toLowerCase().includes(query);
    return matchesType && matchesSearch;
  });

  renderGrid("homeCards", filtered);
}

// Event Listeners for Search
document.getElementById("heroSearchBtn").onclick = () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelector(".tab[data-filter='all']").classList.add("active");
  renderHome();
};

document.getElementById("heroSearch").onkeydown = e => {
  if (e.key === "Enter") renderHome();
};

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderHome();
  };
});

document.getElementById("sortBtn").onclick = () => {
  sortAsc = !sortAsc;
  allPets.sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  renderHome();
  toast(sortAsc ? "Sorted A → Z" : "Sorted Z → A");
};

// --- BROWSE PAGE ---
document.getElementById("applyFilters").onclick = () => {
  const kw = document.getElementById("browseSearch").value.trim().toLowerCase();
  const species = document.getElementById("speciesFilter").value;
  const sortVal = document.getElementById("sortFilter").value;
  
  let pets = allPets
    .filter(p => (species === "all" || p.type === species) && (!kw || p.name.toLowerCase().includes(kw) || p.breed.toLowerCase().includes(kw)))
    .sort((a, b) => sortVal === "name-asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    
  renderGrid("browseCards", pets);
};

// --- FAVORITES ---
function renderFavs() {
  const grid = document.getElementById("favCards");
  if (!favorites.length) {
    grid.innerHTML = `<div class="empty-fav"><span>🐾</span>No favorites yet!<br><small>Tap ❤️ on any pet to save them.</small></div>`;
    return;
  }
  renderGrid("favCards", favorites);
}

// --- TOAST ---
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(window._t);
  window._t = setTimeout(() => t.classList.add("hidden"), 2500);
}

// --- INITIALIZE ---
loadPets();