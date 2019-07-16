'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var mapPinMainElement = mapPinsElement.querySelector('.map__pin--main');

  var childrenCount = mapPinsElement.childNodes.length;


  var usersAds = [];

  var createOffersPin = function (ad) {
    var offersPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
    var offersPinElement = offersPinTemplateElement.cloneNode(true);

    if (Object.keys(ad).length > 0) {
      offersPinElement.querySelector('img').src = ad.author.avatar;
      offersPinElement.style.left = ad.location.x - Pin.WIDTH / 2 + 'px';
      offersPinElement.style.top = ad.location.y - Pin.HEIGHT + 'px';
      offersPinElement.alt = ad.offer.title;

      return offersPinElement;
    }

    return {};
  };

  var removeOffersPins = function (element) {
    while (element.childNodes.length !== childrenCount) {
      element.removeChild(element.lastChild);
    }
  };

  window.addOffersPins = function (ads) {
    var fragment = document.createDocumentFragment();

    if (ads.length > 0) {
      ads
      .slice()
      .forEach(function (it) {
        fragment.appendChild(createOffersPin(it));
      });

      removeOffersPins(mapPinsElement);
      mapPinsElement.appendChild(fragment);
    }

    return {};
  };

  var onErrorLoadData = function (errorMessage) {
    window.popupMessages.showError('#error', errorMessage);
  };

  var onSuccessLoadData = function (ads) {
    usersAds = ads;
    window.addOffersPins(usersAds);
  };

  mapPinMainElement.addEventListener('mousedown', function () {
    window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
    mapElement.classList.remove('map--faded');
  });


})();

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';


xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
xhr.send();
