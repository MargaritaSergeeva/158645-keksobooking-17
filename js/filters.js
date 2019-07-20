'use strict';

(function () {
  var ANY_INPUT_VALUE = 'any';

  var housingTypeElement = window.variables.mapFiltersElement.querySelector('#housing-type');
  var housingPriceElement = window.variables.mapFiltersElement.querySelector('#housing-price');
  var housingRoomsElement = window.variables.mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = window.variables.mapFiltersElement.querySelector('#housing-guests');
  var housingFeaturesElement = window.variables.mapFiltersElement.querySelector('#housing-features');


  var updateOfferPins = function (arr) {
    var housingFeaturesCheckedElements = window.variables.mapFiltersElement.querySelectorAll('.map__checkbox:checked');
    var newOfferPins = arr.slice();
    var priceLimitsMap = {
      'low': {
        minPrice: 0,
        maxPrice: 10000,
      },
      'middle': {
        minPrice: 10000,
        maxPrice: 50000,
      },
      'high': {
        minPrice: 50000,
        maxPrice: Infinity,
      }
    };

    if (housingTypeElement.querySelector('option:checked').value !== ANY_INPUT_VALUE) {
      newOfferPins = newOfferPins.filter(function (it) {
        return it.offer.type === housingTypeElement.querySelector('option:checked').value;
      });
    }

    if (housingPriceElement.querySelector('option:checked').value !== ANY_INPUT_VALUE) {
      var priceLimits = priceLimitsMap[housingPriceElement.querySelector('option:checked').value];

      newOfferPins = newOfferPins.filter(function (it) {
        return it.offer.price >= priceLimits.minPrice && it.offer.price <= priceLimits.maxPrice;
      });
    }

    if (housingRoomsElement.querySelector('option:checked').value !== ANY_INPUT_VALUE) {
      newOfferPins = newOfferPins.filter(function (it) {
        return it.offer.rooms === +housingRoomsElement.querySelector('option:checked').value;
      });
    }

    if (housingGuestsElement.querySelector('option:checked').value !== ANY_INPUT_VALUE) {
      newOfferPins = newOfferPins.filter(function (it) {
        return it.offer.guests === +housingGuestsElement.querySelector('option:checked').value;
      });
    }

    if (housingFeaturesCheckedElements.length > 0) {
      for (var i = 0; i < housingFeaturesCheckedElements.length; i++) {
        newOfferPins = newOfferPins.filter(function (it) {
          var sameFeature = it.offer.features.some(function (element) {
            return element === housingFeaturesCheckedElements[i].value;
          });

          return sameFeature;
        });
      }
    }

    window.addOffersPins(newOfferPins);
  };

  var removeCardModalFromMap = function () {
    var cardModalElement = document.querySelector('.map__card');
    var cardModalInMap = Array.from(window.variables.mapElement.childNodes).some(function (it) {
      return it === cardModalElement;
    });

    if (cardModalInMap) {
      window.variables.mapElement.removeChild(cardModalElement);
    }
  };

  var onInputChange = function () {
    window.debounce(function () {
      updateOfferPins(window.variables.usersAds);
      removeCardModalFromMap();
    });
  };

  var setChangeListener = function (element) {
    element.addEventListener('change', onInputChange);
  };

  setChangeListener(housingTypeElement);
  setChangeListener(housingPriceElement);
  setChangeListener(housingRoomsElement);
  setChangeListener(housingGuestsElement);
  setChangeListener(housingFeaturesElement);

  window.utils.setAttributeToElementsInCollection(window.variables.mapFiltersSelectsElements, 'disabled', 'disabled');
  window.utils.setAttributeToElement(window.variables.mapFiltersfieldsetElement, 'disabled', 'disabled');
})();
