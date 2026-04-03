const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
    });
});