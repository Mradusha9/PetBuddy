# 🐾 PetBuddy

Repository / Profile: https://github.com/Mradusha9

Ever spent way too long searching random shelters and websites just to find a pet that needs a home? Yeah, same.

PetBuddy is my attempt to fix that. It pulls real pet data from trusted APIs and puts everything in one place — so you can browse adoptable animals, explore breeds, and get proper pet care info without jumping between ten different tabs.

---

## Why I Built This

Every time someone wants to adopt a pet or learn about a breed, they end up on five different websites with no consistent experience. None of them really let you *explore* pets the way you want to — by species, by breed, by temperament, or just by vibe.

So I'm building something that does exactly that.

---

## Where the Data Comes From

Three free APIs, all accessible:

- **The Dog API** — breeds, temperaments, images, and detailed dog info
- **The Cat API** — cat breeds, characteristics, and photos
- **Petfinder API** — real adoptable pets from shelters near you

---

## What You'll Be Able to Do

- **Browse** adoptable pets with photos, names, and details
- **Search** for pets or breeds by name or keyword
- **Filter** by species, breed, age, or gender
- **Sort** by name or age — ascending or descending
- **Save favorites** so you never lose track of a pet you loved
- **Read pet care info** — breed traits, temperament, life span, and more
- **Switch between dark and light mode** — dark mode just hits different

All the search, filter, and sort logic is built using JavaScript array methods — `filter()`, `sort()`, `map()`, etc. No boring loops.

---

## Tech Stack

- HTML, CSS, JavaScript — keeping it clean and simple
- Fetch API for all data calls
- Local Storage for saving favorites and remembering theme preference
- Fully responsive — works on phone, tablet, and desktop

---

## Project Structure (planned)

```
petbuddy/
├── index.html
├── style.css
├── app.js
├── api/
│   ├── dogapi.js
│   ├── catapi.js
│   └── petfinder.js
├── utils/
│   └── helpers.js
└── README.md
```

---

## Running It Locally

```bash
git clone https://github.com/Mradusha9/petbuddy.git
cd petbuddy
```

Then just open `index.html` in your browser. No build tools, no setup headaches.

You'll need free API keys for:
- The Dog API: https://thedogapi.com
- The Cat API: https://thecatapi.com
- Petfinder API: https://www.petfinder.com/developers

---

## Project Milestones

Building this in 4 steps over ~3 weeks.

---

### ✅ Milestone 1 — Planning & Setup
**Deadline: 23rd March**

The "figure out what I'm actually building" phase.

- [x] Finalized the project idea
- [x] Chose the APIs (Dog API, Cat API, Petfinder)
- [x] Created GitHub repository
- [x] Wrote this README

---

### 🔌 Milestone 2 — API Integration
**Deadline: 1st April**

Getting real data on screen.

- [ ] Connect all three APIs using `fetch`
- [ ] Display pet cards dynamically (image, name, breed, age)
- [ ] Handle loading states — no blank screens while data loads
- [ ] Handle errors gracefully — what if an API is down?
- [ ] Make the layout fully responsive across mobile, tablet, and desktop

---

### ⚙️ Milestone 3 — Core Features
**Deadline: 8th April**

Making it actually useful.

- [ ] **Search** — find pets or breeds by name or keyword
- [ ] **Filter** — narrow down by species, breed, age, or gender
- [ ] **Sort** — by name (A–Z) or age (youngest/oldest)
- [ ] **Favorites** — save and unsave pets, persisted in Local Storage
- [ ] **Dark / Light mode** — toggle that actually saves your preference

> All search, filter, and sort operations use Array HOFs (`filter()`, `sort()`, `map()`) — no `for` or `while` loops for these.

---

### 🚀 Milestone 4 — Deployment & Final Submission
**Deadline: 10th April**

Wrapping it up cleanly.

- [ ] Refactor and clean up the codebase
- [ ] Update README with final screenshots and live link
- [ ] Deploy on Vercel / Netlify / GitHub Pages
- [ ] Final submission

---

## Author
Mradusha — https://github.com/Mradusha9
