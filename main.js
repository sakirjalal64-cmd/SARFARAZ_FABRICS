// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU (Fixed Drawer) ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Create overlay once
let overlay = document.getElementById('navOverlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.id = 'navOverlay';
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
}

function openMenu() {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
}

// Close on overlay click
overlay.addEventListener('click', closeMenu);

// Close on nav link click (mobile)
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── HERO REVEAL ON LOAD ──
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 220 + 150);
  });
});

// ── FILTER TABS (clothing / fabrics page) ──
document.querySelectorAll('.filter-tab[data-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab[data-filter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// ── CONTACT FORM → WHATSAPP ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name     = (document.getElementById('fname')?.value     || '').trim();
    const phone    = (document.getElementById('fphone')?.value    || '').trim();
    const email    = (document.getElementById('femail')?.value    || '').trim();
    const category = (document.getElementById('fcategory')?.value || '').trim();
    const message  = (document.getElementById('fmessage')?.value  || '').trim();

    let waMsg = `🛍️ *New Enquiry – Sarfaraz Fabrics*\n\n`;
    waMsg += `👤 *Naam:* ${name}\n`;
    waMsg += `📞 *Phone:* ${phone}\n`;
    if (email)    waMsg += `✉️ *Email:* ${email}\n`;
    if (category) waMsg += `🏷️ *Category:* ${category}\n`;
    if (message)  waMsg += `💬 *Message:* ${message}\n`;
    waMsg += `\n_Website se bheja gaya – sarfarazfabrics.com_`;

    window.open(`https://wa.me/917367018157?text=${encodeURIComponent(waMsg)}`, '_blank');

    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ WhatsApp Khul Raha Hai...';
    btn.style.background = '#25D366';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; this.reset(); }, 3000);
  });
}

// ── COUNTER ANIMATION ──
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const h3 = entry.target.querySelector('h3');
      if (h3 && !h3.dataset.animated) {
        h3.dataset.animated = 'true';
        const raw    = h3.textContent;
        const num    = parseInt(raw.replace(/\D/g, ''));
        const suffix = raw.replace(/[\d,]/g, '');
        let count = 0;
        const step = num / 70;
        const timer = setInterval(() => {
          count = Math.min(count + step, num);
          h3.textContent = (num > 999 ? Math.floor(count).toLocaleString() : Math.floor(count)) + suffix;
          if (count >= num) clearInterval(timer);
        }, 20);
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));

// ── FAQ TOGGLE ──
window.toggleFaq = function(el) {
  const item = el.parentElement;
  document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
};

// ── GALLERY FILTER ──
document.querySelectorAll('[data-gfilter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-gfilter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.gfilter;
    document.querySelectorAll('.gal-item').forEach(item => {
      item.style.display = (f === 'all' || item.dataset.gcat === f) ? 'block' : 'none';
    });
  });
});
