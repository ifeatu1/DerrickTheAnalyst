/* ============================================================
   SHARED SITE BEHAVIOR
   ============================================================ */

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

/* ---------- Nav ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links){
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* ---------- Ticker ---------- */
function initTicker(){
  const track = document.querySelector(".ticker-track");
  if (!track || typeof TICKER_FACTS === "undefined") return;
  const items = TICKER_FACTS.map(f =>
    `<span class="ticker-item"><span class="pip"></span>${escapeHtml(f)}</span>`
  ).join("");
  // duplicate the list so the marquee can loop seamlessly
  track.innerHTML = items + items;
}

/* ---------- File extension icon glyphs (mono, no emoji) ---------- */
const EXT_GLYPH = {
  DOCX: "[doc]", IPYNB: "[nb]", PBIX: "[pbi]", XLSX: "[xls]", PY: "[py]", PDF: "[pdf]"
};

/* ---------- Project card markup ---------- */
function projectCardHTML(p, opts){
  opts = opts || {};
  const showCategoryBadge = !!opts.showCategoryBadge;
  const idx = (PROJECTS.indexOf(p) + 1).toString().padStart(2, '0');
  const catClass = p.category === "data-science" ? "is-science" : "is-analysis";
  const badgeClass = p.category === "data-science" ? "science" : "analysis";
  const badgeLabel = p.category === "data-science" ? "Data Science" : "Data Analysis";

  const skillRow = p.skills.map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join("");
  const metricRow = (p.metrics || []).map(m =>
    `<span class="metric">${escapeHtml(m.label)} <b>${escapeHtml(m.value)}</b></span>`
  ).join("");
  const fileRow = (p.files || []).map(f =>
    `<a class="file-link" href="${f.path}" download>
       <span class="ext">${EXT_GLYPH[f.ext] || "[file]"}</span> ${escapeHtml(f.name)} ↓
     </a>`
  ).join("");

  let galleryInner = "";
  if (p.screenshots && p.screenshots.length){
    galleryInner = p.screenshots.map(s =>
      `<figure class="shot" data-full="${s.src}" data-caption="${escapeHtml(s.caption)}">
         <img src="${s.src}" alt="${escapeHtml(s.caption)}" loading="lazy">
         <figcaption>${escapeHtml(s.caption)}</figcaption>
       </figure>`
    ).join("");
  }
  if (p.pbixPending){
    galleryInner += `<div class="shot-pending">${escapeHtml(p.pbixNote || "Screenshot pending")}</div>`;
  }

  const impactBlockClass = p.impactPending ? "pm-block impact pending" : "pm-block impact";

  return `
  <article class="project-card ${catClass}" data-id="${p.id}" data-skills="${p.skills.join("|")}">
    <div class="body">
      <span class="card-num">${idx}</span>
      <div class="card-top">
        <div>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="tagline">${escapeHtml(p.tagline)}</p>
        </div>
        ${showCategoryBadge ? `<span class="cat-badge ${badgeClass}">${badgeLabel}</span>` : ""}
      </div>

      <div class="flow">
        <span class="node">Problem</span>
        <span class="arrow-sep">→</span>
        <span class="node">Method</span>
        <span class="arrow-sep">→</span>
        <span class="node">Impact</span>
      </div>

      <div class="pm-block">
        <span class="pm-label">Problem</span>
        <p>${escapeHtml(p.problem)}</p>
      </div>
      <div class="pm-block">
        <span class="pm-label">Method</span>
        <p>${escapeHtml(p.method)}</p>
      </div>
      <div class="${impactBlockClass}">
        <span class="pm-label">Impact</span>
        <p>${escapeHtml(p.impact)}</p>
      </div>

      ${metricRow ? `<div class="metric-row">${metricRow}</div>` : ""}
      <div class="skill-row">${skillRow}</div>
      <div class="file-row">${fileRow}</div>
    </div>
    <div class="gallery">${galleryInner}</div>
  </article>`;
}

/* ---------- Render a list of projects into a container ---------- */
function renderProjects(containerSel, projects, opts){
  const el = document.querySelector(containerSel);
  if (!el) return;
  if (!projects.length){
    el.innerHTML = `<div class="empty-state">No projects match that filter yet.</div>`;
    return;
  }
  el.innerHTML = projects.map(p => projectCardHTML(p, opts)).join("");
  initLightbox(el);
}

/* ---------- Skill filter chips ---------- */
function initSkillFilter(containerSel, gridSel, projects, opts){
  const bar = document.querySelector(containerSel);
  if (!bar) return;

  const skillCounts = {};
  projects.forEach(p => p.skills.forEach(s => { skillCounts[s] = (skillCounts[s] || 0) + 1; }));
  const skills = Object.keys(skillCounts).sort((a,b) => skillCounts[b]-skillCounts[a] || a.localeCompare(b));

  let active = null;

  function draw(){
    bar.innerHTML = `<button class="chip ${active === null ? "active" : ""}" data-skill="">All <span class="count">${projects.length}</span></button>` +
      skills.map(s => `<button class="chip ${active === s ? "active" : ""}" data-skill="${escapeHtml(s)}">${escapeHtml(s)} <span class="count">${skillCounts[s]}</span></button>`).join("");
  }

  function apply(){
    const filtered = active ? projects.filter(p => p.skills.includes(active)) : projects;
    renderProjects(gridSel, filtered, opts);
  }

  bar.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    active = btn.dataset.skill || null;
    draw();
    apply();
  });

  draw();
  apply();
}

/* ---------- Lightbox ---------- */
function ensureLightboxEl(){
  let lb = document.querySelector(".lightbox");
  if (lb) return lb;
  lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">close ✕</button>
    <img src="" alt="">
    <div class="lightbox-cap"></div>`;
  document.body.appendChild(lb);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
  return lb;
}
function closeLightbox(){
  const lb = document.querySelector(".lightbox");
  if (lb) lb.classList.remove("open");
}
function initLightbox(scope){
  const lb = ensureLightboxEl();
  scope.querySelectorAll(".shot").forEach(fig => {
    fig.addEventListener("click", () => {
      lb.querySelector("img").src = fig.dataset.full;
      lb.querySelector(".lightbox-cap").textContent = fig.dataset.caption || "";
      lb.classList.add("open");
    });
  });
}

/* ---------- Stat helpers for homepage ---------- */
function computeSiteStats(){
  const total = PROJECTS.length;
  const science = PROJECTS.filter(p => p.category === "data-science").length;
  const analysis = total - science;
  const skillSet = new Set();
  PROJECTS.forEach(p => p.skills.forEach(s => skillSet.add(s)));
  return { total, science, analysis, skills: skillSet.size };
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTicker();
});
