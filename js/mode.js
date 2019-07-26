'use strict';

(function () {
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var FIRST_IMAGE_BLOCK_ID = 'photo-1';
  var MainPin = {
    LEFT_POSITION: 570,
    TOP_POSITION: 375
  };

  var optionCollectionElements;


  var resetFormImages = function () {
    var formImageBlockCollectionElements = window.variable.formElement.querySelectorAll('.ad-form__photo');
    var formImageElement = window.variable.formElement.querySelector('.ad-form__photo-img');


    window.variable.formAvatarPreviewElement.querySelector('img').src = AVATAR_DEFAULT;

    formImageBlockCollectionElements.forEach(function (it, index) {
      if (index > 0) {
        window.variable.formImageBlockContainerElement.removeChild(it);
      } else {
        var isImageInForm = Array.from(it.childNodes).some(function (node) {
          return node.classList.contains(formImageElement.className);
        });

        if (isImageInForm) {
          it.removeChild(it.querySelector('.ad-form__photo-img'));
          it.id = FIRST_IMAGE_BLOCK_ID;
        }
      }
    });
  };

  var resetForm = function () {
    var formCheckboxsCollectionElements = window.variable.formElement.querySelectorAll('.feature__checkbox');
    var inputIdentifiers = ['avatar', 'title', 'price', 'description', 'images'];

    resetFormImages();
    inputIdentifiers.forEach(function (it) {
      window.util.resetInputValue(window.variable.formElement.querySelector('#' + it));
    });

    window.variable.formSelects.forEach(function (it) {
      optionCollectionElements = it.querySelectorAll('option');
      window.util.removeAttributeFromElementsInCollection(optionCollectionElements, 'selected');
    });

    window.util.removeAttributeFromElementsInCollection(formCheckboxsCollectionElements, 'checked');
    window.setInputCorrelation(window.variable.roomNumberSelectElement);
    window.setInputCorrelation(window.variable.housingTypeSelectElement);
    window.util.setAddressInputValue();
    window.variable.formElement.classList.add('ad-form--disabled');
    window.util.addAttributeToElementsInCollection(window.variable.formFieldsetsCollectionElements, 'disabled');
  };

  var resetMap = function () {
    window.variable.mapElement.classList.add('map--faded');
    window.variable.mapMainPinElement.style.top = MainPin.TOP_POSITION + 'px';
    window.variable.mapMainPinElement.style.left = MainPin.LEFT_POSITION + 'px';
    window.util.removeCardModalFromMap();
    window.util.removeOffersPins(window.variable.mapPinsElement, window.variable.pinsChildrenCount);
  };

  var resetFilter = function () {
    var mapCheckboxsCollectionElements = window.variable.mapElement.querySelectorAll('.map__checkbox');
    var filterSelectsCollectionElements = window.variable.mapElement.querySelectorAll('select');

    filterSelectsCollectionElements.forEach(function (it) {
      optionCollectionElements = it.querySelectorAll('option');
      window.util.removeAttributeFromElementsInCollection(optionCollectionElements, 'selected');
    });
    window.util.removeAttributeFromElementsInCollection(mapCheckboxsCollectionElements, 'checked');
    window.util.addAttributeToElementsInCollection(window.variable.mapFiltersSelectsElements, 'disabled');
    window.util.addAttributeToElement(window.variable.mapFiltersfieldsetElement, 'disabled');
  };

  window.mode = {
    activeMapAndForm: function () {
      window.variable.mapElement.classList.remove('map--faded');
      window.util.removeAttributeFromElementsInCollection(window.variable.formFieldsetsCollectionElements, 'disabled');
      window.variable.formElement.classList.remove('ad-form--disabled');
    },

    activeFilter: function () {
      window.variable.mapFiltersElement.classList.remove('map__filters--disabled');
      window.util.removeAttributeFromElementsInCollection(window.variable.mapFiltersSelectsElements, 'disabled');
      window.util.removeAttributeFromElement(window.variable.mapFiltersfieldsetElement, 'disabled');
    },

    sleep: function () {
      resetMap();
      resetForm();
      resetFilter();
    }
  };
})();
