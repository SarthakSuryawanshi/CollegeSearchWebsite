const API_BASE = '/api/colleges';

const searchInput = document.getElementById('searchInput');
const cityInput = document.getElementById('cityInput');
const typeInput = document.getElementById('typeInput');
const courseInput = document.getElementById('courseInput');
const clearBtn = document.getElementById('clearBtn');
const resultsDiv = document.getElementById('results');
const resultsCount = document.getElementById('resultsCount');

let debounceTimer;

function buildQuery() {
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.append('q', searchInput.value.trim());
  if (cityInput.value.trim()) params.append('city', cityInput.value.trim());
  if (typeInput.value) params.append('type', typeInput.value);
  if (courseInput.value.trim()) params.append('course', courseInput.value.trim());
  return params.toString();
}

async function fetchColleges() {
  resultsDiv.innerHTML = '<p style="grid-column:1/-1;text-align:center;">Loading...</p>';
  try {
    const query = buildQuery();
    const res = await fetch(`${API_BASE}/search?${query}`);
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    resultsDiv.innerHTML = '<p class="no-results">Something went wrong. Please try again.</p>';
    console.error(err);
  }
}

function renderResults(colleges) {
  resultsCount.textContent = `${colleges.length} college${colleges.length !== 1 ? 's' : ''} found`;

  if (colleges.length === 0) {
    resultsDiv.innerHTML = '<p class="no-results">No colleges match your search.</p>';
    return;
  }

  resultsDiv.innerHTML = colleges.map(c => `
    <div class="college-card">
      <h3>${c.name}</h3>
      <p>📍 ${c.address || c.city}</p>
      <p>📞 ${c.contact_number || 'N/A'}</p>
      <p>🎓 ${c.courses || 'N/A'}</p>
      ${c.website ? `<p><a href="${c.website}" target="_blank" rel="noopener">Visit Website</a></p>` : ''}
      <span class="type-badge">${c.type}</span>
    </div>
  `).join('');
}

function debouncedFetch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchColleges, 300);
}

searchInput.addEventListener('input', debouncedFetch);
cityInput.addEventListener('input', debouncedFetch);
courseInput.addEventListener('input', debouncedFetch);
typeInput.addEventListener('change', fetchColleges);

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  cityInput.value = '';
  typeInput.value = '';
  courseInput.value = '';
  fetchColleges();
});

// Initial load
fetchColleges();
