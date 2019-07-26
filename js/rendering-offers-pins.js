'use strict';

(function () {
  var MAX_PINS_COUNT = 5;

  var createOffersPin = function (ad) {
    var offersPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
    var offersPinElement = offersPinTemplateElement.cloneNode(true);


    if (Object.keys(ad).length > 0) {
      offersPinElement.querySelector('img').src = ad.author.avatar;
      offersPinElement.style.left = (ad.location.x - window.constant.Pin.WIDTH / 2) + 'px';
      offersPinElement.style.top = (ad.location.y - window.constant.Pin.HEIGHT) + 'px';
      offersPinElement.alt = ad.offer.title;
      offersPinElement.index = window.variable.usersAds.indexOf(ad);

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

    window.offerPin.removeFocusEventListener();
    window.util.removeOffersPins(window.variable.mapPinsElement, window.variable.pinsChildrenCount);
    window.variable.mapPinsElement.appendChild(fragment);
    window.offerPin.addFocusEventListener();
  };
})();
