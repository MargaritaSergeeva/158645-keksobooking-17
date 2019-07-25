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
