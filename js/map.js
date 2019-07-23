'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;

  var pinTotalHeight = window.variables.mapMainPinElement.getBoundingClientRect().height + PIN_POINTER_HEIGHT;
  var startCoords = {};

  var setPinStartCoords = function () {
    startCoords = {
      x: window.utils.getBlockLeftPosition(window.variables.mapMainPinElement) + pageXOffset + window.variables.pinHalfWidth,
      y: window.utils.getBlockTopPosition(window.variables.mapMainPinElement) + pageYOffset + pinTotalHeight
    };
  };

  var changeAddressInputValue = function () {
    window.variables.addressInputElement.value = startCoords.x + ', ' + startCoords.y;
  };

  var changePinPosition = function (evt) {
    var PIN_MOVE_UP_LIMIT = 130;
    var PIN_MOVE_DOWN_LIMIT = 630;

    var pinLimits = {
      top: PIN_MOVE_UP_LIMIT + pinTotalHeight,
      bottom: PIN_MOVE_DOWN_LIMIT + pinTotalHeight,
      left: window.utils.getBlockLeftPosition(window.variables.mapElement),
      right: window.utils.getBlockRightPosition(window.variables.mapElement)
    };

    if (evt.pageY >= pinLimits.top && evt.pageY <= pinLimits.bottom && evt.pageX >= pinLimits.left && evt.pageX <= pinLimits.right) {
      var shift = {
        x: startCoords.x - evt.pageX,
        y: startCoords.y - evt.pageY
      };

      startCoords = new window.Coords(evt);

      window.variables.mapMainPinElement.style.top = window.variables.mapMainPinElement.offsetTop - shift.y + 'px';
      window.variables.mapMainPinElement.style.left = window.variables.mapMainPinElement.offsetLeft - shift.x + 'px';
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
    window.mode.active();
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

  window.variables.mapMainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    setPinStartCoords();

    if (window.variables.mapElement.classList.contains('map--faded')) {
      window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
    } else {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  window.variables.mapElement.addEventListener('click', onMapClick);
})();
