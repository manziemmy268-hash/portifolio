# Modern Software Developer Portfolio

A premium, high-performance portfolio website built with **Vanilla JavaScript**, **Modern CSS (Glassmorphism)**, and **HTML5**. Designed with a focus on aesthetics, security, and blazing-fast performance.

![Portfolio Preview](profile.jpg)

## 🚀 Key Features

- **Premium Aesthetics**: Smooth glassmorphism effects and dynamic background orbs.
- **Security Hardened**: 
  - Subresource Integrity (SRI) for external assets.
  - Strict Content Security Policy (CSP) and security headers.
- **Blazing Fast**: Optimized for Core Web Vitals with high-priority asset loading, optimized images, and `content-visibility`.
- **Responsive & Dynamic**: Fully mobile-optimized with smooth reveal animations.
- **Dark Mode**: Native theme switching with persistent state.
- **Accessible**: WCAG AA — skip links, focus trap, ARIA labels, `prefers-reduced-motion` support.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Design**: Custom Glassmorphism System, Font Awesome 6.4
- **Performance**: Intersection Observer API, Fetch Priority
- **Security**: SRI, CSP Headers, Bot Mitigation

## 📁 Project Structure

```text
├── index.html          # Main structure, SEO & structured data
├── index.css           # Custom design system & responsiveness
├── index.js            # Interactions, a11y & performance logic
├── projects-data.js    # Single source of truth for project data
├── vercel.json         # Deployment & security headers
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler rules
├── profile.jpg         # Hero portrait (optimized)
├── background.jpg      # Dark mode background (optimized)
└── og-image.jpg        # Open Graph social share card
```

## 🔒 Security & Privacy

This repository follows industry best practices:
- **Zero Secrets**: No API keys or sensitive data are stored in the repo.
- **Subresource Integrity**: All external libraries are verified via SRI hashes.
- **Strict CSP**: Content-Security-Policy restricts scripts, styles, and images to trusted origins.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
Developed by **Emmanuel** - [LinkedIn](https://www.linkedin.com/in/emmy-manzi-499962380/)
