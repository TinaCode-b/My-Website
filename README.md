# Ernestina Boakye Dankwah — Portfolio

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies.

## Structure
```
index.html          page markup
css/styles.css      all styling (light + dark theme tokens at the top)
js/data.js          YOUR CONTENT: contact details, projects, skills, stats
js/main.js          rendering, filters, case-study overlay, nav, theme, form
assets/projects/    project screenshots (cinesynapse, fanfare, chronicle, elveelia .jpg)
```

## Run locally
Open `index.html` in a browser, or run `npx serve .` in this folder.

## Edit content
Everything you will normally change is in `js/data.js`:
- `CONFIG`: email, phone, WhatsApp, GitHub, Instagram, and `linkedin` (paste your profile URL).
- `projects`: add `live` and `github` links, swap images, change descriptions.
- Bloom shows a blurred "coming soon" preview. Add `assets/projects/bloom.png` and
  remove `soon:true` from the Bloom entry to show the real screenshot.
- DecorAI GH: add `assets/projects/decoraigh.png` for a real preview.

## Contact form
The form validates input, then opens the visitor's email app with the message prefilled
(it has no server). For direct delivery, connect Formspree or EmailJS in `js/main.js`.

## Push to GitHub
```
git init
git add .
git commit -m "Redesign portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Deploy free with Vercel or GitHub Pages (serve the repository root).
