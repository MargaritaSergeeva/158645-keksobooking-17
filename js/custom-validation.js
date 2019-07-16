'use strict';

(function () {
  var Hashtag = {
    MAX_LENGTH: 20,
    MAX__COUNT: 5
  };

  window.CustomValidation = function () {};

  window.CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function (element) {
      var isValidity = true;

      if (element[0] !== '#') {
        isValidity = false;
        this.addInvalidity('Хэш-тег должен начинаться с символа # (решётка)');
      }

      if (element[0] === '#' && element.length < 2) {
        isValidity = false;
        this.addInvalidity('Хэш-тег не должен состоять из одной решётки');
      }

      if (element[0] === '#' && element.match(/#/g).length > 1) {
        isValidity = false;
        this.addInvalidity('Хэш-теги должны разделяться с помощью пробела');
      }

      if (element.length > Hashtag.MAX_LENGTH) {
        isValidity = false;
        this.addInvalidity('Максимальная длина одного хэш-тега должна быть не более 20-ти символов, включая решётку');
      }

      return isValidity;
    },

    checkValidityArray: function (arr) {
      var sameElements = arr.some(function (it, index) {
        return arr.indexOf(it) !== index;
      });


      for (var i = 0; i < arr.length; i++) {
        var isValidity = this.checkValidity(arr[i]);
      }

      if (sameElements) {
        isValidity = false;
        this.addInvalidity('Хэш-теги не должны повторяться');
      }

      if (arr.length > Hashtag.MAX__COUNT) {
        isValidity = false;
        this.addInvalidity('Не должно быть больше 5-ти хэш-тегов');
      }

      return isValidity;
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
