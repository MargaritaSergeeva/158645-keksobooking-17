'use strict';

(function () {
  var DEBOUNCE_INTERVAL_MS = 500;

  var lastTimeout;

  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL_MS);
  };
})();
