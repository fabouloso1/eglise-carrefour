const NAV = (() => {
  const LINKS = [
    { href: 'index.html',    icon: 'fa-home',          label: 'Accueil',           i18n: 'nav_accueil' },
    { href: 'Apropos.html',  icon: 'fa-church',         label: 'À propos',          i18n: 'nav_apropos', dropdown: [
        { href: 'Horaires.html',   icon: 'fa-clock',     label: 'Horaires des cultes', i18n: 'nav_horaires' },
        { href: 'Galerie.html',    icon: 'fa-images',    label: 'Galerie & Vidéos',    i18n: 'nav_galerie' },
        { href: 'Etude.html',      icon: 'fa-book-open', label: 'Étude Biblique',      i18n: 'nav_etude' },
        { href: 'Guide.html',      icon: 'fa-bible',     label: 'Guide de Lecture',    i18n: 'nav_guide' },
        { href: 'Temoigner.html',  icon: 'fa-star',      label: 'Témoignages',         i18n: 'nav_temoignages' },
      ]
    },
    { href: 'Contact.html',  icon: 'fa-envelope',       label: 'Contact',           i18n: 'nav_contact' },
    { href: 'priere.html',   icon: 'fa-hands-praying',  label: 'Demande de prière', i18n: 'nav_priere' },
    { href: 'don.html',      icon: 'fa-heart',          label: 'Faire un don',      i18n: 'nav_don',   cls: 'nav-don' },
    { href: 'Live.html',     icon: 'fa-circle-dot',     label: 'Live',              i18n: 'nav_live',  cls: 'nav-live' },
    { href: 'admin.html',    icon: 'fa-lock',           label: 'Admin',             i18n: 'nav_admin', cls: 'nav-admin' },
  ];

  function getLabel(link) {
    const lang = localStorage.getItem('site_lang') || 'fr';
    if (window.TRANSLATIONS && window.TRANSLATIONS[lang] && link.i18n && window.TRANSLATIONS[lang][link.i18n]) {
      return window.TRANSLATIONS[lang][link.i18n];
    }
    return link.label;
  }

  function buildNav(activePage) {
    const items = LINKS.map(link => {
      const isActive = link.href === activePage || (link.dropdown && link.dropdown.some(d => d.href === activePage));
      const label    = link.label;
      const cls      = link.cls || '';

      if (link.dropdown) {
        const sub = link.dropdown.map(d =>
          `<li><a href="${d.href}"${d.href===activePage?' class="active"':''}><i class="fas ${d.icon}"></i> <span data-i18n="${d.i18n}">${d.label}</span></a></li>`
        ).join('');
        return `<li class="dropdown">
          <a href="${link.href}" class="dropdown-toggle${isActive?' active':''}">
            <i class="fas ${link.icon}"></i> <span data-i18n="${link.i18n}">${label}</span> <i class="fas fa-chevron-down dropdown-arrow"></i>
          </a>
          <ul class="submenu">${sub}</ul>
        </li>`;
      }
      return `<li><a href="${link.href}" class="${cls}${isActive?' active':''}"><i class="fas ${link.icon}"></i> <span data-i18n="${link.i18n}">${label}</span></a></li>`;
    }).join('');

    return `
    <nav class="menu" id="mainNav">
      <div class="nav-inner">
        <a href="index.html" class="nav-brand"><img src="logo.png" alt="Logo" class="nav-logo"></a>
        <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
          <div class="lang-switcher" id="langSwitcher">
            <button class="lang-btn" onclick="toggleLangMenu()" aria-label="Langue">
              <span id="langFlag">🇫🇷</span>
              <i class="fas fa-chevron-down" style="font-size:0.6rem;opacity:0.7;"></i>
            </button>
            <div class="lang-menu" id="langMenu">
              <button class="lang-option" data-lang="fr" onclick="changeLang('fr')">🇫🇷 Français</button>
              <button class="lang-option" data-lang="en" onclick="changeLang('en')">🇺🇸 English</button>
              <button class="lang-option" data-lang="es" onclick="changeLang('es')">🇪🇸 Español</button>
              <button class="lang-option" data-lang="ht" onclick="changeLang('ht')">🇭🇹 Kreyòl</button>
            </div>
          </div>
          <button id="darkModeBtn" onclick="toggleDarkMode()" aria-label="Mode sombre" title="Mode sombre">
            <i class="fas fa-moon" id="darkModeIcon"></i>
          </button>
          <button class="hamburger" id="hamburgerBtn" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
        <ul class="nav-links" id="navLinks">${items}</ul>
      </div>
    </nav>
    <div class="nav-overlay" id="navOverlay"></div>`;
  }

  function buildFooter() {
    return `
    <footer>
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="logo.png" alt="Logo" class="footer-logo">
          <p class="footer-name">Église de Dieu de la Prophétie<br><span>de Carrefour</span></p>
          <p class="footer-tagline" style="color:rgba(255,255,255,0.5);font-size:0.82rem;font-style:italic;margin-top:6px;">📞 31 57 3591 &nbsp;·&nbsp; 37 31 9017 &nbsp;·&nbsp; 40 73 9184</p>
          <p class="footer-tagline" style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin-top:4px;">✉️ prophetiewaney93@gmail.com</p>
        </div>
        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="Apropos.html">À propos</a></li>
            <li><a href="Horaires.html">Horaires</a></li>
            <li><a href="Contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Communauté</h4>
          <ul>
            <li><a href="priere.html">Demande de prière</a></li>
            <li><a href="Temoigner.html">Témoignages</a></li>
            <li><a href="Galerie.html">Galerie</a></li>
            <li><a href="don.html">Faire un don</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Nous trouver</h4>
          <p><i class="fas fa-map-marker-alt"></i> Carrefour, Haïti</p>
          <p><i class="fas fa-phone"></i> +509 1234 5678</p>
          <p><i class="fas fa-envelope"></i> eglise@carrefour.ht</p>
          <div class="social-icons">
            <a href="https://www.facebook.com/share/17GzWqGZpx/?mibextid=wwXIfr" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="https://youtube.com/@laprophetiewaney93?si=ZwV75dVFLHlHh0J6" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://wa.me/50931573591" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Église de Dieu de la Prophétie de Carrefour — Tous droits réservés</p>
      </div>
    </footer>`;
  }

  function initInteractions() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks     = document.getElementById('navLinks');
    const navOverlay   = document.getElementById('navOverlay');

    let scrollY = 0;

    const openMenu = () => {
      scrollY = window.scrollY;
      document.body.style.position   = 'fixed';
      document.body.style.top        = `-${scrollY}px`;
      document.body.style.left       = '0';
      document.body.style.right      = '0';
      document.body.style.overflow   = 'hidden';
      hamburgerBtn.classList.add('open');
      navLinks.classList.add('open');
      navOverlay.classList.add('show');
    };

    const closeMenu = () => {
      document.body.style.position   = '';
      document.body.style.top        = '';
      document.body.style.left       = '';
      document.body.style.right      = '';
      document.body.style.overflow   = '';
      window.scrollTo(0, scrollY);
      hamburgerBtn.classList.remove('open');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('show');
    };

    hamburgerBtn.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
    navOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(l => l.addEventListener('click', closeMenu));

    document.querySelectorAll('.dropdown').forEach(dd => {
      const toggle = dd.querySelector('.dropdown-toggle');
      dd.addEventListener('mouseenter', () => { if (window.innerWidth > 768) dd.classList.add('active'); });
      dd.addEventListener('mouseleave', () => { if (window.innerWidth > 768) dd.classList.remove('active'); });
      toggle.addEventListener('click', e => {
        if (window.innerWidth <= 768) { e.preventDefault(); dd.classList.toggle('active'); }
      });
    });
    document.addEventListener('click', e => {
      if (window.innerWidth <= 768 && !e.target.closest('.dropdown'))
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    });

    window.addEventListener('scroll', () => {
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  return {
    init(activePage) {
      document.getElementById('nav-placeholder').innerHTML  = buildNav(activePage);
      document.getElementById('foot-placeholder').innerHTML = buildFooter();
      initInteractions();

      // ===== DARK MODE =====
      window.toggleDarkMode = function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const icon = document.getElementById('darkModeIcon');

        if (currentTheme === 'dark') {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
          if (icon) icon.className = 'fas fa-moon';
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          if (icon) icon.className = 'fas fa-sun';
        }
      };

      // Restore dark mode si te sove
      const savedTheme = localStorage.getItem('theme');
      const darkIcon = document.getElementById('darkModeIcon');
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkIcon) darkIcon.className = 'fas fa-sun';
      }

      // Init lang apre nav chaje
      const flags = { fr:'🇫🇷', en:'🇺🇸', es:'🇪🇸', ht:'🇭🇹' };
      window.changeLang = function(lang) {
        const flagEl = document.getElementById('langFlag');
        if (flagEl) flagEl.textContent = flags[lang] || '🇫🇷';
        // Mete active class
        document.querySelectorAll('.lang-option').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
        // Fèmen menu
        const m = document.getElementById('langMenu');
        if (m) m.classList.remove('open');
        // Aplike tradiksyon si lang.js chaje
        if (window.applyLang) window.applyLang(lang);
      };

      // Restore lang sove
      const saved = localStorage.getItem('site_lang') || 'fr';
      const flagEl = document.getElementById('langFlag');
      if (flagEl) flagEl.textContent = flags[saved] || '🇫🇷';
      document.querySelectorAll('.lang-option').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === saved);
      });

      // Si lang.js deja chaje, aplike imedyatman
      if (window.applyLang) window.applyLang(saved);
      // Sinon, applyLang ap rele li menm nan DOMContentLoaded
    }
  };
})();
