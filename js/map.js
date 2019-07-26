'use strict';

(function () {
  var onMapClick = function (evt) {
    if (evt.target.classList.contains('map__offer-pin-img')) {
      var pinsCollectionElements = window.variable.mapElement.querySelectorAll('.map__pin--offer');

      pinsCollectionElements.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
      evt.target.parentNode.classList.add('map__pin--active');
      window.renderTargetOffersCard(window.variable.usersAds, evt.target.parentNode.index);
    }
  };

  window.variable.mapElement.addEventListener('click', onMapClick);
})();
