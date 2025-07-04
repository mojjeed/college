// Page transition fade in/out
function fadeIn() {
    document.body.classList.add('fade-in');
    document.body.classList.remove('fade-out');
}
function fadeOutAndRedirect(url) {
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = url; }, 350);
}
window.addEventListener('DOMContentLoaded', () => {
    fadeIn();
    document.querySelectorAll('a.page-link, a.cta-btn').forEach(link => {
        // Only apply to local links
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !link.hasAttribute('target')) {
                e.preventDefault();
                fadeOutAndRedirect(href);
            }
        });
    });
});

// On-scroll animation for fade-in and sections
function revealOnScroll() {
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .hero-section, .features-section, .how-section').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', revealOnScroll); 