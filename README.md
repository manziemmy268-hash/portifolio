# Emmy Software Solutions — Business Software Portfolio

A business-focused portfolio for **Emmanuel** ("Emmy"), positioning custom software engineering around the operational problems it solves — manual processes, disconnected operations, slow reporting, and limited visibility.

Built with **Vanilla JavaScript**, **Modern CSS (Glassmorphism)**, and **HTML5**. Designed for performance, accessibility, and security, with messaging that speaks to business owners and decision-makers.

![Portfolio Preview](profile.jpg)

## 🚀 Key Features

- **Business-Positioned Messaging**: Problem-first hero, pain-point section, solutions, and an "engineered for reliability" approach section.
- **Premium Aesthetics**: Smooth glassmorphism effects and dynamic background orbs.
- **Security Hardened**:
  - Subresource Integrity (SRI) for external assets.
  - Strict Content Security Policy (CSP) and security headers.
- **Blazing Fast**: Optimized for Core Web Vitals with high-priority asset loading, optimized images, and `content-visibility`.
- **Responsive & Dynamic**: Fully mobile-optimized with smooth reveal animations.
- **Dark Mode**: Native theme switching with persistent state.
- **Accessible**: WCAG AA — skip links, focus trap, ARIA labels, `prefers-reduced-motion` support.
- **SEO-Ready**: Semantic HTML, JSON-LD structured data, Open Graph/Twitter cards, sitemap, and canonical URL.

## 🧭 Page Structure

```text
Home       → Hero: "Turn Manual Business Processes Into Reliable Software Systems."
Problems   → The operational pains: manual records, disconnected ops, slow reporting, limited visibility
Solutions  → 5 offerings: automation, operations management, MIS, custom apps, reporting & analytics
Projects   → Flagship case study (Alphatech)
Approach   → 6-step methodology: Understand → Design → Build → Validate → Deploy → Improve
Engineering→ Reliability pillars: security, data integrity, architecture, visibility, testing
About      → Positioning statement, defensible metrics, experience timeline
Skills     → Engineering competencies (moved below business content)
Contact    → Lead-qualifying inquiry form + direct channels
```

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Design**: Custom Glassmorphism System, Font Awesome 6.4
- **Performance**: Intersection Observer API, Fetch Priority
- **Security**: SRI, CSP Headers

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
