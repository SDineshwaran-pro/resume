# Dineshwaran S — Portfolio Site

A modern, ultra-dark portfolio site with a built-in **Admin Panel** for managing all content dynamically — no backend needed.

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1 — Create a GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `your-username.github.io` (e.g. `dineshwaran-s.github.io`)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload the files
Option A — GitHub Web UI:
1. Open your new repo → click **Add file → Upload files**
2. Drag and drop **all files and folders** from this zip
3. Commit with message: `Initial portfolio site`

Option B — Git CLI:
```bash
cd resume-site
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io`

---

## ⚙️ Admin Panel

Visit `/admin/index.html` on your site to manage content:

- **Profile** — name, email, phone, location
- **Experience** — add/edit/reorder roles with bullet points
- **Skills** — manage categories and skill tags
- **Achievements** — add awards and milestones
- **Certifications** — add credentials with links
- **Education** — manage academic history
- **Social Links** — update LinkedIn, GitHub, etc.

> All changes are saved to **browser localStorage** and reflected instantly on the site. No database or backend required.

---

## 📁 File Structure

```
resume-site/
├── index.html              ← Main portfolio page
├── admin/
│   └── index.html          ← Admin panel
├── assets/
│   ├── css/
│   │   ├── style.css       ← Main styles
│   │   └── admin.css       ← Admin styles
│   └── js/
│       ├── data.js         ← All resume content (edit defaults here)
│       ├── main.js         ← Renders portfolio from data
│       └── admin.js        ← Admin panel logic
└── README.md
```

## ✏️ Updating Default Content

To permanently change the default content (so it loads even on new browsers), edit `assets/js/data.js` — the `DEFAULT_DATA` object contains everything.

---

Built with Space Grotesk · Space Mono · Syne  
Powered by Claude AI 🤖
