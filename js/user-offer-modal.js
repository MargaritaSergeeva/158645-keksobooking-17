'use strict';

(function () {
  var offersCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var offersCardElement = offersCardTemplateElement.cloneNode(true);
  var closureoffersCardElement = offersCardElement.querySelector('.popup__close');
  var featuresElement = offersCardElement.querySelector('.popup__features');
  var photosFragment = document.createDocumentFragment();
  var openedUsersOffer = {};


  var createPhoto = function (index) {
    var photoTemplateElement = document.querySelector('#card-img').content.querySelector('.popup__photo');
    var photoElement = photoTemplateElement.cloneNode(true);
    photoElement.src = openedUsersOffer.photos[index];
    photosFragment.appendChild(photoElement);
  };

  var fillPhotosList = function () {
    var photosListElement = offersCardElement.querySelector('.popup__photos');

    photosListElement.innerHTML = '';

    if (openedUsersOffer.photos.length > 1) {
      for (var i = 0; i < openedUsersOffer.photos.length; i++) {
        createPhoto(i);
      }

      photosListElement.appendChild(photosFragment);
    }
  };

  var hideFeatures = function () {
    var featuresCollectionElements = featuresElement.querySelectorAll('.popup__feature');

    featuresCollectionElements.forEach(function (it) {
      window.utils.closeElement(it);
    });
  };

  var addFeatures = function () {
    openedUsersOffer.features.forEach(function (it) {
      window.utils.showElement(featuresElement.querySelector('.popup__feature--' + it));
    });
  };

  var fillOffersCard = function (ad) {
    var userAvatarElement = offersCardElement.querySelector('.popup__avatar');
    var titleElement = offersCardElement.querySelector('.popup__title');
    var addressElement = offersCardElement.querySelector('.popup__text--address');
    var priceElement = offersCardElement.querySelector('.popup__text--price');
    var housingTypeElement = offersCardElement.querySelector('.popup__type');
    var capacityElement = offersCardElement.querySelector('.popup__text--capacity');
    var timeElement = offersCardElement.querySelector('.popup__text--time');
    var descriptionElement = offersCardElement.querySelector('.popup__description');

    hideFeatures();
    openedUsersOffer = new window.UserOffer(ad);
    userAvatarElement.src = openedUsersOffer.avatar;
    titleElement.textContent = openedUsersOffer.title;
    addressElement.textContent = openedUsersOffer.address;
    priceElement.innerHTML = openedUsersOffer.price + '&#x20bd;<span>/ночь</span>';
    housingTypeElement.textContent = window.variables.typesHousingMap[openedUsersOffer.type];
    capacityElement.textContent = openedUsersOffer.rooms + ' комнат/а/ы для ' + openedUsersOffer.guests + ' гостя/ей';
    timeElement.textContent = 'Заезд после ' + openedUsersOffer.checkin + ', выезд до ' + openedUsersOffer.checkout;
    descriptionElement.textContent = openedUsersOffer.description;
    openedUsersOffer.features.forEach(function (it) {
      window.utils.showElement(featuresElement.querySelector('.popup__feature--' + it));
    });
    addFeatures();
    fillPhotosList();
  };

  window.renderTargetOffersCard = function (arr, pinsIndex) {
    var targetOffersCard = arr.filter(function (it) {
      return arr.indexOf(it) === pinsIndex;
    });

    fillOffersCard(targetOffersCard[0]);
    window.variables.mapElement.appendChild(offersCardElement);
    document.addEventListener('keydown', onUserOfferModalEscPress);
  };

  var onUserOfferModalEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      window.variables.mapElement.removeChild(offersCardElement);
      document.removeEventListener('keydown', onUserOfferModalEscPress);
    }
  };

  closureoffersCardElement.addEventListener('click', function () {
    window.variables.mapElement.removeChild(offersCardElement);
    document.removeEventListener('keydown', onUserOfferModalEscPress);
  });

  window.utils.setAttributeToElementsInCollection(window.variables.mapFiltersSelectsElements, 'disabled', 'disabled');
  window.utils.setAttributeToElement(window.variables.mapFiltersfieldsetElement, 'disabled', 'disabled');

})();

var offersCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
var offersCardElement = offersCardTemplateElement.cloneNode(true);
var photosListElement = offersCardElement.querySelector('.popup__photos');
