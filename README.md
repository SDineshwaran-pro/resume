# Dineshwaran — Resume & Blog (Minimal White + Royal Blue)

This is a single-file static website (index.html) suitable for GitHub Pages.

## What is included
- `index.html` — The website (resume + blog)
- `Dineshwaran_Resume_CICD (4).docx` — Your uploaded resume (original DOCX)
- `README.md` — This file

## How to deploy on GitHub Pages
1. Create a new GitHub repository (e.g., `dineshwaran-resume`).
2. Upload the files from this ZIP to the repository root.
3. (Optional) Rename your resume file to `Dineshwaran_Resume.pdf` and update the download link in `index.html`. GitHub will serve the file directly.
4. In the repository Settings → Pages, set the branch to `main` and folder to `/ (root)`. Your site will be published at:
   `https://<your-username>.github.io/<repo-name>/`

## Customize
- Edit `index.html` to change text, add posts (in the `postsData` array), or replace the Formspree endpoint for the contact form.
- If you want to convert the DOCX to PDF before publishing, use any DOCX-to-PDF converter (LibreOffice, Microsoft Word, or online converters), then replace the file and update the download link.

If you'd like, I can:
- Convert the DOCX to PDF for you and repackage the ZIP.
- Convert this to a Jekyll site with `_posts` support for Markdown blogging.
