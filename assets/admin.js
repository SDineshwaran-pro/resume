// ── ADMIN.JS — Full CRUD Panel ──

document.addEventListener('DOMContentLoaded', () => {
  let data = JSON.parse(JSON.stringify(window.RESUME_DATA)); // deep clone

  // ── SIDEBAR NAVIGATION ──
  document.querySelectorAll('.snav').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.snav').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.dataset.section).classList.add('active');
    });
  });

  // ── TOAST ──
  function showToast(msg, color = 'var(--accent-3)') {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.style.background = color;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ── STATUS ──
  function setStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  // ── SAVE ALL ──
  document.getElementById('saveAll').addEventListener('click', () => {
    collectAll();
    try {
      localStorage.setItem('resumeData', JSON.stringify(data));
      showToast('✅ Changes saved! Refresh the site to see them.');
      setStatus('Saved ' + new Date().toLocaleTimeString());
    } catch(e) {
      showToast('❌ Save failed: ' + e.message, 'var(--danger)');
    }
  });

  // ── RESET ──
  document.getElementById('resetAll').addEventListener('click', () => {
    if (!confirm('Reset all content to defaults? This cannot be undone.')) return;
    localStorage.removeItem('resumeData');
    data = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
    renderAll();
    showToast('↺ Reset to defaults.');
    setStatus('Reset ' + new Date().toLocaleTimeString());
  });

  // ── COLLECT ALL FIELDS INTO data ──
  function collectAll() {
    collectMeta();
    collectExperience();
    collectSkills();
    collectAchievements();
    collectCertifications();
    collectEducation();
    collectSocial();
  }

  // ─────────────────────────────────────────
  // META
  // ─────────────────────────────────────────
  function renderMeta() {
    const m = data.meta;
    document.getElementById('meta-name').value     = m.name || '';
    document.getElementById('meta-title').value    = m.title || '';
    document.getElementById('meta-email').value    = m.email || '';
    document.getElementById('meta-phone').value    = m.phone || '';
    document.getElementById('meta-location').value = m.location || '';
    document.getElementById('meta-herosub').value  = m.heroSub || 'Building production-grade data pipelines & agentic AI systems that move the needle — not just the metrics.';
  }
  function collectMeta() {
    data.meta.name     = document.getElementById('meta-name').value;
    data.meta.title    = document.getElementById('meta-title').value;
    data.meta.email    = document.getElementById('meta-email').value;
    data.meta.phone    = document.getElementById('meta-phone').value;
    data.meta.location = document.getElementById('meta-location').value;
    data.meta.heroSub  = document.getElementById('meta-herosub').value;
  }

  // ─────────────────────────────────────────
  // EXPERIENCE
  // ─────────────────────────────────────────
  function renderExperience() {
    const container = document.getElementById('exp-editor');
    container.innerHTML = '';
    data.experience.forEach((exp, idx) => {
      container.appendChild(buildExpCard(exp, idx));
    });
  }
  function buildExpCard(exp, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';
    card.dataset.idx = idx;

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${exp.role || 'New Role'} — ${exp.company || ''}</span>
      <div class="card-actions">
        <div class="move-btns">
          <button class="btn-move" data-dir="up">↑</button>
          <button class="btn-move" data-dir="down">↓</button>
        </div>
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-grid">
        <div class="form-group">
          <label>Role / Position</label>
          <input class="f-role" type="text" value="${esc(exp.role)}"/>
        </div>
        <div class="form-group">
          <label>Company</label>
          <input class="f-company" type="text" value="${esc(exp.company)}"/>
        </div>
        <div class="form-group">
          <label>Division / Team</label>
          <input class="f-division" type="text" value="${esc(exp.division)}"/>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input class="f-location" type="text" value="${esc(exp.location)}"/>
        </div>
        <div class="form-group full">
          <label>Period</label>
          <input class="f-period" type="text" value="${esc(exp.period)}"/>
        </div>
        <div class="form-group full">
          <label>Bullet Points</label>
          <div class="bullets-list">
            ${(exp.bullets||[]).map((b,bi) => bulletRow(b, bi)).join('')}
          </div>
          <button class="btn-bullet-add">+ Add bullet</button>
        </div>
      </div>`;
    card.appendChild(body);

    // toggle
    header.addEventListener('click', e => {
      if (e.target.classList.contains('btn-del') || e.target.classList.contains('btn-move')) return;
      body.classList.toggle('open');
      header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });

    // delete
    header.querySelector('.btn-del').addEventListener('click', () => {
      data.experience.splice(idx, 1);
      renderExperience();
    });

    // move
    header.querySelectorAll('.btn-move').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        collectExperience();
        const dir = btn.dataset.dir;
        if (dir === 'up' && idx > 0) {
          [data.experience[idx-1], data.experience[idx]] = [data.experience[idx], data.experience[idx-1]];
        } else if (dir === 'down' && idx < data.experience.length-1) {
          [data.experience[idx], data.experience[idx+1]] = [data.experience[idx+1], data.experience[idx]];
        }
        renderExperience();
      });
    });

    // add bullet
    body.querySelector('.btn-bullet-add').addEventListener('click', () => {
      const list = body.querySelector('.bullets-list');
      const row = document.createElement('div');
      row.className = 'bullet-row';
      row.innerHTML = `<input type="text" placeholder="Add bullet point..."/><button class="btn-bullet-del">✕</button>`;
      row.querySelector('.btn-bullet-del').addEventListener('click', () => row.remove());
      list.appendChild(row);
    });

    // existing bullet del
    body.querySelectorAll('.btn-bullet-del').forEach(btn => {
      btn.addEventListener('click', () => btn.parentElement.remove());
    });

    return card;
  }
  function collectExperience() {
    data.experience = [];
    document.querySelectorAll('#exp-editor .editor-card').forEach(card => {
      data.experience.push({
        id: 'exp-' + Date.now() + Math.random(),
        role:     card.querySelector('.f-role')?.value || '',
        company:  card.querySelector('.f-company')?.value || '',
        division: card.querySelector('.f-division')?.value || '',
        location: card.querySelector('.f-location')?.value || '',
        period:   card.querySelector('.f-period')?.value || '',
        bullets:  [...card.querySelectorAll('.bullets-list input')].map(i => i.value).filter(Boolean)
      });
    });
  }
  document.getElementById('add-exp').addEventListener('click', () => {
    collectExperience();
    data.experience.unshift({ id: 'exp-new', role: 'New Role', company: '', division: '', location: '', period: '', bullets: [] });
    renderExperience();
  });

  // ─────────────────────────────────────────
  // SKILLS
  // ─────────────────────────────────────────
  function renderSkills() {
    const container = document.getElementById('skill-editor');
    container.innerHTML = '';
    data.skills.forEach((cat, idx) => {
      container.appendChild(buildSkillCard(cat, idx));
    });
  }
  function buildSkillCard(cat, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';
    card.dataset.idx = idx;

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${cat.category || 'Category'}</span>
      <div class="card-actions">
        <div class="move-btns">
          <button class="btn-move" data-dir="up">↑</button>
          <button class="btn-move" data-dir="down">↓</button>
        </div>
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-group" style="margin-bottom:1rem;">
        <label>Category Name</label>
        <input class="f-cat" type="text" value="${esc(cat.category)}"/>
      </div>
      <div class="form-group">
        <label>Skills (press Enter or comma to add)</label>
        <div class="tags-input-row" id="tags-${idx}">
          ${(cat.items||[]).map(item => chipHTML(item)).join('')}
          <input class="tag-new-input" type="text" placeholder="Add skill..."/>
        </div>
      </div>`;
    card.appendChild(body);

    // toggle
    header.addEventListener('click', e => {
      if (e.target.classList.contains('btn-del') || e.target.classList.contains('btn-move')) return;
      body.classList.toggle('open');
      header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });

    header.querySelector('.btn-del').addEventListener('click', () => {
      data.skills.splice(idx, 1);
      renderSkills();
    });

    header.querySelectorAll('.btn-move').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        collectSkills();
        const dir = btn.dataset.dir;
        if (dir === 'up' && idx > 0) [data.skills[idx-1], data.skills[idx]] = [data.skills[idx], data.skills[idx-1]];
        else if (dir === 'down' && idx < data.skills.length-1) [data.skills[idx], data.skills[idx+1]] = [data.skills[idx+1], data.skills[idx]];
        renderSkills();
      });
    });

    // chip delete
    body.querySelectorAll('.chip-del').forEach(btn => {
      btn.addEventListener('click', () => btn.parentElement.remove());
    });

    // add skill on enter/comma
    const newInput = body.querySelector('.tag-new-input');
    newInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = newInput.value.replace(',','').trim();
        if (!val) return;
        const chip = document.createElement('span');
        chip.className = 'skill-chip';
        chip.innerHTML = `${esc(val)}<button class="chip-del">✕</button>`;
        chip.querySelector('.chip-del').addEventListener('click', () => chip.remove());
        newInput.parentElement.insertBefore(chip, newInput);
        newInput.value = '';
      }
    });

    return card;
  }
  function collectSkills() {
    data.skills = [];
    document.querySelectorAll('#skill-editor .editor-card').forEach(card => {
      data.skills.push({
        category: card.querySelector('.f-cat')?.value || '',
        items: [...card.querySelectorAll('.skill-chip')].map(c => c.textContent.replace('✕','').trim()).filter(Boolean)
      });
    });
  }
  document.getElementById('add-skill').addEventListener('click', () => {
    collectSkills();
    data.skills.push({ category: 'New Category', items: [] });
    renderSkills();
  });

  // ─────────────────────────────────────────
  // ACHIEVEMENTS
  // ─────────────────────────────────────────
  function renderAchievements() {
    const container = document.getElementById('ach-editor');
    container.innerHTML = '';
    data.achievements.forEach((a, idx) => container.appendChild(buildAchCard(a, idx)));
  }
  function buildAchCard(a, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${a.icon || '🏆'} ${a.title || 'Achievement'}</span>
      <div class="card-actions">
        <div class="move-btns">
          <button class="btn-move" data-dir="up">↑</button>
          <button class="btn-move" data-dir="down">↓</button>
        </div>
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-grid">
        <div class="form-group">
          <label>Icon (emoji)</label>
          <input class="f-icon" type="text" value="${esc(a.icon)}" maxlength="4"/>
        </div>
        <div class="form-group">
          <label>Title</label>
          <input class="f-title" type="text" value="${esc(a.title)}"/>
        </div>
        <div class="form-group full">
          <label>Description</label>
          <textarea class="f-desc" rows="3">${esc(a.description)}</textarea>
        </div>
        <div class="form-group">
          <label>Link URL (optional)</label>
          <input class="f-link" type="text" value="${esc(a.link || '')}"/>
        </div>
        <div class="form-group">
          <label>Link Label</label>
          <input class="f-linklabel" type="text" value="${esc(a.linkLabel || '')}"/>
        </div>
      </div>`;
    card.appendChild(body);

    header.addEventListener('click', e => {
      if (e.target.classList.contains('btn-del') || e.target.classList.contains('btn-move')) return;
      body.classList.toggle('open'); header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });
    header.querySelector('.btn-del').addEventListener('click', () => { data.achievements.splice(idx,1); renderAchievements(); });
    header.querySelectorAll('.btn-move').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); collectAchievements();
        const dir = btn.dataset.dir;
        if (dir==='up'&&idx>0) [data.achievements[idx-1],data.achievements[idx]]=[data.achievements[idx],data.achievements[idx-1]];
        else if (dir==='down'&&idx<data.achievements.length-1) [data.achievements[idx],data.achievements[idx+1]]=[data.achievements[idx+1],data.achievements[idx]];
        renderAchievements();
      });
    });
    return card;
  }
  function collectAchievements() {
    data.achievements = [];
    document.querySelectorAll('#ach-editor .editor-card').forEach(card => {
      data.achievements.push({
        id: 'ach-' + Date.now(),
        icon:        card.querySelector('.f-icon')?.value || '🏆',
        title:       card.querySelector('.f-title')?.value || '',
        description: card.querySelector('.f-desc')?.value || '',
        link:        card.querySelector('.f-link')?.value || null,
        linkLabel:   card.querySelector('.f-linklabel')?.value || null
      });
    });
  }
  document.getElementById('add-ach').addEventListener('click', () => {
    collectAchievements();
    data.achievements.push({ id: 'ach-new', icon: '🏆', title: 'New Achievement', description: '', link: null, linkLabel: null });
    renderAchievements();
  });

  // ─────────────────────────────────────────
  // CERTIFICATIONS
  // ─────────────────────────────────────────
  function renderCertifications() {
    const container = document.getElementById('cert-editor');
    container.innerHTML = '';
    data.certifications.forEach((c, idx) => container.appendChild(buildCertCard(c, idx)));
  }
  function buildCertCard(c, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${c.icon||'🎓'} ${c.name || 'Certification'}</span>
      <div class="card-actions">
        <div class="move-btns">
          <button class="btn-move" data-dir="up">↑</button>
          <button class="btn-move" data-dir="down">↓</button>
        </div>
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-grid">
        <div class="form-group">
          <label>Icon (emoji)</label>
          <input class="f-icon" type="text" value="${esc(c.icon||'🎓')}" maxlength="4"/>
        </div>
        <div class="form-group">
          <label>Certification Name</label>
          <input class="f-name" type="text" value="${esc(c.name)}"/>
        </div>
        <div class="form-group">
          <label>Issuing Organization</label>
          <input class="f-issuer" type="text" value="${esc(c.issuer)}"/>
        </div>
        <div class="form-group">
          <label>Year</label>
          <input class="f-year" type="text" value="${esc(c.year)}"/>
        </div>
        <div class="form-group full">
          <label>Description</label>
          <textarea class="f-desc" rows="3">${esc(c.description||'')}</textarea>
        </div>
        <div class="form-group">
          <label>Certificate URL (optional)</label>
          <input class="f-link" type="text" value="${esc(c.link||'')}"/>
        </div>
        <div class="form-group">
          <label>Link Label</label>
          <input class="f-linklabel" type="text" value="${esc(c.linkLabel||'View Certificate ↗')}"/>
        </div>
      </div>`;
    card.appendChild(body);

    header.addEventListener('click', e => {
      if (e.target.classList.contains('btn-del') || e.target.classList.contains('btn-move')) return;
      body.classList.toggle('open'); header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });
    header.querySelector('.btn-del').addEventListener('click', () => { data.certifications.splice(idx,1); renderCertifications(); });
    header.querySelectorAll('.btn-move').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); collectCertifications();
        const dir = btn.dataset.dir;
        if (dir==='up'&&idx>0) [data.certifications[idx-1],data.certifications[idx]]=[data.certifications[idx],data.certifications[idx-1]];
        else if (dir==='down'&&idx<data.certifications.length-1) [data.certifications[idx],data.certifications[idx+1]]=[data.certifications[idx+1],data.certifications[idx]];
        renderCertifications();
      });
    });
    return card;
  }
  function collectCertifications() {
    data.certifications = [];
    document.querySelectorAll('#cert-editor .editor-card').forEach(card => {
      const link = card.querySelector('.f-link')?.value;
      data.certifications.push({
        id: 'cert-' + Date.now(),
        icon:        card.querySelector('.f-icon')?.value || '🎓',
        name:        card.querySelector('.f-name')?.value || '',
        issuer:      card.querySelector('.f-issuer')?.value || '',
        year:        card.querySelector('.f-year')?.value || '',
        description: card.querySelector('.f-desc')?.value || '',
        link:        link || null,
        linkLabel:   card.querySelector('.f-linklabel')?.value || 'View Certificate ↗'
      });
    });
  }
  document.getElementById('add-cert').addEventListener('click', () => {
    collectCertifications();
    data.certifications.push({ id:'cert-new', icon:'🎓', name:'New Certification', issuer:'', year:'', description:'', link:null, linkLabel:'View Certificate ↗' });
    renderCertifications();
  });

  // ─────────────────────────────────────────
  // EDUCATION
  // ─────────────────────────────────────────
  function renderEducation() {
    const container = document.getElementById('edu-editor');
    container.innerHTML = '';
    data.education.forEach((e, idx) => container.appendChild(buildEduCard(e, idx)));
  }
  function buildEduCard(e, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${e.degree || 'Education Entry'}</span>
      <div class="card-actions">
        <div class="move-btns">
          <button class="btn-move" data-dir="up">↑</button>
          <button class="btn-move" data-dir="down">↓</button>
        </div>
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-grid">
        <div class="form-group full">
          <label>Degree / Course</label>
          <input class="f-degree" type="text" value="${esc(e.degree)}"/>
        </div>
        <div class="form-group full">
          <label>Institution</label>
          <input class="f-institution" type="text" value="${esc(e.institution)}"/>
        </div>
        <div class="form-group">
          <label>Period (e.g. 2019 – 2023)</label>
          <input class="f-period" type="text" value="${esc(e.period)}"/>
        </div>
        <div class="form-group">
          <label>Grade / CGPA / %</label>
          <input class="f-grade" type="text" value="${esc(e.grade)}"/>
        </div>
      </div>`;
    card.appendChild(body);

    header.addEventListener('click', e2 => {
      if (e2.target.classList.contains('btn-del') || e2.target.classList.contains('btn-move')) return;
      body.classList.toggle('open'); header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });
    header.querySelector('.btn-del').addEventListener('click', () => { data.education.splice(idx,1); renderEducation(); });
    header.querySelectorAll('.btn-move').forEach(btn => {
      btn.addEventListener('click', e2 => {
        e2.stopPropagation(); collectEducation();
        const dir = btn.dataset.dir;
        if (dir==='up'&&idx>0) [data.education[idx-1],data.education[idx]]=[data.education[idx],data.education[idx-1]];
        else if (dir==='down'&&idx<data.education.length-1) [data.education[idx],data.education[idx+1]]=[data.education[idx+1],data.education[idx]];
        renderEducation();
      });
    });
    return card;
  }
  function collectEducation() {
    data.education = [];
    document.querySelectorAll('#edu-editor .editor-card').forEach(card => {
      data.education.push({
        id: 'edu-' + Date.now(),
        degree:      card.querySelector('.f-degree')?.value || '',
        institution: card.querySelector('.f-institution')?.value || '',
        period:      card.querySelector('.f-period')?.value || '',
        grade:       card.querySelector('.f-grade')?.value || ''
      });
    });
  }
  document.getElementById('add-edu').addEventListener('click', () => {
    collectEducation();
    data.education.push({ id:'edu-new', degree:'New Degree', institution:'', period:'', grade:'' });
    renderEducation();
  });

  // ─────────────────────────────────────────
  // SOCIAL LINKS
  // ─────────────────────────────────────────
  function renderSocial() {
    const container = document.getElementById('social-editor');
    container.innerHTML = '';
    data.social.forEach((s, idx) => container.appendChild(buildSocialCard(s, idx)));
  }
  function buildSocialCard(s, idx) {
    const card = document.createElement('div');
    card.className = 'editor-card';

    const header = document.createElement('div');
    header.className = 'editor-card-header';
    header.innerHTML = `
      <span class="card-title">${s.icon || '🔗'} ${s.label || 'Link'}</span>
      <div class="card-actions">
        <button class="btn-del">Remove</button>
        <span class="chevron">▾</span>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'editor-card-body';
    body.innerHTML = `
      <div class="form-grid">
        <div class="form-group">
          <label>Icon (emoji)</label>
          <input class="f-icon" type="text" value="${esc(s.icon||'🔗')}" maxlength="4"/>
        </div>
        <div class="form-group">
          <label>Label</label>
          <input class="f-label" type="text" value="${esc(s.label)}"/>
        </div>
        <div class="form-group full">
          <label>URL</label>
          <input class="f-url" type="text" value="${esc(s.url)}"/>
        </div>
      </div>`;
    card.appendChild(body);

    header.addEventListener('click', e => {
      if (e.target.classList.contains('btn-del')) return;
      body.classList.toggle('open'); header.classList.toggle('open');
      header.querySelector('.chevron').classList.toggle('open');
    });
    header.querySelector('.btn-del').addEventListener('click', () => { data.social.splice(idx,1); renderSocial(); });
    return card;
  }
  function collectSocial() {
    data.social = [];
    document.querySelectorAll('#social-editor .editor-card').forEach(card => {
      data.social.push({
        icon:  card.querySelector('.f-icon')?.value || '🔗',
        label: card.querySelector('.f-label')?.value || '',
        url:   card.querySelector('.f-url')?.value || '#',
        placeholder: false
      });
    });
  }
  document.getElementById('add-social').addEventListener('click', () => {
    collectSocial();
    data.social.push({ icon:'🔗', label:'New Link', url:'https://', placeholder:false });
    renderSocial();
  });

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }
  function bulletRow(text, idx) {
    return `<div class="bullet-row">
      <input type="text" value="${esc(text)}" placeholder="Bullet point..."/>
      <button class="btn-bullet-del">✕</button>
    </div>`;
  }
  function chipHTML(text) {
    return `<span class="skill-chip">${esc(text)}<button class="chip-del">✕</button></span>`;
  }

  // ─────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────
  function renderAll() {
    renderMeta();
    renderExperience();
    renderSkills();
    renderAchievements();
    renderCertifications();
    renderEducation();
    renderSocial();
  }
  renderAll();

  const saved = localStorage.getItem('resumeData');
  setStatus(saved ? 'Custom data loaded' : 'Showing defaults');
});
