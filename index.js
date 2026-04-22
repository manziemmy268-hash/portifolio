document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       HAMBURGER MENU TOGGLE
    ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    /* ==========================================
       SMOOTH SCROLLING & ACTIVE LINK HIGHLIGHT
    ========================================== */
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu after clicking
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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
                
                // If it's the skills section, animate the bars
                if (entry.target.id === 'skills') {
                    const progressBars = document.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Optional: Unobserve after revealing to animate only once
                // scrollObserver.unobserve(entry.target);
            } else {
                // Optional: Remove class when scrolling away to animate repeatedly
                entry.target.classList.remove('appear');
                
                if (entry.target.id === 'skills') {
                    const progressBars = document.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        bar.style.width = '0';
                    });
                }
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* ==========================================
       NAVBAR BACKGROUND ON SCROLL
    ========================================== */
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
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
       DYNAMIC GLITCH TEXT EFFECT ON HERO
    ========================================== */
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const glitchText = document.querySelector(".glitch-text");
    
    if (glitchText) {
        glitchText.addEventListener("mouseover", event => {  
            let iterations = 0;
            const originalText = event.target.dataset.text;
            
            const interval = setInterval(() => {
                event.target.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iterations >= originalText.length){ 
                    clearInterval(interval);
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    }

    /* ==========================================
       AJAX FORM SUBMISSION WITH VALIDATION
    ========================================== */
    const form = document.querySelector('.contact-form');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
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
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

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
            title: 'Student Management System',
            category: 'backend',
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
            stack: '<span>Java</span><span>MySQL</span><span>JDBC</span><span>JavaFX</span>',
            desc: '<p>A comprehensive, robust desktop application developed to manage academic records securely. Features include student enrollment, grade tracking, automated report generation, and secure role-based access control.</p><br><p><strong>Key Achievements:</strong></p><ul><li>Designed normalized MySQL database schema handling 10k+ records.</li><li>Implemented secure authentication using bcrypt.</li><li>Optimized SQL queries, reducing load times by 30%.</li></ul>'
        },
        '2': {
            title: 'Banking System',
            category: 'backend',
            img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
            stack: '<span>Java Spring Boot</span><span>JUnit</span><span>OOP</span>',
            desc: '<p>An enterprise-grade banking API simulation featuring secure transactions, distributed account management, and extensive automated test coverage.</p><br><p><strong>Key Achievements:</strong></p><ul><li>Built robust RESTful APIs following microservice architecture principles.</li><li>Achieved 95% test coverage using JUnit and Mockito.</li><li>Implemented transaction rolling-back features for data integrity.</li></ul>'
        },
        '3': {
            title: 'V3 Portfolio',
            category: 'frontend',
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            stack: '<span>HTML5</span><span>CSS Glassmorphism</span><span>Vanilla JS</span>',
            desc: '<p>A highly performant, custom-built portfolio designed to showcase front-end capabilities without relying on heavy frameworks. Features deep theming, CSS variables, and native Intersection Observers.</p><br><p><strong>Key Achievements:</strong></p><ul><li>Achieved a 100/100 Lighthouse performance score.</li><li>Implemented complex state management and animations using pure Vanilla JS.</li><li>Designed a scalable, premium "dark mode" aesthetic.</li></ul>'
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

    /* ==========================================
       CONTACT OBFUSCATION & REVEAL (Bot protection)
    ========================================== */
    const emailDisplay = document.getElementById('email-display');
    const phoneDisplay = document.getElementById('phone-display');

    if (emailDisplay) {
        emailDisplay.addEventListener('click', () => {
            const u = "nkiemmanuel";
            const d = "gmail.com";
            emailDisplay.textContent = `${u}@${d}`;
            emailDisplay.classList.add('revealed');
        }, { once: true });
    }

    if (phoneDisplay) {
        phoneDisplay.addEventListener('click', () => {
            const p = "+250 793 511 982";
            phoneDisplay.textContent = p;
            phoneDisplay.classList.add('revealed');
        }, { once: true });
    }

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

                    modal.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });

        // Close Modal via Button
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            // reset scroll position for modal
            modal.querySelector('.modal-content').scrollTop = 0;
        });

        // Close Modal via clicking outside content overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                modal.querySelector('.modal-content').scrollTop = 0;
            }
        });
    }

    /* ==========================================
       ACTIVE SECTION NAVIGATION HIGHLIGHT
    ========================================== */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    
});