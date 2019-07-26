'use strict';

(function () {
  var ANY_INPUT_VALUE = 'any';

  var housingTypeElement = window.variable.mapFiltersElement.querySelector('#housing-type');
  var housingPriceElement = window.variable.mapFiltersElement.querySelector('#housing-price');
  var housingRoomsElement = window.variable.mapFiltersElement.querySelector('#housing-rooms');
  var housingGuestsElement = window.variable.mapFiltersElement.querySelector('#housing-guests');
  var housingFeaturesElement = window.variable.mapFiltersElement.querySelector('#housing-features');
  var filters = [housingTypeElement, housingPriceElement, housingRoomsElement, housingGuestsElement, housingFeaturesElement];


  var updateOfferPins = function (arr) {
    var housingFeaturesCheckedCollectionElements = window.variable.mapFiltersElement.querySelectorAll('.map__checkbox:checked');
    var newOfferPins = arr.slice();
    var priceLimitMap = {
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
      var priceLimits = priceLimitMap[housingPriceElement.querySelector('option:checked').value];

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

    if (housingFeaturesCheckedCollectionElements.length > 0) {
      for (var i = 0; i < housingFeaturesCheckedCollectionElements.length; i++) {
        newOfferPins = newOfferPins.filter(function (it) {
          var sameFeature = it.offer.features.some(function (element) {
            return element === housingFeaturesCheckedCollectionElements[i].value;
          });

          return sameFeature;
        });
      }
    }

    window.addOffersPins(newOfferPins);
  };

  var removeCardModalFromMap = function () {
    var cardModalElement = document.querySelector('.map__card');
    var cardModalInMap = Array.from(window.variable.mapElement.childNodes).some(function (it) {
      return it === cardModalElement;
    });

    if (cardModalInMap) {
      window.variable.mapElement.removeChild(window.variable.mapElement.querySelector('.map__card'));
    }
  };

  var onFilterChange = function () {
    window.debounce(function () {
      updateOfferPins(window.variable.usersAds);
      removeCardModalFromMap();
    });
  };

  filters.forEach(function (it) {
    it.addEventListener('change', onFilterChange);
  });

  window.util.addAttributeToElementsInCollection(window.variable.mapFiltersSelectsElements, 'disabled');
  window.util.addAttributeToElement(window.variable.mapFiltersfieldsetElement, 'disabled');
})();
