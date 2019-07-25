'use strict';

(function () {
  var MAX_PINS_COUNT = 5;

  var createOffersPin = function (ad) {
    var offersPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
    var offersPinElement = offersPinTemplateElement.cloneNode(true);


    if (Object.keys(ad).length > 0) {
      offersPinElement.querySelector('img').src = ad.author.avatar;
      offersPinElement.style.left = (ad.location.x - window.constants.Pin.WIDTH / 2) + 'px';
      offersPinElement.style.top = (ad.location.y - window.constants.Pin.HEIGHT) + 'px';
      offersPinElement.alt = ad.offer.title;
      offersPinElement.index = window.variables.usersAds.indexOf(ad);

      return offersPinElement;
    }

    return {};
  };


  window.addOffersPins = function (ads) {
    var fragment = document.createDocumentFragment();


    ads
    .slice(0, MAX_PINS_COUNT)
    .forEach(function (it) {
      if (it.offer) {
        fragment.appendChild(createOffersPin(it));
      }
    });

    window.offerPins.removeFocusEventListener();
    window.utils.removeOffersPins(window.variables.mapPinsElement, window.variables.pinsChildrenCount);
    window.variables.mapPinsElement.appendChild(fragment);
    window.offerPins.addFocusEventListener();
  };
})();
