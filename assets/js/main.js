// ── MAIN.JS — renders all sections from RESUME_DATA ──

document.addEventListener('DOMContentLoaded', () => {
  const D = window.RESUME_DATA;

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Meta
  document.getElementById('contact-email').textContent = D.meta.email;
  document.getElementById('contact-phone').textContent = D.meta.phone;
  document.getElementById('contact-location').textContent = D.meta.location;

  // ── EXPERIENCE ──
  const expList = document.getElementById('experience-list');
  expList.innerHTML = D.experience.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-date">${exp.period}</div>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-role">${exp.role}</div>
        <div class="timeline-company">${exp.company}</div>
        <div class="timeline-location">${exp.division} · ${exp.location}</div>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  // ── SKILLS ──
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = D.skills.map(cat => `
    <div class="skill-category reveal">
      <div class="skill-cat-name">${cat.category}</div>
      <div class="skill-tags">
        ${cat.items.map(i => `<span class="skill-tag">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // ── ACHIEVEMENTS ──
  const achList = document.getElementById('achievements-list');
  achList.innerHTML = D.achievements.map(a => `
    <div class="achievement-card reveal">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-desc">${a.description}</div>
      ${a.link ? `<a class="achievement-link" href="${a.link}" target="_blank" rel="noopener">${a.linkLabel}</a>` : ''}
    </div>
  `).join('');

  // ── CERTIFICATIONS ──
  const certsList = document.getElementById('certs-list');
  certsList.innerHTML = D.certifications.map(c => `
    <div class="cert-card reveal">
      <div class="cert-badge">${c.icon}</div>
      <div class="cert-info">
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-year">${c.year}</div>
        <div class="cert-desc">${c.description}</div>
        ${c.link ? `<a class="cert-link" href="${c.link}" target="_blank" rel="noopener">${c.linkLabel}</a>` : ''}
      </div>
    </div>
  `).join('');

  // ── EDUCATION ──
  const eduList = document.getElementById('education-list');
  eduList.innerHTML = D.education.map(e => `
    <div class="edu-card reveal">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-school">${e.institution}</div>
      <div class="edu-year">${e.period}</div>
      <div class="edu-grade">${e.grade}</div>
    </div>
  `).join('');

  // ── SOCIAL LINKS ──
  const socialLinks = document.getElementById('social-links');
  socialLinks.innerHTML = D.social.map(s => `
    <a class="social-link${s.placeholder ? ' placeholder' : ''}" 
       href="${s.url}" target="_blank" rel="noopener">
      <span class="s-icon">${s.icon}</span>
      <span>${s.label}</span>
      <span style="margin-left:auto;font-size:0.75rem;color:var(--text-muted)">↗</span>
    </a>
  `).join('');

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── MOBILE NAV ──
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── NAVBAR SCROLL STATE ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(6,8,16,0.97)';
    } else {
      navbar.style.background = 'rgba(6,8,16,0.85)';
    }
  });

  // ── STAGGER REVEAL ALREADY VISIBLE ──
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setTimeout(() => el.classList.add('visible'), i * 60);
      }
    });
  }, 100);
});
