// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️ Light Mode';
}

// Typing Effect for Hero Section
const heroTitle = document.querySelector('.hero-content h2');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .certification-item, .achievement-item, .internship-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.setProperty('--skill-width', width);
                fill.style.animationPlayState = 'running';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For demo purposes, show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        contactForm.reset();

    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Dynamic year in footer
document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Abhishek Chhatbar. All rights reserved.`;

// Form validation for contact (if added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Add particle effect to background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();
