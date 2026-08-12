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
            need: (value) => {
                if (!value) return 'Please select what you need help with';
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
            const validator = validators[fieldName];
            if (!validator || !input) return true;
            const error = validator(input.value);

            if (error) {
                input.classList.add('error');
                input.classList.remove('success');
                input.setAttribute('aria-invalid', 'true');
                if (errorElement) {
                    errorElement.textContent = error;
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('error');
                input.classList.add('success');
                input.removeAttribute('aria-invalid');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }

        // Real-time validation on blur
        ['name', 'email', 'phone', 'need', 'current-process', 'message'].forEach(fieldName => {
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
            const isNeedValid = validateField('need');
            const isMessageValid = validateField('message');

            if (!isNameValid || !isEmailValid || !isPhoneValid || !isNeedValid || !isMessageValid) {
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
                        input.removeAttribute('aria-invalid');
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
       PROJECT FILTERING & SEARCH LOGIC
       (projectData is defined in projects-data.js)
    ========================================== */
    const searchInput = document.getElementById('project-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    let activeFilter = 'all';
    let activeSearch = '';

    function updateProjectVisibility() {
        let visibleCount = 0;

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
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show empty-state message when nothing matches
        const emptyState = document.getElementById('projects-empty');
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
        }
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

    if (modal) {
        let lastFocusedElement = null;

        function getFocusable() {
            return Array.from(modal.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
        }

        // Keep focus inside the modal while it's open
        function trapFocus(e) {
            if (e.key !== 'Tab' || !modal.classList.contains('active')) return;

            const focusables = getFocusable();
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first || document.activeElement === modal) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last || document.activeElement === modal) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        // Open Modal (grid cards + flagship case study)
        const modalTriggers = document.querySelectorAll('.project-card, .case-study-card');
        modalTriggers.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open the modal when clicking project links (GitHub / demo)
                if (e.target.closest('a')) return;

                const projectId = card.getAttribute('data-project');
                const data = projectData[projectId];

                if (data) {
                    modalImg.src = data.img;
                    modalImg.alt = data.title; // Performance & A11y
                    modalTitle.textContent = data.title; // Safer than innerHTML
                    modalStack.innerHTML = data.stack; // Local trusted data
                    modalDesc.innerHTML = data.desc; // Local trusted data
                    modalLinks.innerHTML = data.links || ''; // GitHub & demo links

                    lastFocusedElement = document.activeElement;

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

        // Trap Tab focus inside the open modal
        document.addEventListener('keydown', trapFocus);

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            modal.querySelector('.modal-content').scrollTop = 0;

            // Return focus to the element that opened the modal
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
            lastFocusedElement = null;
        }
    }

    /* ==========================================
       WHATSAPP LINKS — open via JS so the phone
       number is not exposed in the hover URL
    ========================================== */
    document.querySelectorAll('.js-wa').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://wa.me/250793511982', '_blank', 'noopener,noreferrer');
        });
    });

});