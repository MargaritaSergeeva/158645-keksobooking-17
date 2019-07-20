'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');

  window.variables = {
    mainElement: document.querySelector('main'),
    mapElement: mapElement,
    mapPinsElement: mapElement.querySelector('.map__pins'),
    mapFiltersElement: mapFiltersElement,
    mapFiltersSelectsElements: mapFiltersElement.querySelectorAll('.map__filter'),
    mapFiltersfieldsetElement: mapFiltersElement.querySelector('.map__features'),
    usersAds: [],
    typesHousingMap: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    }
  };
})();
