const NAV = (() => {
  const LINKS = [
    { href: 'index.html',    icon: 'fa-home',          label: 'Accueil',           i18n: 'nav_accueil' },
    { href: 'Apropos.html',  icon: 'fa-church',         label: 'À propos',          i18n: 'nav_apropos', dropdown: [
        { href: 'Horaires.html',    icon: 'fa-clock',     label: 'Horaires des cultes', i18n: 'nav_horaires' },
        { href: 'Galerie.html',     icon: 'fa-images',    label: 'Galerie & Vidéos',    i18n: 'nav_galerie' },
        { href: 'Actualites.html',  icon: 'fa-newspaper', label: 'Actualités',          i18n: 'nav_actualites' },
        { href: 'Temoigner.html',   icon: 'fa-star',      label: 'Témoignages',         i18n: 'nav_temoignages' },
      ]
    },
    { href: 'Contact.html',  icon: 'fa-envelope',       label: 'Contact',           i18n: 'nav_contact' },
    { href: 'priere.html',   icon: 'fa-hands-praying',  label: 'Demande de prière', i18n: 'nav_priere' },
    { href: 'don.html',      icon: 'fa-heart',          label: 'Faire un don',      i18n: 'nav_don', cls: 'nav-don' },
    { href: 'Live.html',     icon: 'fa-circle-dot',     label: 'Live',          i18n: 'nav_live',  cls: 'nav-live' },
    { href: 'admin.html',    icon: 'fa-lock',           label: 'Admin',     i18n: 'nav_admin', cls: 'nav-admin' },
  ];

  function buildNav(activePage) {
    const items = LINKS.map(link => {
      const isActive = link.href === activePage || (link.dropdown && link.dropdown.some(d => d.href === activePage));
      if (link.dropdown) {
        const sub = link.dropdown.map(d =>
          `<li><a href="${d.href}"${d.href===activePage?' class="active"':''}><i class="fas ${d.icon}"></i> <span data-i18n="${d.i18n}">${d.label}</span></a></li>`
        ).join('');
        return `<li class="dropdown">
          <a href="${link.href}" class="dropdown-toggle${isActive?' active':''}">
            <i class="fas ${link.icon}"></i> <span data-i18n="${link.i18n}">${link.label}</span> <i class="fas fa-chevron-down dropdown-arrow"></i>
          </a>
          <ul class="submenu">${sub}</ul>
        </li>`;
      }
      return `<li><a href="${link.href}" class="${(link.cls||'')}${isActive?' active':''}"><i class="fas ${link.icon}"></i> <span data-i18n="${link.i18n}">${link.label}</span></a></li>`;
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

        <!-- Bouton Notifikasyon -->
        <button class="notif-bell" id="notifBell" onclick="toggleNotifSubscription()" title="Notifications">
          <i class="fas fa-bell" id="bellIcon"></i>
          <span class="notif-dot" id="notifDot" style="display:none"></span>
        </button>

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
          <p class="footer-tagline" style="color:rgba(255,255,255,0.5);font-size:0.82rem;font-style:italic;margin-top:6px;"><span data-i18n="header_verse">"Je puis tout par celui qui me fortifie" — Phil. 4:13</span></p>
        </div>
        <div class="footer-links">
          <h4 data-i18n="footer_nav_title">Navigation</h4>
          <ul>
            <li><a href="index.html" data-i18n="nav_accueil">Accueil</a></li>
            <li><a href="Apropos.html" data-i18n="nav_apropos">À propos</a></li>
            <li><a href="Horaires.html" data-i18n="nav_horaires">Horaires</a></li>
            <li><a href="Contact.html" data-i18n="nav_contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4 data-i18n="footer_community_title">Communauté</h4>
          <ul>
            <li><a href="priere.html" data-i18n="footer_priere">Demande de prière</a></li>
            <li><a href="Temoigner.html" data-i18n="footer_temo">Témoignages</a></li>
            <li><a href="Galerie.html" data-i18n="footer_galerie">Galerie</a></li>
            <li><a href="don.html" data-i18n="footer_don">Faire un don</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4 data-i18n="footer_find_title">Nous trouver</h4>
          <p><i class="fas fa-map-marker-alt"></i> Carrefour, Haïti</p>
          <p><i class="fas fa-phone"></i> +509 3157-3591</p>
          <p><i class="fas fa-envelope"></i> anouisjean@yahoo.fr</p>
          <div class="social-icons">
            <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p data-i18n="footer_rights">© 2025 Église de Dieu de la Prophétie de Carrefour waney 93 — Tous droits réservés</p>
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

  // CSS pou klòch notifikasyon
  const bellCSS = document.createElement('style');
  bellCSS.textContent = `
    .notif-bell {
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.2rem;
      padding: 6px 8px;
      margin-left: 4px;
      transition: transform 0.2s;
    }
    .notif-bell:hover { transform: scale(1.2); }
    .notif-bell.subscribed { color: #f0c040; }
    .notif-dot {
      position: absolute;
      top: 4px; right: 4px;
      width: 8px; height: 8px;
      background: #e74c3c;
      border-radius: 50%;
      animation: pulse-dot 1.5s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
  `;
  document.head.appendChild(bellCSS);

  // Fonksyon pou jere abònman notifikasyon
  window.toggleNotifSubscription = async function() {
    if (!window.OneSignal) { alert('Notifikasyon pa disponib sou navigatè sa a.'); return; }
    try {
      const permission = await OneSignal.Notifications.permission;
      if (!permission) {
        await OneSignal.Notifications.requestPermission();
        updateBellState();
      } else {
        const isSubscribed = await OneSignal.User.PushSubscription.optedIn;
        if (isSubscribed) {
          await OneSignal.User.PushSubscription.optOut();
          showBellToast('🔕 Ou dezabòne notifikasyon yo');
        } else {
          await OneSignal.User.PushSubscription.optIn();
          showBellToast('🔔 Ou abòne notifikasyon yo!');
        }
        updateBellState();
      }
    } catch(e) { console.log('Notif error:', e); }
  };

  window.updateBellState = async function() {
    const bell = document.getElementById('notifBell');
    const dot = document.getElementById('notifDot');
    if (!bell || !window.OneSignal) return;
    try {
      const isSubscribed = await OneSignal.User.PushSubscription.optedIn;
      bell.classList.toggle('subscribed', !!isSubscribed);
      if (dot) dot.style.display = isSubscribed ? 'none' : 'block';
    } catch(e) {}
  };

  function showBellToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1c1c3c;color:white;padding:10px 20px;border-radius:20px;z-index:9999;font-size:0.9rem;box-shadow:0 4px 15px rgba(0,0,0,0.3);';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  return {
    init(activePage) {
      document.getElementById('nav-placeholder').innerHTML  = buildNav(activePage);
      document.getElementById('foot-placeholder').innerHTML = buildFooter();
      initInteractions();
      // Aplike lang sove a (tout lang)
      const lang = localStorage.getItem('site_lang') || 'fr';
      if (window.applyLang) window.applyLang(lang);
      // Mete a jou eta klòch la
      setTimeout(updateBellState, 2000);
    }
  };
})();
