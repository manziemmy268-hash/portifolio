document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    ========================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* ==========================================
       THEME TOGGLE LOGIC
    ========================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================
       NAVBAR: SCROLL SPY & MOBILE TOGGLE
    ========================================== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const sections = document.querySelectorAll('section[id]');

    // Navbar background on scroll
    // Scroll spy — highlight active nav link
    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll spy
        const scrollPos = scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });

        // Back to top
        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile nav toggle
    if (navToggle && navLinksContainer) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        function closeNav() {
            navLinksContainer.classList.remove('open');
            overlay.classList.remove('active');
            navToggle.querySelector('i').className = 'fa-solid fa-bars';
        }

        navToggle.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.contains('open');
            if (isOpen) {
                closeNav();
            } else {
                navLinksContainer.classList.add('open');
                overlay.classList.add('active');
                navToggle.querySelector('i').className = 'fa-solid fa-xmark';
            }
        });

        overlay.addEventListener('click', closeNav);

        // Close nav on link click
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close nav on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinksContainer.classList.contains('open')) {
                closeNav();
            }
        });
    }

    /* ==========================================
       AJAX FORM SUBMISSION WITH VALIDATION
    ========================================== */
    const form = document.querySelector('.contact-form');
    if (form) {
        const messageInput = document.getElementById('message');
        const charCount = document.querySelector('.char-count');
        const submitBtn = form.querySelector('.form-btn');

        // Real-time character counter
        if (messageInput && charCount) {
            messageInput.addEventListener('input', () => {
                const currentLength = messageInput.value.length;
                charCount.textContent = `${currentLength}/500`;
                if (currentLength >= 450) {
                    charCount.style.color = 'var(--accent-quaternary)';
                } else {
                    charCount.style.color = 'var(--text-secondary)';
                }
            });
        }

        // Validation functions
        const validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                if (value.trim().length > 50) return 'Name must be less than 50 characters';
                return '';
            },
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            },
            phone: (value) => {
                if (!value.trim()) return ''; // Optional field
                const phoneRegex = /^[0-9\s\-\+\(\)]{7,}$/;
                if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
                return '';
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                if (value.length > 500) return 'Message must not exceed 500 characters';
                return '';
            }
        };

        // Validate single field
        function validateField(fieldName) {
            const input = form.querySelector(`#${fieldName}`);
            const errorElement = document.getElementById(`${fieldName}-error`);
            const error = validators[fieldName](input.value);

            if (error) {
                input.classList.add('error');
                input.classList.remove('success');
                if (errorElement) {
                    errorElement.textContent = error;
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('error');
                input.classList.add('success');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }

        // Real-time validation on blur
        ['name', 'email', 'phone', 'message'].forEach(fieldName => {
            const input = form.querySelector(`#${fieldName}`);
            if (input) {
                input.addEventListener('blur', () => validateField(fieldName));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error') || input.classList.contains('success')) {
                        validateField(fieldName);
                    }
                });
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateField('name');
            const isEmailValid = validateField('email');
            const isPhoneValid = validateField('phone');
            const isMessageValid = validateField('message');

            if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
                return;
            }

            // Loading state
            submitBtn.disabled = true;
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent Successfully!';
                    submitBtn.style.background = '#10b981'; // Success Green
                    
                    const successMsg = document.getElementById('form-success');
                    if (successMsg) {
                        successMsg.textContent = '✓ Thank you! I\'ll get back to you shortly.';
                        successMsg.classList.add('show');
                    }

                    // Reset form and styles
                    form.reset();
                    charCount.textContent = '0/500';
                    form.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                        input.classList.remove('error', 'success');
                    });

                    // Reset button after 4 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        successMsg.classList.remove('show');
                    }, 4000);
                } else {
                    let errorMessage = 'Oops! Problem submitting.';
                    try {
                        const data = await response.json();
                        if (Object.hasOwn(data, 'errors')) {
                            errorMessage = data.errors.map(err => err.message).join(", ");
                        }
                    } catch (err) {
                        // ignore JSON parse error
                    }
                    submitBtn.innerHTML = `<i class="fa-solid fa-xmark"></i> ${errorMessage}`;
                    submitBtn.style.background = '#ef4444'; // Error Red
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                    }, 3000);
                }
            } catch (error) {
                submitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Network Error.';
                submitBtn.style.background = '#ef4444'; // Error Red
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       PROJECT MODALS DATA & LOGIC
    ========================================== */
    const projectData = {
        '1': {
            title: 'Financial Transaction Engine',
            category: 'backend',
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
            links: '<a href="https://github.com/manziemmy268-hash" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> View on GitHub</a> <a href="#" class="modal-link" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Case Study</a>'
        }
    };

    /* ==========================================
       PROJECT FILTERING & SEARCH LOGIC
    ========================================== */
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    let activeFilter = 'all';
    let activeSearch = '';

    function updateProjectVisibility() {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            // Combine category filter and search match
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            
            const searchTargets = [
                data.title,
                data.stack.replace(/<[^>]*>/g, ''), // Strip span tags for searching
            ].join(' ').toLowerCase();
            
            const matchesSearch = searchTargets.includes(activeSearch.toLowerCase());

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Filter Button Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update Logic
            activeFilter = btn.getAttribute('data-filter');
            updateProjectVisibility();
        });
    });

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            activeSearch = e.target.value;
            updateProjectVisibility();
        });
    }

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalStack = document.getElementById('modal-stack');
    const modalDesc = document.getElementById('modal-desc');
    const modalLinks = document.getElementById('modal-links');

    /* ==========================================
       CONTACT LINKS (Direct — no obfuscation)
    ========================================== */
    // Email and phone are now direct <a> links in the HTML.

    /* ==========================================
       WHATSAPP GREETING LOGIC
    ========================================== */
    const waGreeting = document.getElementById('whatsapp-greeting');
    const closeGreeting = document.getElementById('close-greeting');

    if (waGreeting) {
        // Show greeting after 3 seconds
        setTimeout(() => {
            waGreeting.classList.add('show');
            
            // Auto-hide after 5 seconds of being shown
            setTimeout(() => {
                waGreeting.classList.remove('show');
            }, 5000);
        }, 3000);

        // Close functionality
        closeGreeting.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering any underlying clicks
            waGreeting.classList.remove('show');
        });
    }

    if (modal) {
        // Open Modal
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const data = projectData[projectId];

                if (data) {
                    modalImg.src = data.img;
                    modalImg.alt = data.title; // Performance & A11y
                    modalTitle.textContent = data.title; // Safer than innerHTML
                    modalStack.innerHTML = data.stack; // Local trusted data
                    modalDesc.innerHTML = data.desc; // Local trusted data
                    modalLinks.innerHTML = data.links || ''; // GitHub & demo links

                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.classList.add('modal-open');

                    // Focus trap: focus the close button
                    modalClose.focus();
                }
            });
        });

        // Close Modal via Button
        modalClose.addEventListener('click', closeModal);

        // Close Modal via clicking outside content overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close Modal via ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            modal.querySelector('.modal-content').scrollTop = 0;
        }
    }

});