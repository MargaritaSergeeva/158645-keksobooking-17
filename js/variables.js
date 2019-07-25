'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapMainPinElement = mapPinsElement.querySelector('.map__pin--main');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var formElement = document.querySelector('.ad-form');
  var housingTypeSelectElement = formElement.querySelector('#type');
  var timeInSelectElement = formElement.querySelector('#timein');
  var timeOutSelectElement = formElement.querySelector('#timeout');
  var roomNumberSelectElement = formElement.querySelector('#room_number');
  var formSelects = [housingTypeSelectElement, timeInSelectElement, timeOutSelectElement, roomNumberSelectElement];


  window.variables = {
    mainElement: document.querySelector('main'),
    mapElement: mapElement,
    mapPinsElement: mapElement.querySelector('.map__pins'),
    mapMainPinElement: mapMainPinElement,
    pinHalfHeight: mapMainPinElement.getBoundingClientRect().height / 2,
    pinHalfWidth: mapMainPinElement.getBoundingClientRect().width / 2,
    pinsChildrenCount: mapPinsElement.childNodes.length,
    mapFiltersElement: mapFiltersElement,
    mapFiltersSelectsElements: mapFiltersElement.querySelectorAll('.map__filter'),
    mapFiltersfieldsetElement: mapFiltersElement.querySelector('.map__features'),
    formElement: formElement,
    formFieldsetsCollectionElements: formElement.querySelectorAll('fieldset'),
    housingTypeSelectElement: housingTypeSelectElement,
    timeInSelectElement: timeInSelectElement,
    timeOutSelectElement: timeOutSelectElement,
    roomNumberSelectElement: roomNumberSelectElement,
    formSelects: formSelects,
    typesHousingMap: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    addressInputElement: formElement.querySelector('#address'),
    formAvatarPreviewElement: formElement.querySelector('.ad-form-header__preview'),
    formImageBlockContainerElement: formElement.querySelector('.ad-form__photo-container'),
    formImageBlockElement: formElement.querySelector('.ad-form__photo'),
    usersAds: [],
  };
})();
