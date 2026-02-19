(function () {
  var methodLinks = document.querySelectorAll('[data-method-link]');
  var ctaButtons = document.querySelectorAll('[data-method]');
  var verification = document.getElementById('verification');
  var heroSection = document.querySelector('.hero');
  var mobileStickyCta = document.querySelector('.mobile-sticky-cta');

  if (window.initAllScfSearchWidgets) {
    window.initAllScfSearchWidgets();
  }

  function getPrimaryWidgetApi() {
    var root = (verification && verification.querySelector('[data-scf-search-widget]')) || document.querySelector('[data-scf-search-widget]');
    if (!root) return null;
    return root.__scfWidget || null;
  }

  function activateWidgetMethod(method) {
    var widget = getPrimaryWidgetApi();
    if (widget && typeof widget.activateMethod === 'function') {
      widget.activateMethod(method);
    }
  }

  methodLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      activateWidgetMethod(link.getAttribute('data-method-link'));
    });
  });

  ctaButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateWidgetMethod(btn.getAttribute('data-method'));
      if (verification) {
        verification.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  var revealItems = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
      if (!item.classList.contains('show')) observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) { item.classList.add('show'); });
  }

  if (mobileStickyCta && heroSection && window.matchMedia('(max-width: 700px)').matches) {
    var ticking = false;

    function updateMobileStickyCta() {
      ticking = false;
      var heroRect = heroSection.getBoundingClientRect();
      var show = heroRect.bottom <= Math.max(72, window.innerHeight * 0.35);
      mobileStickyCta.classList.toggle('is-visible', show);
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateMobileStickyCta);
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    updateMobileStickyCta();
  }
})();
