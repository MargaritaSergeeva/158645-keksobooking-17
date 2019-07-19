'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;

  var mapPinMainElement = window.variables.mapPinsElement.querySelector('.map__pin--main');
  var addressInputElement = document.querySelector('#address');
  var pinTotalHeight = mapPinMainElement.getBoundingClientRect().height + PIN_POINTER_HEIGHT;
  var pinHalfHeight = mapPinMainElement.getBoundingClientRect().height / 2;
  var pinHalfWidth = mapPinMainElement.getBoundingClientRect().width / 2;
  var startCoords = {};

  var setAddressInputValue = function () {
    var locationX = Math.round(mapPinMainElement.getBoundingClientRect().left + pinHalfWidth);
    var locationY = Math.round(mapPinMainElement.getBoundingClientRect().top + pageYOffset + pinHalfHeight);

    addressInputElement.value = locationX + ', ' + locationY;
  };

  var setPinStartCoords = function () {
    startCoords = {
      x: window.utils.getBlockLeftPosition(mapPinMainElement) + pageXOffset + pinHalfWidth,
      y: window.utils.getBlockTopPosition(mapPinMainElement) + pageYOffset + pinTotalHeight
    };
  };

  var changeAddressInputValue = function () {
    addressInputElement.value = startCoords.x + ', ' + startCoords.y;
  };

  var changePinPosition = function (evt) {
    var PIN_MOVE_UP_LIMIT = 130;
    var PIN_MOVE_DOWN_LIMIT = 630;

    var pinLimits = {
      top: PIN_MOVE_UP_LIMIT + pinTotalHeight,
      bottom: PIN_MOVE_DOWN_LIMIT + pinTotalHeight,
      left: window.utils.getBlockLeftPosition(mapElement),
      right: window.utils.getBlockRightPosition(mapElement)
    };

    if (evt.pageY >= pinLimits.top && evt.pageY <= pinLimits.bottom && evt.pageX >= pinLimits.left && evt.pageX <= pinLimits.right) {
      var shift = {
        x: startCoords.x - evt.pageX,
        y: startCoords.y - evt.pageY
      };

      startCoords = new window.Coords(evt);

      mapPinMainElement.style.top = mapPinMainElement.offsetTop - shift.y + 'px';
      mapPinMainElement.style.left = mapPinMainElement.offsetLeft - shift.x + 'px';
    }
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    changePinPosition(moveEvt);
    changeAddressInputValue();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onErrorLoadData = function (errorMessage) {
    window.popupMessages.showError('#error', errorMessage);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onSuccessLoadData = function (ads) {
    window.variables.usersAds = ads;
    window.addOffersPins(window.variables.usersAds);
    mapElement.classList.remove('map--faded');
    window.utils.removeAttributeToElementsInCollection(window.variables.mapFiltersSelectsElements, 'disabled');
    window.utils.removeAttributeToElement(window.variables.mapFiltersfieldsetElement, 'disabled');
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

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

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    setPinStartCoords();
    window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
  });

  setAddressInputValue();
  window.variables.mapElement.addEventListener('click', onMapClick);
})();

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';


xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
xhr.send();

var addressInputElement = document.querySelector('#address');
var mapPinMainElement = window.variables.mapPinsElement.querySelector('.map__pin--main');
var mapElement = document.querySelector('.map');

var fff = mapElement.querySelectorAll('.map__pin');
