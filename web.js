console.log('Welcome to Tina\'s portfolio!');

// ==================== DARK MODE TOGGLE ====================
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const label = toggle.querySelector('.toggle-label');

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
label.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

toggle.addEventListener('click', function () {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    label.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    
    // Small bounce animation on toggle
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => toggle.style.transform = '', 150);
});

// ==================== NAVBAR SCROLL ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ==================== YEAR ====================
document.getElementById('year').textContent = new Date().getFullYear();

// ==================== SMOOTH SCROLL (extra safety) ====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== SCROLL REVEAL ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .edu-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== CONTACT FORM ====================
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const message = document.getElementById('message').value;

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.querySelector('.btn-arrow').textContent = '⏳';
    submitBtn.disabled = true;

    emailjs.init('_HqVaoZ5LqT3ss9fS');

    emailjs.send('service_6qml745', 'template_34gg3co', {
        from_name: name,
        from_email: email,
        contact: contact,
        message: message,
        to_email: 'bdernestina5@gmail.com'
    }).then(() => {
        const success = document.getElementById('form-success');
        success.style.display = 'flex';
        this.reset();
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.querySelector('.btn-arrow').textContent = '→';
        submitBtn.disabled = false;
        setTimeout(() => { success.style.display = 'none'; }, 5000);
    }, (err) => {
        console.error('EmailJS error:', err);
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.querySelector('.btn-arrow').textContent = '→';
        submitBtn.disabled = false;
        alert('Failed to send. Please try again.');
    });
});
