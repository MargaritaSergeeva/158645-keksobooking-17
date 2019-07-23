'use strict';

(function () {
  window.CustomValidation = function () {};

  window.CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function (input) {
      if (input.validity.tooShort) {
        this.addInvalidity('Введите минимум ' + input.minLength + ' символов');
      }

      if (input.validity.tooLong) {
        this.addInvalidity('Максимум символов ' + input.maxLength);
      }

      if (input.validity.valueMissing) {
        this.addInvalidity('Заполните это поле');
      }

      if (input.validity.rangeUnderflow) {
        this.addInvalidity('Минимально возможное значение ' + input.min);
      }

      if (input.validity.rangeOverflow) {
        this.addInvalidity('Максимально возможное значение ' + input.max);
      }
    },

    addInvalidity: function (message) {
      var isDoubleMessage = this.invalidities.some(function (it) {
        return it === message;
      });

      if (!isDoubleMessage) {
        this.invalidities.push(message);
      }
    },

    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };
})();
