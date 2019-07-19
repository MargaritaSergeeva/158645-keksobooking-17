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

    setAttributeToElement: function (element, attrName, attrValue) {
      element.setAttribute(attrName, attrValue);
    },

    setAttributeToElementsInCollection: function (element, attrName, attrValue) {
      element.forEach(function (it) {
        window.utils.setAttributeToElement(it, attrName, attrValue);
      });
    },

    removeAttributeToElement: function (element, attrName) {
      element.removeAttribute(attrName);
    },

    removeAttributeToElementsInCollection: function (element, attrName) {
      element.forEach(function (it) {
        window.utils.removeAttributeToElement(it, attrName);
      });
    }
  };
})();
