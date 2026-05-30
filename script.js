// Project Data
const projectData = {
    medical: {
        title: 'Medical Management System',
        description: 'A comprehensive healthcare platform designed to manage patient records, medical histories, appointments, and prescriptions with secure data handling and HIPAA compliance.',
        fullDescription: 'This system provides healthcare professionals with tools to efficiently manage patient information, schedule appointments, track medical history, and manage prescriptions. Features include patient registration, appointment scheduling, medical record storage, and reporting.',
        status: 'Completed',
        year: '2024',
        team: '1 Person',
        category: 'Healthcare',
        technologies: ['Java', 'Database', 'Healthcare IT'],
        features: ['Patient Management', 'Appointment Scheduling', 'Medical Records', 'Prescription Management']
    },
    profile: {
        title: 'Profile Management System',
        description: 'User profile management system with secure authentication, profile customization, account settings, and role-based access control for seamless user experience.',
        fullDescription: 'A robust user management system that handles authentication, profile creation and editing, account settings, and permission management. Users can customize their profiles, manage security settings, and control privacy preferences.',
        status: 'Completed',
        year: '2024',
        team: '1 Person',
        category: 'User Management',
        technologies: ['Java', 'Authentication', 'Database'],
        features: ['User Authentication', 'Profile Management', 'Account Settings', 'Role-Based Access']
    },
    weather: {
        title: 'Weather Application',
        description: 'Real-time weather tracking application with location-based forecasts, interactive maps, detailed weather analytics, and multi-day forecasting capabilities.',
        fullDescription: 'A feature-rich weather application that provides real-time weather data, forecasts, and analytics. Users can search for locations, view detailed weather information, access historical data, and receive weather alerts.',
        status: 'Completed',
        year: '2024',
        team: '1 Person',
        category: 'Weather Tracking',
        technologies: ['Python', 'Weather API', 'Data Analysis'],
        features: ['Real-time Data', 'Location Search', 'Multi-day Forecast', 'Weather Analytics']
    },
    minesweeper: {
        title: 'Minesweeper Game',
        description: 'Classic minesweeper game with modern UI, multiple difficulty levels, engaging gameplay mechanics, and comprehensive scoring system.',
        fullDescription: 'A modernized version of the classic Minesweeper game with multiple difficulty levels (Easy, Medium, Hard), leaderboards, achievements, and smooth animations. Perfect for casual gaming and brain training.',
        status: 'Completed',
        year: '2024',
        team: '1 Person',
        category: 'Game',
        technologies: ['Python', 'Game Development', 'UI/UX'],
        features: ['Multiple Difficulty Levels', 'Score Tracking', 'Timer', 'Statistics']
    }
};

let currentProject = null;

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '🌞';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLightMode ? '🌞' : '🌙';
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
}

// Scroll Animation
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animation').forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        console.log('Form submitted:', { name, email, subject, message });
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll effect to navbar
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// Animate progress bars on scroll
function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.progress-fill');
                fills.forEach(fill => {
                    fill.style.animation = 'none';
                    setTimeout(() => {
                        fill.style.animation = '';
                    }, 10);
                });
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => skillObserver.observe(item));
}

// Counter Animation for numbers
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when info boxes come into view
function initCounterAnimation() {
    const infoBoxes = document.querySelectorAll('.info-box-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent.includes('+')) {
                const target = parseInt(entry.target.textContent);
                if (!entry.target.dataset.animated) {
                    animateCounter(entry.target, target);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.5 });

    infoBoxes.forEach(box => counterObserver.observe(box));
}

// Project Modal Functions
function openProjectModal(projectKey) {
    currentProject = projectKey;
    const project = projectData[projectKey];
    
    if (!project) return;

    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.fullDescription;
    document.getElementById('modalStatus').textContent = project.status;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalTeam').textContent = project.team;
    document.getElementById('modalCategory').textContent = project.category;

    // Update tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'modal-tag';
        tag.textContent = tech;
        tagsContainer.appendChild(tag);
    });

    // Show modal
    const modal = document.getElementById('projectModal');
    modal.classList.add('show');

    // Update demo button text based on project type
    const demoBtn = document.getElementById('modalDemoBtn');
    if (projectKey === 'minesweeper') {
        demoBtn.textContent = 'Play Game';
    } else {
        demoBtn.textContent = 'View Demo';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    currentProject = null;
}

function openProjectDemo(projectKey) {
    const demoFiles = {
        medical: 'm/medical-demo.html',
        profile: 'p/profile-demo.html',
        weather: 'w/weather-demo.html',
        minesweeper: 's/minesweeper-demo.html'
    };

    if (demoFiles[projectKey]) {
        window.open(demoFiles[projectKey], '_blank', 'width=1200,height=800');
    }
}

// Initialize Modal Event Listeners
function initModalEvents() {
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollAnimation();
    initSmoothScroll();
    initContactForm();
    initNavbarScroll();
    initSkillAnimation();
    initCounterAnimation();
    initModalEvents();
});
