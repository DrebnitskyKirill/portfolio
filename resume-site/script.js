(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    });
  });

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const ioReveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => ioReveal.observe(el));

  // Active nav link highlighting
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sectionIds = navLinks
    .map((a) => a.getAttribute('href'))
    .filter((href) => href && href.startsWith('#'))
    .map((href) => href);
  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  const ioActive = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = '#' + entry.target.id;
        const link = navLinks.find((a) => a.getAttribute('href') === id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => ioActive.observe(s));

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();

