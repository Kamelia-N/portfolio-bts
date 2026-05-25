const menuMobile = () => {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  if (!btn || !header) return;

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
};

const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#' || targetId === '#!') return;

    link.addEventListener('click', event => {
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      document.querySelector('.header')?.classList.remove('show-nav');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

const setupScrollReveal = () => {
const selector = [
  'section',
  '.card',
  '.article__card',
  '.info-card',
  '.skills-pro__card',
  '.veille-pro__card',
  '.bts-card',
  '.hero-card',
  '.hero-card__left',
  '.hero-card__right',
  '.hero-card__footer',
  '.modal__content',
  '.contact-form',
  '.form',
  '.skill-logo',
  '.article__img'
].join(', ');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll(selector).forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
};

const setupTypingEffect = () => {
  const typingElement = document.querySelector('.typing');
  if (!typingElement) return;

  const text = typingElement.dataset.typing || '';
  typingElement.textContent = '';

  let index = 0;

  const write = () => {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index += 1;
      setTimeout(write, 60);
    } else {
      typingElement.classList.add('is-done');
    }
  };

  write();
};

const setupThemeToggle = () => {
  const button = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-toggle .theme-icon');
  const savedTheme = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.textContent = isDark ? '☀️' : '🌙';
    }
    if (button) {
      button.setAttribute('aria-label', isDark ? 'Passer en mode clair' : 'Passer en mode sombre');
    }
  };

  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  if (!button) return;

  button.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
  });
};
const setupPortfolioFilters = () => {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('#projets .card, .portfolio .card');

  if (!tabs.length || !projets.length) return;

  const resetActiveLinks = () => {
    tabs.forEach(elem => elem.classList.remove('active'));
  };

  const showProjets = selected => {
    projets.forEach(projet => {
      const filter = projet.getAttribute('data-category');
      if (selected === 'all') {
        projet.parentNode.classList.remove('hide');
        return;
      }
      filter !== selected ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');
    });
  };

  tabs.forEach(elem => {
    elem.addEventListener('click', event => {
      event.preventDefault();
      const filter = elem.getAttribute('data-filter');
      resetActiveLinks();
      elem.classList.add('active');
      showProjets(filter);
    });
  });
};

const setupProjectDetails = () => {
  const modals = document.querySelectorAll('.modal');

  if (!modals.length) return;

  const closeAllModals = () => {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('show');
    });

    document.body.style.overflow = '';
  };

  document.addEventListener('click', event => {
    const link = event.target.closest('.card__link[data-id]');

    if (!link) return;

    event.preventDefault();

    const modalId = link.getAttribute('data-id');
    const targetModal = document.getElementById(modalId);

    if (!targetModal) {
      console.error('Modale introuvable : ' + modalId);
      return;
    }

    closeAllModals();

    // Très important : on déplace la modale dans le body
    // pour éviter qu'elle soit bloquée dans une carte ou une section animée.
    document.body.appendChild(targetModal);

    targetModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  document.addEventListener('click', event => {
    const closeBtn = event.target.closest('.modal__close');

    if (closeBtn) {
      event.preventDefault();
      closeAllModals();
    }
  });

  document.addEventListener('click', event => {
    const modal = event.target.classList.contains('modal') ? event.target : null;

    if (modal) {
      closeAllModals();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
};

const setupProjectCardsVisibility = () => {
  const projectCards = document.querySelectorAll('#projets .card');
  if (!projectCards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.2
  });

  projectCards.forEach(card => observer.observe(card));
};

const init = () => {
  menuMobile();
  smoothScroll();
  setupScrollReveal();
  setupTypingEffect();
  setupThemeToggle();
  setupPortfolioFilters();
  setupProjectDetails();
  setupProjectCardsVisibility();
};

document.addEventListener('DOMContentLoaded', init);
