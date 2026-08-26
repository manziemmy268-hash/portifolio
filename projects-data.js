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
                <p>Buying an expensive smartphone online is stressful. Customers worry about receiving a fake product, can't tell if something is actually in stock, and have no idea when it will arrive. These worries make them abandon their cart — or never visit in the first place. The store owner needed a website that removes that doubt and makes buying feel safe.</p>

                <h3>Solution</h3>
                <p>I built a clean, fast online store that puts trust first. Products are organized into featured and trending sections so customers immediately see quality items. Each product shows a verified stock badge, a clear delivery estimate, and visible contact options — so there's no guessing at any step.</p>

                <h3>What I Built</h3>
                <ul>
                    <li><strong>Works perfectly on any device</strong> — whether someone is on a phone, tablet, or desktop computer, the experience stays smooth and consistent</li>
                    <li><strong>Products load automatically</strong> — the store pulls product info from organized data, so adding or updating items doesn't require rebuilding the site</li>
                    <li><strong>Trust at every step</strong> — stock badges, delivery info, and support links are always visible so customers never feel uncertain</li>
                    <li><strong>Lightweight and fast</strong> — no heavy tools or frameworks. Just clean code that loads quickly, hosted on Cloudflare for speed worldwide</li>
                </ul>

                <h3>Result</h3>
                <p>A fully working online store that's live right now. It loads fast on any device and gives customers the confidence to browse, choose, and complete their purchase without second-guessing.</p>
            </div>`,
        links: '<a href="https://alphatech-1y7.pages.dev/" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a> <a href="https://github.com/manziemmy268-hash/AlphaTech" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View Source</a>'
    }
};
