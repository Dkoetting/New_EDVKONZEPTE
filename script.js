(function () {
  const body = document.body;
  const page = body?.dataset.page || '';
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');

  document.querySelectorAll('[data-link]').forEach((link) => {
    if (link.getAttribute('data-link') === page) {
      link.classList.add('is-active');
    }
  });

  if (menuBtn && header) {
    menuBtn.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });

    document.querySelectorAll('[data-menu] a').forEach((item) => {
      item.addEventListener('click', () => {
        header.classList.remove('menu-open');
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        header.classList.remove('menu-open');
      }
    });
  }

  const langButtons = document.querySelectorAll('[data-lang]');
  if (langButtons.length > 0) {
    const langStorageKey = 'edv_lang';
    let activeLang = 'de';

    try {
      const savedLang = window.localStorage.getItem(langStorageKey);
      if (savedLang === 'de' || savedLang === 'en') {
        activeLang = savedLang;
      }
    } catch (error) {}

    const applyLang = (lang) => {
      document.documentElement.setAttribute('lang', lang);
      langButtons.forEach((btn) => {
        btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
      });
    };

    applyLang(activeLang);

    langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang') || 'de';
        applyLang(selectedLang);
        try {
          window.localStorage.setItem(langStorageKey, selectedLang);
        } catch (error) {}
      });
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
