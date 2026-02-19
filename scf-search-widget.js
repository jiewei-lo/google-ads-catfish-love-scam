(function () {
  var methodConfig = {
    name: { label: 'Name', placeholder: 'Enter full name..', icon: '👤' },
    email: { label: 'Email', placeholder: 'Enter email..', icon: '✉' },
    username: { label: 'Username', placeholder: 'Enter username..', icon: '💬' },
    phone: { label: 'Phone', placeholder: 'Enter phone number..', icon: '📞' },
    address: { label: 'Address', placeholder: 'Enter address..', icon: '📍' },
    photo: { label: 'Image', placeholder: 'Enter image URL..', icon: '🖼' }
  };

  function initScfSearchWidget(root) {
    if (!root) return null;

    var dropdown = root.querySelector('.swf-dropdown');
    var toggle = root.querySelector('[data-swf-toggle]');
    var labelEl = root.querySelector('[data-swf-label]');
    var iconEl = root.querySelector('[data-swf-icon]');
    var menu = root.querySelector('[data-swf-menu]');
    var optionEls = root.querySelectorAll('[data-method-option]');
    var chipEls = root.querySelectorAll('[data-method-chip]');
    var desktopInput = root.querySelector('[data-swf-input-desktop]');
    var mobileInput = root.querySelector('[data-swf-input-mobile]');

    function activateMethod(method) {
      var cfg = methodConfig[method];
      if (!cfg) return;

      if (labelEl) labelEl.textContent = cfg.label;
      if (iconEl) iconEl.textContent = cfg.icon;

      if (desktopInput) {
        desktopInput.value = '';
        desktopInput.placeholder = cfg.placeholder;
      }
      if (mobileInput) {
        mobileInput.value = '';
        mobileInput.placeholder = cfg.placeholder;
      }

      optionEls.forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-method-option') === method);
      });
      chipEls.forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('data-method-chip') === method);
      });
    }

    if (toggle && dropdown && menu) {
      toggle.addEventListener('click', function () {
        var open = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      optionEls.forEach(function (el) {
        el.addEventListener('click', function () {
          activateMethod(el.getAttribute('data-method-option'));
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    chipEls.forEach(function (el) {
      el.addEventListener('click', function () {
        activateMethod(el.getAttribute('data-method-chip'));
      });
    });

    activateMethod('name');

    var api = { activateMethod: activateMethod };
    root.__scfWidget = api;
    return api;
  }

  function initAllScfSearchWidgets() {
    var roots = document.querySelectorAll('[data-scf-search-widget]');
    var apis = [];
    roots.forEach(function (root) {
      var api = initScfSearchWidget(root);
      if (api) apis.push(api);
    });
    return apis;
  }

  window.initScfSearchWidget = initScfSearchWidget;
  window.initAllScfSearchWidgets = initAllScfSearchWidgets;
})();
