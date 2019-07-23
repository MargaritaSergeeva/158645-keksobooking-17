'use strict';

(function () {
  window.utils = {
    showElement: function (element) {
      if (element) {
        element.classList.remove('hidden');
      }
    },

    closeElement: function (element) {
      if (element) {
        element.classList.add('hidden');
      }
    },

    hideElement: function (element) {
      if (element) {
        element.classList.add('visually-hidden');
      }
    },

    getRandomValue: function (arr) {
      if (arr.length > 0) {
        return arr[Math.round(-0.5 + Math.random() * arr.length)];
      }

      return 0;
    },

    getBlockTopPosition: function (element) {
      return element ? element.getBoundingClientRect().top : '';
    },

    getBlockLeftPosition: function (element) {
      return element ? element.getBoundingClientRect().left : '';
    },

    getBlockRightPosition: function (element) {
      return element ? element.getBoundingClientRect().right : '';
    },

    resetBlockPosition: function (element) {
      element.style.top = '';
      element.style.left = '';
    },

    resetInputValue: function (input) {
      if (input) {
        input.value = '';
      }
    },

    resetElementStyle: function (element, selector) {
      if (element) {
        element.style[selector] = '';
      }
    },

    compareRandom: function () {
      return Math.random() - 0.5;
    },

    compareNumbersGoDown: function (left, right) {
      if (left > right) {
        return -1;
      } else if (left < right) {
        return 1;
      } else {
        return 0;
      }
    },

    assignOneClassToElement: function (element, elementClass) {
      if (element) {
        element.className = elementClass;
      }
    },

    addAttributeToElement: function (element, attrName) {
      element[attrName] = true;
    },

    addAttributeToElementsInCollection: function (elements, attrName) {
      elements.forEach(function (it) {
        window.utils.addAttributeToElement(it, attrName);
      });
    },

    removeAttributeFromElement: function (element, attrName) {
      element[attrName] = false;
    },

    removeAttributeFromElementsInCollection: function (elements, attrName) {
      elements.forEach(function (it) {
        window.utils.removeAttributeFromElement(it, attrName);
      });
    },

    addChangeListener: function (element, callback) {
      element.addEventListener('change', callback);
    },

    setAddressInputValue: function () {
      var locationX = Math.round(window.variables.mapMainPinElement.getBoundingClientRect().left + window.variables.pinHalfWidth);
      var locationY = Math.round(window.variables.mapMainPinElement.getBoundingClientRect().top + pageYOffset + window.variables.pinHalfHeight);

      window.variables.addressInputElement.value = locationX + ', ' + locationY;
    },

    removeOffersPins: function (element, childrenCount) {
      while (element.childNodes.length !== childrenCount) {
        element.removeChild(element.lastChild);
      }
    },

    removeCardModalFromMap: function () {
      var cardModalElement = document.querySelector('.map__card');
      var cardModalInMap = Array.from(window.variables.mapElement.childNodes).some(function (it) {
        return it === cardModalElement;
      });

      if (cardModalInMap) {
        window.variables.mapElement.removeChild(cardModalElement);
      }
    }
  };
})();
