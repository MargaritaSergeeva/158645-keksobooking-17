'use strict';

(function () {
  var Default = {
    AVATAR: 'img/avatars/default.png',
    TITLE: 'Без заголовка',
    ADDRESS: 'Адрес не указан',
    PRICE: 'Цена не указана',
    TYPE: 'Тип жилья не указан',
    GUESTS: 'гостей',
    ROOMS: 'Комната/ы для ',
    TIMING: 'Данные по въезду и выезду не указаны',
    DESCRIPTION: 'Описание не указано'
  };

  var offersCardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var offersCardElement = offersCardTemplateElement.cloneNode(true);
  var closureoffersCardElement = offersCardElement.querySelector('.popup__close');
  var featuresListElement = offersCardElement.querySelector('.popup__features');
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

    if (openedUsersOffer.photos) {
      window.utils.showElement(photosListElement);

      for (var i = 0; i < openedUsersOffer.photos.length; i++) {
        createPhoto(i);
      }

      photosListElement.appendChild(photosFragment);
    } else {
      window.utils.closeElement(photosListElement);
    }
  };

  var hideFeatures = function () {
    var featuresCollectionElements = featuresListElement.querySelectorAll('.popup__feature');

    featuresCollectionElements.forEach(function (it) {
      window.utils.closeElement(it);
    });
  };

  var addFeatures = function () {
    if (openedUsersOffer.features.length > 0) {
      window.utils.showElement(featuresListElement);

      openedUsersOffer.features.forEach(function (it) {
        window.utils.showElement(featuresListElement.querySelector('.popup__feature--' + it));
      });
    } else {
      window.utils.closeElement(featuresListElement);
    }
  };

  var fillRoomsAndGuests = function (ad) {
    var capacityElement = offersCardElement.querySelector('.popup__text--capacity');

    if (ad.rooms && ad.guests) {
      capacityElement.textContent = ad.rooms + ' комнат/а/ы для ' + ad.guests + ' гостя/ей';
    } else if (ad.rooms && !ad.guests) {
      capacityElement.textContent = ad.rooms + ' комнат/а/ы для ' + Default.GUESTS;
    } else if (!ad.rooms && ad.guests) {
      capacityElement.textContent = Default.ROOMS + ad.guests + ' гостя/ей';
    } else {
      capacityElement.textContent = Default.ROOMS + Default.GUESTS;
    }
  };

  var fillTiming = function (ad) {
    var timeElement = offersCardElement.querySelector('.popup__text--time');

    if (ad.checkin && ad.checkout) {
      timeElement.textContent = 'Заезд после ' + ad.checkin + ', выезд до ' + ad.checkout;
    } else if (ad.checkin && !ad.checkout) {
      timeElement.textContent = 'Заезд после ' + ad.checkin;
    } else if (!ad.checkin && ad.checkout) {
      timeElement.textContent = 'Выезд до ' + ad.checkout;
    } else {
      timeElement.textContent = Default.TIMING;
    }
  };

  var fillOffersCard = function (ad) {
    var userAvatarElement = offersCardElement.querySelector('.popup__avatar');
    var titleElement = offersCardElement.querySelector('.popup__title');
    var addressElement = offersCardElement.querySelector('.popup__text--address');
    var priceElement = offersCardElement.querySelector('.popup__text--price');
    var housingTypeElement = offersCardElement.querySelector('.popup__type');
    var descriptionElement = offersCardElement.querySelector('.popup__description');

    hideFeatures();
    openedUsersOffer = new window.UserOffer(ad);

    userAvatarElement.src = (openedUsersOffer.avatar) ? openedUsersOffer.avatar : Default.AVATAR;
    titleElement.textContent = (openedUsersOffer.title) ? openedUsersOffer.title : Default.TITLE;
    addressElement.textContent = (openedUsersOffer.address) ? openedUsersOffer.address : Default.ADDRESS;
    priceElement.innerHTML = (openedUsersOffer.price) ? openedUsersOffer.price + '&#x20bd;<span>/ночь</span>' : Default.PRICE;
    housingTypeElement.textContent = (openedUsersOffer.type) ? window.variables.typesHousingMap[openedUsersOffer.type] : Default.TYPE;
    descriptionElement.textContent = (openedUsersOffer.description) ? openedUsersOffer.description : Default.DESCRIPTION;
    fillRoomsAndGuests(openedUsersOffer);
    fillTiming(openedUsersOffer);
    addFeatures();
    fillPhotosList();
  };

  var onUserOfferModalEscPress = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      window.variables.mapElement.removeChild(offersCardElement);
      document.removeEventListener('keydown', onUserOfferModalEscPress);
    }
  };

  window.renderTargetOffersCard = function (arr, pinsIndex) {
    var targetOffersCard = arr.filter(function (it) {
      return arr.indexOf(it) === pinsIndex;
    });

    fillOffersCard(targetOffersCard[0]);
    window.variables.mapElement.appendChild(offersCardElement);
    document.addEventListener('keydown', onUserOfferModalEscPress);
  };


  closureoffersCardElement.addEventListener('click', function () {
    window.variables.mapElement.removeChild(offersCardElement);
    document.removeEventListener('keydown', onUserOfferModalEscPress);
  });
})();
