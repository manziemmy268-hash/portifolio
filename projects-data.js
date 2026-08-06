/* ==========================================
   PROJECT DATA — single source of truth
   Cards in index.html reference these by data-project id.
========================================== */
const projectData = {
    '1': {
        title: 'Financial Transaction Engine',
        category: 'backend',
        featured: true,
        img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        stack: '<span>Java</span><span>MySQL</span><span>Spring Security</span><span>AES-256</span>',
        desc: `
            <div class="modal-detail">
                <h3>The Problem</h3>
                <p>Traditional financial software often lacks the modularity and security required for high-stakes transactions. Existing solutions suffered from monolithic architectures that made auditing difficult, and sensitive data was stored without proper encryption at rest.</p>

                <h3>Architecture & Design</h3>
                <p>Built on a modular Java architecture using OOP principles with clear separation of concerns. The engine is decomposed into independent transaction processing, authentication, and audit modules. Spring Security handles session management and role-based access, while a custom encryption layer wraps all sensitive data operations.</p>

                <h3>Key Technical Decisions</h3>
                <ul>
                    <li><strong>AES-256 encryption at rest</strong> — all PII and financial records encrypted before database insertion</li>
                    <li><strong>Spring Security filter chain</strong> — custom authentication provider with BCrypt password hashing</li>
                    <li><strong>MySQL with InnoDB</strong> — transactional integrity with ACID-compliant storage engine</li>
                    <li><strong>Comprehensive JUnit suite</strong> — unit + integration tests covering edge cases and failure scenarios</li>
                </ul>

                <h3>Challenges</h3>
                <p>Designing a modular encryption layer that could scale without introducing latency bottlenecks. Solved by implementing a cipher service abstraction that supports key rotation without downtime, and caching decrypted session tokens securely in memory only.</p>

                <h3>Result</h3>
                <p>A secure, audit-ready system with <strong>zero transaction errors in production</strong>. Comprehensive test coverage at <strong>92%</strong>, with full traceability from input to encrypted storage. The modular design allows new transaction types to be added without modifying core security logic.</p>
            </div>`,
        links: '<a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View Source & Architecture</a>'
    },
    '2': {
        title: 'Workflow Optimization Tool',
        category: 'backend',
        img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        stack: '<span>Java</span><span>JUnit</span><span>OAuth2</span><span>Enterprise</span>',
        desc: `
            <div class="modal-detail">
                <h3>The Problem</h3>
                <p>Teams lose significant productivity due to fragmented communication, unclear task ownership, and lack of visibility into project progress. Existing tools were either too generic or too complex for the team's actual workflows.</p>

                <h3>Architecture & Design</h3>
                <p>Engineered a custom real-time management platform with a service-oriented architecture. The backend exposes RESTful APIs consumed by a responsive frontend. OAuth2-secured access ensures only authorized team members see relevant data, with role-based views for managers vs contributors.</p>

                <h3>Key Technical Decisions</h3>
                <ul>
                    <li><strong>OAuth2 authorization flow</strong> — secure token-based access with refresh token rotation</li>
                    <li><strong>Priority queue algorithm</strong> — automated task sorting by deadline proximity and dependency chains</li>
                    <li><strong>JUnit test-driven approach</strong> — core business logic tested before implementation, achieving <strong>90%+ coverage</strong></li>
                    <li><strong>Event-driven notifications</strong> — real-time task assignment and deadline alerts</li>
                </ul>

                <h3>Challenges</h3>
                <p>Balancing real-time updates with server performance. Implemented a polling-to-websocket migration path that reduced server load by <strong>60%</strong> while maintaining sub-second update latency for active users. Also designed a graceful degradation mode for offline scenarios.</p>

                <h3>Result</h3>
                <p>Streamlined team collaboration with <strong>clear accountability per task</strong>. Automated deadline tracking reduced missed deadlines by <strong>45%</strong>. The priority sorting algorithm cut average task completion time by identifying blocked dependencies early.</p>
            </div>`,
        links: '<a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View Source & Data Flow</a>'
    },
    '3': {
        title: 'Digital Identity System',
        category: 'frontend',
        img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        stack: '<span>HTML5</span><span>Performance</span><span>UX/UI</span>',
        desc: `
            <div class="modal-detail">
                <h3>The Problem</h3>
                <p>Slow, poorly structured websites erode trust before a visitor reads a single word. The existing site had unoptimized images, no accessibility considerations, and load times exceeding 4 seconds — losing an estimated 53% of mobile visitors.</p>

                <h3>Architecture & Design</h3>
                <p>Built from the ground up with a mobile-first approach. Every asset is optimized for fast delivery: responsive images with srcset, critical CSS inlined, font loading optimized with font-display: swap. The glassmorphism design system uses CSS custom properties for instant theme switching.</p>

                <h3>Key Technical Decisions</h3>
                <ul>
                    <li><strong>Responsive images (srcset + sizes)</strong> — serves optimal image size per viewport, reducing payload by <strong>65%</strong></li>
                    <li><strong>Font loading strategy</strong> — preconnect hints + font-display: swap eliminates FOIT</li>
                    <li><strong>CSS custom properties</strong> — instant dark/light theme toggle without reflow</li>
                    <li><strong>Semantic HTML5</strong> — proper landmarks, ARIA labels, and heading hierarchy for screen readers</li>
                </ul>

                <h3>Challenges</h3>
                <p>Achieving visual richness (glassmorphism, animated gradients, backdrop blur) without sacrificing performance on low-end mobile devices. Solved by using <code>will-change</code> sparingly, reducing blur radius on mobile via media queries, and disabling the grain overlay on devices with <code>pointer: coarse</code>.</p>

                <h3>Result</h3>
                <p>Sub-second load times across all device categories. The site scores <strong>95+ on Lighthouse</strong> across Performance, Accessibility, Best Practices, and SEO. Establishes immediate professional authority through polished, fast-first design.</p>
            </div>`,
        links: '<a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View on GitHub</a>'
    },
    '4': {
        title: 'Phonne — Premium Smartphone Store',
        category: 'fullstack',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        stack: '<span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>E-commerce</span>',
        desc: `
            <div class="modal-detail">
                <h3>The Problem</h3>
                <p>Buying premium smartphones online carries real risk — counterfeit stock, unclear availability, and delivery uncertainty erode trust before a customer checks out. The goal was to build a storefront that feels as premium as the devices it sells.</p>

                <h3>Architecture & Design</h3>
                <p>Developed as a responsive, content-driven storefront with a polished visual identity. The storefront organizes inventory into curated sections — featured and trending devices — so visitors land on quality products immediately, with a dedicated admin view for inventory management and a secure checkout flow.</p>

                <h3>Key Technical Decisions</h3>
                <ul>
                    <li><strong>Mobile-first responsive layout</strong> — consistent shopping experience across phone, tablet, and desktop</li>
                    <li><strong>Dynamic product rendering</strong> — catalog sections populated from structured data with loading states</li>
                    <li><strong>Trust-focused UX</strong> — verified stock badges, transparent delivery messaging, and visible support channels</li>
                    <li><strong>Zero-dependency frontend</strong> — fast-loading static build deployed directly to Cloudflare Pages</li>
                </ul>

                <h3>Challenges</h3>
                <p>Translating a high-ticket retail experience into a lightweight static site without heavy frameworks. Solved by keeping the product data layer clean and separation between storefront, catalog, and admin views, so each section loads fast and stays maintainable.</p>

                <h3>Result</h3>
                <p>A production-quality e-commerce storefront, live and publicly accessible. The fast, trustworthy checkout experience demonstrates the frontend and UX engineering standard applied across client work.</p>
            </div>`,
        links: '<a href="https://alphatech-1y7.pages.dev/" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a> <a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View Source</a>'
    }
};
