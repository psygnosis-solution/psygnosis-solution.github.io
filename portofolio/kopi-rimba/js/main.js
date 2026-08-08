const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const mobileLinks = document.querySelectorAll('.mobile-link');
const demoBanner = document.querySelector('.demo-banner');

function setBannerHeight() {
    if (!demoBanner) return;
    document.documentElement.style.setProperty('--banner-h', demoBanner.offsetHeight + 'px');
}

setBannerHeight();
window.addEventListener('resize', setBannerHeight);

window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function openMobileMenu() {
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileMenu.querySelector('.mobile-link');
    if (firstLink) firstLink.focus();
}

function closeMobileMenu(returnFocus) {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (returnFocus) navToggle.focus();
}

navToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu(false);
    } else {
        openMobileMenu();
    }
});

mobileMenuBackdrop.addEventListener('click', function() {
    closeMobileMenu(false);
});

mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        closeMobileMenu(false);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu(true);
    }
});

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el) { revealObserver.observe(el); });
} else {
    revealEls.forEach(function(el) { el.classList.add('in-view'); });
}

const statNums = document.querySelectorAll('.stat-num');
function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimal = parseInt(el.getAttribute('data-decimal') || '0', 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = current.toFixed(decimal) + suffix;
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target.toFixed(decimal) + suffix;
        }
    }
    requestAnimationFrame(tick);
}

if (statNums.length) {
    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        statNums.forEach(function(el) { statObserver.observe(el); });
    } else {
        statNums.forEach(function(el) { animateCount(el); });
    }
}

const menuFilters = document.querySelectorAll('.menu-filter');
const menuCards = document.querySelectorAll('.menu-card');
const menuEmpty = document.querySelector('.menu-empty');

menuFilters.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const filter = btn.getAttribute('data-filter');
        menuFilters.forEach(function(b) {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        let visibleCount = 0;
        menuCards.forEach(function(card) {
            const matches = filter === 'semua' || card.getAttribute('data-category') === filter;
            card.classList.toggle('hidden-by-filter', !matches);
            if (matches) visibleCount++;
        });
        if (menuEmpty) menuEmpty.hidden = visibleCount !== 0;
    });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('[data-lightbox]');
let lastGalleryTrigger = null;

function openLightbox(src, alt, trigger) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastGalleryTrigger = trigger || null;
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastGalleryTrigger) lastGalleryTrigger.focus();
}

galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
        const src = item.getAttribute('data-lightbox');
        const alt = item.querySelector('img') ? item.querySelector('img').alt : '';
        openLightbox(src, alt, item);
    });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
    }
});
