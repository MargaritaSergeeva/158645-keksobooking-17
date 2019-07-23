'use strict';

(function () {
  var optionCollectionElements;

  var resetForm = function () {
    var formCheckboxsElements = window.variables.formElement.querySelectorAll('.feature__checkbox');
    var inputIdentifiers = ['avatar', 'title', 'price', 'description', 'images'];

    inputIdentifiers.forEach(function (it) {
      window.utils.resetInputValue(window.variables.formElement.querySelector('#' + it));
    });
    window.variables.formSelects.forEach(function (it) {
      optionCollectionElements = it.querySelectorAll('option');
      window.utils.removeAttributeFromElementsInCollection(optionCollectionElements, 'selected');
    });
    window.utils.removeAttributeFromElementsInCollection(formCheckboxsElements, 'checked');
    window.setCorrelation(window.variables.roomNumberSelectElement);
    window.setCorrelation(window.variables.housingTypeSelectElement);
    window.utils.setAddressInputValue();
    window.variables.formElement.classList.add('ad-form--disabled');
    window.utils.addAttributeToElementsInCollection(window.variables.formFieldsetsCollectionElements, 'disabled');
  };

  var resetMap = function () {
    var MainPin = {
      LEFT_POSITION: 570,
      TOP_POSITION: 375
    };

    window.variables.mapElement.classList.add('map--faded');
    window.variables.mapMainPinElement.style.top = MainPin.TOP_POSITION + 'px';
    window.variables.mapMainPinElement.style.left = MainPin.LEFT_POSITION + 'px';
    window.utils.removeCardModalFromMap();
    window.utils.removeOffersPins(window.variables.mapPinsElement, window.variables.pinsChildrenCount);
  };

  var resetFilter = function () {
    var mapCheckboxsElements = window.variables.mapElement.querySelectorAll('.map__checkbox');
    var filterSelectsElements = window.variables.mapElement.querySelectorAll('select');

    filterSelectsElements.forEach(function (it) {
      optionCollectionElements = it.querySelectorAll('option');
      window.utils.removeAttributeFromElementsInCollection(optionCollectionElements, 'selected');
    });
    window.utils.removeAttributeFromElementsInCollection(mapCheckboxsElements, 'checked');
    window.utils.addAttributeToElementsInCollection(window.variables.mapFiltersSelectsElements, 'disabled');
    window.utils.addAttributeToElement(window.variables.mapFiltersfieldsetElement, 'disabled');
  };

  window.mode = {
    active: function () {
      window.variables.mapElement.classList.remove('map--faded');
      window.utils.removeAttributeFromElementsInCollection(window.variables.mapFiltersSelectsElements, 'disabled');
      window.utils.removeAttributeFromElement(window.variables.mapFiltersfieldsetElement, 'disabled');
      window.utils.removeAttributeFromElementsInCollection(window.variables.formFieldsetsCollectionElements, 'disabled');
      window.variables.formElement.classList.remove('ad-form--disabled');
    },

    sleep: function () {
      resetMap();
      resetForm();
      resetFilter();
    }
  };
})();
