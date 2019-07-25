'use strict';

(function () {
  var onOfferPinEnterPress = function (pressEvt) {
    if (window.keyboard.isEnterPressed(pressEvt)) {
      var pinsCollectionElements = window.variables.mapElement.querySelectorAll('.map__pin--offer');

      pinsCollectionElements.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      pressEvt.target.classList.add('map__pin--active');
      window.renderTargetOffersCard(window.variables.usersAds, pressEvt.target.index);
    }
  };

  var onOfferPinFocus = function () {
    document.addEventListener('keydown', onOfferPinEnterPress);
  };

  var onOfferPinBlur = function () {
    document.removeEventListener('keydown', onOfferPinEnterPress);
  };

  window.offerPins = {
    removeFocusEventListener: function () {
      var offerPinElements = window.variables.mapPinsElement.querySelectorAll('.map__pin--offer');

      if (offerPinElements.length > 0) {
        offerPinElements.forEach(function (it) {
          it.removeEventListener('focus', onOfferPinFocus);
          it.removeEventListener('blur', onOfferPinBlur);
        });
      }
    },

    addFocusEventListener: function () {
      var offerPinElements = window.variables.mapPinsElement.querySelectorAll('.map__pin--offer');

      if (offerPinElements.length > 0) {
        offerPinElements.forEach(function (it) {
          it.addEventListener('focus', onOfferPinFocus);
          it.addEventListener('blur', onOfferPinBlur);
        });
      }
    }
  };
})();
