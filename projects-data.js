/* ==========================================
   PROJECT DATA — single source of truth
   Cards in index.html reference these by data-project id.
========================================== */
const projectData = {
    '1': {
        title: 'Phonne — Premium Smartphone Store',
        category: 'fullstack',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        stack: '<span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>E-commerce</span>',
        desc: `
            <div class="modal-detail">
                <h3>Problem</h3>
                <p>Buying premium smartphones online carries real risk — counterfeit stock, unclear availability, and delivery uncertainty erode trust before a customer checks out. Retailers need a storefront that makes high-ticket purchases feel safe and premium.</p>

                <h3>Solution</h3>
                <p>A fast, trust-first e-commerce storefront. Inventory is organized into curated featured and trending sections so customers land on quality products immediately, backed by verified stock badges, transparent delivery messaging, and a secure checkout flow.</p>

                <h3>Engineering</h3>
                <ul>
                    <li><strong>Mobile-first responsive layout</strong> — consistent shopping experience across phone, tablet, and desktop</li>
                    <li><strong>Dynamic product rendering</strong> — catalog sections populated from structured data with loading states</li>
                    <li><strong>Trust-focused UX</strong> — verified stock badges, transparent delivery messaging, and visible support channels</li>
                    <li><strong>Zero-dependency frontend</strong> — fast-loading static build deployed directly to Cloudflare Pages</li>
                </ul>

                <h3>Result</h3>
                <p>A production-quality storefront, live and publicly accessible, demonstrating a retail experience that feels as premium as the devices it sells — fast, trustworthy, and consistent on any device.</p>
            </div>`,
        links: '<a href="https://alphatech-1y7.pages.dev/" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a> <a href="https://github.com/manziemmy268-hash/AlphaTech" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View Source</a>'
    },
    '2': {
        title: 'Digital Identity System',
        category: 'frontend',
        img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        stack: '<span>HTML5</span><span>Performance</span><span>UX/UI</span>',
        desc: `
            <div class="modal-detail">
                <h3>Problem</h3>
                <p>A slow, poorly structured web presence erodes trust before a visitor reads a single word. Slow load times and weak design cost organizations visitors, credibility, and conversions.</p>

                <h3>Solution</h3>
                <p>A high-performance digital presence built mobile-first, designed to establish professional authority and convert visitors — with a polished glassmorphism design system and instant light/dark theme.</p>

                <h3>Engineering</h3>
                <ul>
                    <li><strong>Responsive images (srcset + sizes)</strong> — serves the optimal image size per viewport</li>
                    <li><strong>Font loading strategy</strong> — preconnect hints + font-display: swap eliminates FOIT</li>
                    <li><strong>CSS custom properties</strong> — instant dark/light theme toggle without reflow</li>
                    <li><strong>Semantic HTML5</strong> — proper landmarks, ARIA labels, and heading hierarchy for screen readers</li>
                </ul>

                <h3>Result</h3>
                <p>A fast, accessible, professional web presence that establishes authority, supports conversion, and represents the organization well on every device.</p>
            </div>`,
        links: '<a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View on GitHub</a>'
    }
};
