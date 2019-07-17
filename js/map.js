'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = window.variables.mapPinsElement.querySelector('.map__pin--main');
  var addressInputElement = document.querySelector('#address');
  var pinTotalHeight = mapPinMainElement.getBoundingClientRect().height + PIN_POINTER_HEIGHT;
  var pinHalfWidth = mapPinMainElement.getBoundingClientRect().width / 2;
  var startCoords = {};

  var onErrorLoadData = function (errorMessage) {
    window.popupMessages.showError('#error', errorMessage);
  };

  var onSuccessLoadData = function (ads) {
    window.variables.usersAds = ads;
    window.addOffersPins(window.variables.usersAds);
  };

  var setAddressInputValue = function () {
    var locationX = Math.round(mapPinMainElement.getBoundingClientRect().left + pinHalfWidth);
    var locationY = Math.round(mapPinMainElement.getBoundingClientRect().top + pageYOffset + pinTotalHeight);

    addressInputElement.value = locationX + ', ' + locationY;
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

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: window.utils.getBlockLeftPosition(mapPinMainElement) + pageXOffset + pinHalfWidth,
      y: window.utils.getBlockTopPosition(mapPinMainElement) + pageYOffset + pinTotalHeight
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


    window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
    mapElement.classList.remove('map--faded');
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setAddressInputValue();
})();

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';


xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
xhr.send();

var addressInputElement = document.querySelector('#address');
var mapPinMainElement = window.variables.mapPinsElement.querySelector('.map__pin--main');
var mapElement = document.querySelector('.map');
