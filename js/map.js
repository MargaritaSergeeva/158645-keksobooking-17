'use strict';

(function () {
  var onMapClick = function (evt) {
    if (evt.target.classList.contains('map__offer-pin-img')) {
      var pinsCollectionElements = window.variables.mapElement.querySelectorAll('.map__pin--offer');

      pinsCollectionElements.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      evt.target.parentNode.classList.add('map__pin--active');
      window.renderTargetOffersCard(window.variables.usersAds, evt.target.parentNode.index);
    }
  };

  window.variables.mapElement.addEventListener('click', onMapClick);
})();
