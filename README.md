# Tina — Mobile App Developer Portfolio

A personal portfolio site for Tina, a developer studying Computer Science at Kwame Nkrumah University of Science and Technology, focused on mobile app development with React Native alongside web development.



## About

This is a single-page portfolio built with plain HTML, CSS, and JavaScript — no frameworks or build step. It covers:

- **Home** — intro and a quick snapshot of core tech
- **About** — background, education, and a short bio
- **Skills** — mobile app development (React Native, Expo, Firebase, REST APIs), web development, software development, and social media management
- **Contact** — a working contact form (via EmailJS) plus phone, email, LinkedIn, and Instagram links

## Features

- Light/dark mode toggle with saved preference (`localStorage`)
- Fully responsive layout, down to small mobile screens
- Smooth-scroll navigation with a mobile hamburger menu
- Scroll-reveal animations on skill, education, and contact cards
- Contact form wired up to [EmailJS](https://www.emailjs.com/) for message delivery

## Tech Stack

| Layer      | Tools |
|------------|-------|
| Markup     | HTML5 |
| Styling    | CSS3 (custom properties, Grid, Flexbox) |
| Fonts      | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter) |
| Scripting  | Vanilla JavaScript |
| Forms      | [EmailJS](https://www.emailjs.com/) |
| Hosting    | GitHub Pages |

## Project Structure

```
tina-portfolio1/
├── index.html      # Page markup and content
├── style.css       # All styling, including light/dark theme variables
├── web.js          # Theme toggle, nav, scroll reveal, contact form logic
├── phone.png
├── email.png
├── linkedin.png
├── instagram.png   # Contact icons
└── README.md
```

## Running Locally

No build tools needed — just open the file directly, or serve it locally:

```bash
git clone https://github.com/GK-11/tina-portfolio1.git
cd tina-portfolio1
# then open index.html in your browser, or run a local server:
python3 -m http.server 8000
```

Visit `http://localhost:8000` in your browser.

## Deployment

This site is deployed with **GitHub Pages** from the `main` branch. Any changes pushed to `main` go live automatically.

## Contact

- **Email:** bdernestina5@gmail.com
- **Phone:** +233 509 306 832
- **Instagram:** [@iam_akuah](https://instagram.com/iam_akuah)

---

Crafted with ♥ by Tina Codes# Tina-Website
