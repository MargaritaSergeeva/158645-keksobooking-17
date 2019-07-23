'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;
  var startCoords = {};

  var setPinStartCoords = function () {
    startCoords = {
      x: Math.round(window.utils.getBlockLeftPosition(window.variables.mapMainPinElement) + pageXOffset + window.variables.pinHalfWidth),
      y: Math.round(window.utils.getBlockTopPosition(window.variables.mapMainPinElement) + pageYOffset + window.variables.pinHalfHeight)
    };
  };

  var changeAddressInputValue = function () {
    var addressCoordX = startCoords.x;
    var addressCoordY = Math.round(startCoords.y + window.variables.pinHalfHeight + PIN_POINTER_HEIGHT);

    window.variables.addressInputElement.value = addressCoordX + ', ' + addressCoordY;
  };

  var changePinPosition = function (evt) {
    var PIN_MOVE_UP_LIMIT = 130;
    var PIN_MOVE_DOWN_LIMIT = 630;

    var pinLimits = {
      top: PIN_MOVE_UP_LIMIT,
      bottom: PIN_MOVE_DOWN_LIMIT,
      left: window.utils.getBlockLeftPosition(window.variables.mapElement),
      right: window.utils.getBlockRightPosition(window.variables.mapElement)
    };

    if (evt.pageY >= pinLimits.top &&
        evt.pageY <= pinLimits.bottom &&
        evt.pageX >= pinLimits.left &&
        evt.pageX <= pinLimits.right) {

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
})();
