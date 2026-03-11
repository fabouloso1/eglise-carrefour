const NAV = (() => {
  const LINKS = [
    { href: 'index.html',    icon: 'fa-home',          label: 'Accueil' },
    { href: 'Apropos.html',  icon: 'fa-church',         label: 'À propos', dropdown: [
        { href: 'Horaires.html',    icon: 'fa-clock',     label: 'Horaires des cultes' },
        { href: 'Galerie.html',     icon: 'fa-images',    label: 'Galerie & Vidéos' },
        { href: 'Actualites.html',  icon: 'fa-newspaper', label: 'Actualités' },
        { href: 'Temoigner.html',   icon: 'fa-star',      label: 'Témoignages' },
      ]
    },
    { href: 'Contact.html',  icon: 'fa-envelope',       label: 'Contact' },
    { href: 'priere.html',   icon: 'fa-hands-praying',  label: 'Demande de prière' },
    { href: 'don.html',      icon: 'fa-heart',          label: 'Faire un don', cls: 'nav-don' },
  ];

  function buildNav(activePage) {
    const items = LINKS.map(link => {
      const isActive = link.href === activePage || (link.dropdown && link.dropdown.some(d => d.href === activePage));
      if (link.dropdown) {
        const sub = link.dropdown.map(d =>
          `<li><a href="${d.href}"${d.href===activePage?' class="active"':''}><i class="fas ${d.icon}"></i> ${d.label}</a></li>`
        ).join('');
        return `<li class="dropdown">
          <a href="${link.href}" class="dropdown-toggle${isActive?' active':''}">
            <i class="fas ${link.icon}"></i> ${link.label} <i class="fas fa-chevron-down dropdown-arrow"></i>
          </a>
          <ul class="submenu">${sub}</ul>
        </li>`;
      }
      return `<li><a href="${link.href}" class="${(link.cls||'')}${isActive?' active':''}"><i class="fas ${link.icon}"></i> ${link.label}</a></li>`;
    }).join('');

    return `
    <nav class="menu" id="mainNav">
      <div class="nav-inner">
        <a href="index.html" class="nav-brand"><img src="logo.png" alt="Logo" class="nav-logo"></a>
        <button class="hamburger" id="hamburgerBtn" aria-label="Menu"><span></span><span></span><span></span></button>
        <ul class="nav-links" id="navLinks">${items}</ul>
        <!-- Bouton Lang -->
        <div class="lang-switcher" id="langSwitcher">
          <button class="lang-btn" id="langBtn" onclick="toggleLangMenu()" title="Changer la langue">
            🌐
          </button>
          <div class="lang-menu" id="langMenu">
            <button class="lang-option" data-lang="fr" onclick="applyLang('fr');toggleLangMenu()">🇫🇷 Français</button>
            <button class="lang-option" data-lang="en" onclick="applyLang('en');toggleLangMenu()">🇬🇧 English</button>
            <button class="lang-option" data-lang="es" onclick="applyLang('es');toggleLangMenu()">🇪🇸 Español</button>
            <button class="lang-option" data-lang="ht" onclick="applyLang('ht');toggleLangMenu()">🇭🇹 Kreyòl</button>
          </div>
        </div>
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
          <p class="footer-tagline" style="color:rgba(255,255,255,0.5);font-size:0.82rem;font-style:italic;margin-top:6px;">"Je puis tout par celui qui me fortifie" — Phil. 4:13</p>
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
            <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
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

    const openMenu  = () => { hamburgerBtn.classList.add('open'); navLinks.classList.add('open'); navOverlay.classList.add('show'); document.body.style.overflow='hidden'; };
    const closeMenu = () => { hamburgerBtn.classList.remove('open'); navLinks.classList.remove('open'); navOverlay.classList.remove('show'); document.body.style.overflow=''; };

    hamburgerBtn.addEventListener('click', () => navLinks.classList.contains('open') ? closeMenu() : openMenu());
    navOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(l => l.addEventListener('click', closeMenu));

    document.querySelectorAll('.dropdown').forEach(dd => {
      const toggle = dd.querySelector('.dropdown-toggle');
      toggle.addEventListener('click', e => {
        e.preventDefault();
        const isActive = dd.classList.contains('active');
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        if (!isActive) dd.classList.add('active');
      });
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.dropdown'))
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    });

    window.addEventListener('scroll', () => {
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Fèmen lang menu si ou klike deyò
    document.addEventListener('click', e => {
      if (!e.target.closest('.lang-switcher')) {
        var m = document.getElementById('langMenu');
        if (m) m.classList.remove('open');
      }
    });
  }

  window.toggleLangMenu = function() {
    var m = document.getElementById('langMenu');
    if (m) m.classList.toggle('open');
  };

  return {
    init(activePage) {
      document.getElementById('nav-placeholder').innerHTML  = buildNav(activePage);
      document.getElementById('foot-placeholder').innerHTML = buildFooter();
      initInteractions();
    }
  };
})();
