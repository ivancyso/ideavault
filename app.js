/* IdeaVault — Main App JS */

// Theme toggle
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', d);
  function updateIcon() {
    if (!t) return;
    t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
    t.innerHTML = d === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateIcon();
  if (t) t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    updateIcon();
  });
})();

// Sticky header shadow
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 4 ? 'var(--shadow-sm)' : '';
  }, { passive: true });
}

// Load and render ideas
let allIdeas = [];
let activeFilter = 'all';

async function loadIdeas() {
  try {
    const res = await fetch('ideas.json');
    allIdeas = await res.json();
    renderFilters();
    renderIdeas();
    updateCount();
  } catch (e) {
    console.error('Could not load ideas:', e);
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderFilters() {
  const categories = ['all', ...new Set(allIdeas.map(i => i.category))];
  const row = document.getElementById('filter-row');
  if (!row) return;
  row.innerHTML = categories.map(cat => `
    <button class="filter-btn${cat === activeFilter ? ' active' : ''}" data-cat="${cat}">
      ${cat === 'all' ? 'All' : cat}
    </button>
  `).join('');
  row.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      row.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderIdeas();
    });
  });
}

function renderIdeas() {
  const grid = document.getElementById('ideas-grid');
  if (!grid) return;
  const filtered = activeFilter === 'all'
    ? allIdeas
    : allIdeas.filter(i => i.category === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state"><h3>No ideas yet in this category.</h3><p>Check back soon — a new idea drops every day.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map((idea, idx) => `
    <a class="idea-card" href="idea.html?id=${idea.id}" aria-label="${idea.title}">
      <div class="idea-card-top">
        <span class="idea-cat">${idea.category}</span>
        <div style="text-align:right">
          <div class="idea-number">#${idea.id}</div>
          <div class="idea-date">${formatDate(idea.date)}</div>
        </div>
      </div>
      <h3 class="idea-title">${idea.title}</h3>
      <p class="idea-tagline">${idea.tagline}</p>
      <div class="idea-card-footer">
        <div class="idea-market">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          <span><strong>${idea.market_size.split(' ').slice(0, 3).join(' ')}</strong> market</span>
        </div>
        <div class="idea-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </a>
  `).join('');
}

function updateCount() {
  const el = document.getElementById('idea-count');
  if (el) el.textContent = allIdeas.length;
}

// Init
if (document.getElementById('ideas-grid')) {
  loadIdeas();
}
