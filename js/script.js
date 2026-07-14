// ============================================
// Carga de datos
// ============================================
async function loadContent() {
  try {
    const res = await fetch('data/content.json');
    if (!res.ok) throw new Error('No se pudo leer content.json');
    const data = await res.json();
    renderPerfil(data.perfil);
    renderPortafolio(data.portafolio);
    renderCV(data.cv, data.perfil);
    renderIdeas(data.ideas);
    renderContacto(data.contacto);
  } catch (err) {
    console.error(err);
    document.getElementById('main').innerHTML =
      '<p style="padding:60px 0;color:#6E7378;">No se pudo cargar el contenido del sitio (data/content.json). ' +
      'Si estás abriendo el archivo directamente (file://), probalo con un servidor local o publicalo en GitHub Pages.</p>';
  }
}

// ============================================
// INICIO
// ============================================
function renderPerfil(perfil) {
  document.getElementById('perfil-nombre').textContent = perfil.nombre;
  document.getElementById('perfil-titulo').textContent = perfil.titulo;
  document.getElementById('perfil-tagline').textContent = perfil.tagline;
  document.getElementById('perfil-presentacion').textContent = perfil.presentacion;
  document.title = `${perfil.nombre} — ${perfil.titulo}`;

  const cvLink = perfil.cvArchivo || '#';
  document.getElementById('hero-cv-link').href = cvLink;
  document.getElementById('cv-download-link').href = cvLink;

  const initials = perfil.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  document.querySelector('.brand-mark').textContent = initials;
}

// ============================================
// PORTAFOLIO
// ============================================
function renderPortafolio(items) {
  const grid = document.getElementById('portafolio-grid');
  grid.innerHTML = items.map(p => `
    <article class="project-card">
      ${p.imagen ? `<img class="project-image" src="${escapeAttr(p.imagen)}" alt="${escapeAttr(p.titulo)}" loading="lazy">` : ''}
      <div class="project-meta">
        <span>${escapeHTML(p.categoria || '')}</span>
        <span>${escapeHTML(p.año || '')}</span>
      </div>
      <h3 class="project-title">${escapeHTML(p.titulo)}</h3>
      ${p.cliente ? `<p class="project-client">${escapeHTML(p.cliente)}</p>` : ''}
      <p class="project-desc">${escapeHTML(p.descripcion)}</p>
      ${p.herramientas && p.herramientas.length ? `
        <div class="tag-row">
          ${p.herramientas.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
        </div>` : ''}
    </article>
  `).join('');
}

// ============================================
// CV
// ============================================
function renderCV(cv) {
  const exp = document.getElementById('cv-experiencia');
  exp.innerHTML = cv.experiencia.map(e => `
    <div class="timeline-item">
      <p class="timeline-period">${escapeHTML(e.periodo)}</p>
      <h4 class="timeline-title">${escapeHTML(e.empresa)}</h4>
      ${e.roles.map(r => `<p class="timeline-role">${escapeHTML(r)}</p>`).join('')}
    </div>
  `).join('');

  const form = document.getElementById('cv-formacion');
  form.innerHTML = cv.formacion.map(f => `
    <div class="timeline-item">
      <p class="timeline-period">${escapeHTML(f.periodo)}</p>
      <h4 class="timeline-title">${escapeHTML(f.institucion)}</h4>
      <p class="timeline-role">${escapeHTML(f.titulo)}</p>
    </div>
  `).join('');

  document.getElementById('cv-habilidades').innerHTML =
    cv.habilidades.map(h => `<li>${escapeHTML(h)}</li>`).join('');

  document.getElementById('cv-idiomas').innerHTML =
    cv.idiomas.map(i => `<li>${escapeHTML(i)}</li>`).join('');
}

// ============================================
// IDEAS
// ============================================
function renderIdeas(ideas) {
  const list = document.getElementById('ideas-list');
  list.innerHTML = ideas.map(i => `
    <article class="idea-card">
      <p class="idea-source">↳ ${escapeHTML(i.relacionadoCon)}</p>
      <p class="idea-reflexion">${escapeHTML(i.reflexion)}</p>
    </article>
  `).join('');
}

// ============================================
// CONTACTO
// ============================================
function renderContacto(contacto) {
  const items = [];
  if (contacto.email) items.push({ label: 'Email', value: contacto.email, href: `mailto:${contacto.email}` });
  if (contacto.whatsapp) items.push({ label: 'WhatsApp', value: contacto.whatsappVisible || contacto.whatsapp, href: contacto.whatsapp });
  if (contacto.linkedin) items.push({ label: 'LinkedIn', value: contacto.linkedin.replace('https://', ''), href: contacto.linkedin });

  document.getElementById('contact-grid').innerHTML = items.map(i => `
    <a class="contact-item" href="${escapeAttr(i.href)}" target="_blank" rel="noopener">
      <span>
        <span class="contact-label">${escapeHTML(i.label)}</span>
        <span class="contact-value">${escapeHTML(i.value)}</span>
      </span>
      <span class="contact-arrow">↗</span>
    </a>
  `).join('');
}

// ============================================
// Utilidades
// ============================================
function escapeHTML(str) {
  if (str === undefined || str === null) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;');
}

// ============================================
// Navegación por pestañas
// ============================================
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.panel'));

  function activate(name, updateHash = true) {
    tabs.forEach(t => {
      const isActive = t.dataset.tab === name;
      t.toggleAttribute('aria-current', isActive);
      if (isActive) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    panels.forEach(p => {
      p.hidden = p.dataset.panel !== name;
    });
    if (updateHash) history.replaceState(null, '', `#${name}`);
    document.getElementById('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));

  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.goto));
  });

  const initial = (location.hash || '#inicio').replace('#', '');
  const valid = tabs.some(t => t.dataset.tab === initial);
  activate(valid ? initial : 'inicio', false);
}

// ============================================
// Init
// ============================================
document.getElementById('footer-year').textContent = new Date().getFullYear();
loadContent();
initTabs();
