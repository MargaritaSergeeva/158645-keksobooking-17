'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  window.keyboard = {
    isEnterPressed: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    }
  };
})();
