'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;
  var PIN_MOVE_UP_LIMIT = 130;
  var PIN_MOVE_DOWN_LIMIT = 630;

  var pinHeightFromCenterToBottom = Math.round(window.variables.pinHalfHeight + PIN_POINTER_HEIGHT);
  var startCoords = {};


  var setMainPinStartCoords = function () {
    startCoords = {
      x: Math.round(window.utils.getBlockLeftPosition(window.variables.mapMainPinElement) + pageXOffset + window.variables.pinHalfWidth),
      y: Math.round(window.utils.getBlockTopPosition(window.variables.mapMainPinElement) + pageYOffset + window.variables.pinHalfHeight)
    };
  };

  var changeAddressInputValue = function () {
    var addressCoordX = startCoords.x;
    var addressCoordY = Math.round(startCoords.y + pinHeightFromCenterToBottom);

    window.variables.addressInputElement.value = addressCoordX + ', ' + addressCoordY;
  };

  var changeMainPinPosition = function (evt) {
    var pinLimit = {
      top: PIN_MOVE_UP_LIMIT - pinHeightFromCenterToBottom,
      bottom: PIN_MOVE_DOWN_LIMIT - pinHeightFromCenterToBottom,
      left: window.utils.getBlockLeftPosition(window.variables.mapElement),
      right: window.utils.getBlockRightPosition(window.variables.mapElement)
    };

    if (evt.pageY >= pinLimit.top &&
        evt.pageY <= pinLimit.bottom &&
        evt.pageX >= pinLimit.left &&
        evt.pageX <= pinLimit.right) {

      var shift = {
        x: startCoords.x - evt.pageX,
        y: startCoords.y - evt.pageY
      };

      startCoords = new window.Coords(evt);

      window.variables.mapMainPinElement.style.top = window.variables.mapMainPinElement.offsetTop - shift.y + 'px';
      window.variables.mapMainPinElement.style.left = window.variables.mapMainPinElement.offsetLeft - shift.x + 'px';
    }
  };

  var onMainPinMouseDown = function (downEvt) {
    downEvt.preventDefault();
    setMainPinStartCoords();
    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var onMainPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    changeMainPinPosition(moveEvt);
    changeAddressInputValue();

    if (window.variables.mapElement.classList.contains('map--faded')) {
      window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
      window.mode.activeMapAndForm();
    }
  };

  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var onMainPinEnterPress = function (pressEvt) {
    if (window.keyboard.isEnterPressed(pressEvt) && window.variables.mapElement.classList.contains('map--faded')) {
      window.backend.load(window.constants.Url.GET, onSuccessLoadData, onErrorLoadData);
      window.mode.activeMapAndForm();
    }
  };

  var onErrorLoadData = function (errorMessage) {
    window.popupMessages.showError('#error', errorMessage);
  };

  var onSuccessLoadData = function (ads) {
    window.variables.usersAds = ads;
    window.addOffersPins(window.variables.usersAds);
    window.mode.activeFilter();
  };


  window.variables.mapMainPinElement.addEventListener('mousedown', onMainPinMouseDown);

  window.variables.mapMainPinElement.addEventListener('focus', function () {
    document.addEventListener('keydown', onMainPinEnterPress);
  });

  window.variables.mapMainPinElement.addEventListener('blur', function () {
    document.removeEventListener('keydown', onMainPinEnterPress);
  });
})();
