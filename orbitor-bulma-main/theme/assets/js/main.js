// Minimal interactions for navigation, avatar fallback, and clipboard copying.
document.addEventListener('DOMContentLoaded', function () {
  // Navbar burger toggle (Bulma pattern)
  var burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  burgers.forEach(function (burger) {
    var targetId = burger.dataset.target;
    var target = document.getElementById(targetId);
    burger.addEventListener('click', function () {
      var isActive = burger.classList.toggle('is-active');
      burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      if (target) {
        target.classList.toggle('is-active', isActive);
      }
    });
  });

  // Headshot fallback to initials avatar if the image fails to load.
  var avatarImages = document.querySelectorAll('[data-avatar]');
  avatarImages.forEach(function (img) {
    var container = img.closest('.profile-media');
    if (!container) return;

    var activateFallback = function () {
      container.classList.add('has-fallback');
    };

    img.addEventListener('error', activateFallback);

    if (img.complete && img.naturalWidth === 0) {
      activateFallback();
    }
  });

  // Copy-to-clipboard buttons for contact methods.
  var copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy');
      if (!value) return;

      var handleSuccess = function () {
        var originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('is-success');
        setTimeout(function () {
          button.textContent = originalText;
          button.classList.remove('is-success');
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(handleSuccess);
      } else {
        var textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          var successful = document.execCommand('copy');
          if (successful) {
            handleSuccess();
          }
        } finally {
          document.body.removeChild(textarea);
        }
      }
    });
  });
});
