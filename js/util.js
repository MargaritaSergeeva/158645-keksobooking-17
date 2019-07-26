'use strict';

(function () {
  window.util = {
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

    getBlockTopPosition: function (element) {
      return element ? element.getBoundingClientRect().top : '';
    },

    getBlockLeftPosition: function (element) {
      return element ? element.getBoundingClientRect().left : '';
    },

    getBlockRightPosition: function (element) {
      return element ? element.getBoundingClientRect().right : '';
    },

    resetInputValue: function (input) {
      if (input) {
        input.value = '';
      }
    },

    addAttributeToElement: function (element, attrName) {
      element[attrName] = true;
    },

    addAttributeToElementsInCollection: function (elements, attrName) {
      elements.forEach(function (it) {
        window.util.addAttributeToElement(it, attrName);
      });
    },

    removeAttributeFromElement: function (element, attrName) {
      element[attrName] = false;
    },

    removeAttributeFromElementsInCollection: function (elements, attrName) {
      elements.forEach(function (it) {
        window.util.removeAttributeFromElement(it, attrName);
      });
    },

    setAddressInputValue: function () {
      var locationX = Math.round(window.variable.mapMainPinElement.getBoundingClientRect().left + window.variable.pinHalfWidth);
      var locationY = Math.round(window.variable.mapMainPinElement.getBoundingClientRect().top + pageYOffset + window.variable.pinHalfHeight);

      window.variable.addressInputElement.value = locationX + ', ' + locationY;
    },

    removeOffersPins: function (element, childrenCount) {
      while (element.childNodes.length !== childrenCount) {
        element.removeChild(element.lastChild);
      }
    },

    removeCardModalFromMap: function () {
      var cardModalElement = document.querySelector('.map__card');
      var cardModalInMap = Array.from(window.variable.mapElement.childNodes).some(function (it) {
        return it === cardModalElement;
      });

      if (cardModalInMap) {
        window.variable.mapElement.removeChild(cardModalElement);
      }
    }
  };
})();
