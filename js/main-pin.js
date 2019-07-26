'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 16;
  var PIN_MOVE_UP_LIMIT = 130;
  var PIN_MOVE_DOWN_LIMIT = 630;

  var pinHeightFromCenterToBottom = Math.round(window.variable.pinHalfHeight + PIN_POINTER_HEIGHT);
  var startCoords = {};


  var setMainPinStartCoords = function () {
    startCoords = {
      x: window.util.getBlockLeftPosition(window.variable.mapMainPinElement) + pageXOffset + window.variable.pinHalfWidth,
      y: window.util.getBlockTopPosition(window.variable.mapMainPinElement) + pageYOffset + window.variable.pinHalfHeight
    };
  };

  var changeAddressInputValue = function () {
    var addressCoordX = Math.round(startCoords.x);
    var addressCoordY = Math.round(startCoords.y + pinHeightFromCenterToBottom);

    window.variable.addressInputElement.value = addressCoordX + ', ' + addressCoordY;
  };

  var changeMainPinPosition = function (evt) {
    var pinLimit = {
      top: PIN_MOVE_UP_LIMIT - pinHeightFromCenterToBottom,
      bottom: PIN_MOVE_DOWN_LIMIT - pinHeightFromCenterToBottom,
      left: window.util.getBlockLeftPosition(window.variable.mapElement),
      right: window.util.getBlockRightPosition(window.variable.mapElement)
    };

    if (evt.pageY >= pinLimit.top &&
        evt.pageY <= pinLimit.bottom &&
        evt.pageX >= pinLimit.left &&
        evt.pageX <= pinLimit.right) {

      var shift = {
        x: startCoords.x - evt.pageX,
        y: startCoords.y - evt.pageY
      };

      startCoords = new window.Coord(evt);

      window.variable.mapMainPinElement.style.top = window.variable.mapMainPinElement.offsetTop - shift.y + 'px';
      window.variable.mapMainPinElement.style.left = window.variable.mapMainPinElement.offsetLeft - shift.x + 'px';
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

    if (window.variable.mapElement.classList.contains('map--faded')) {
      window.backend.load(window.constant.Url.GET, onSuccessLoadData, onErrorLoadData);
      window.mode.activeMapAndForm();
    }
  };

  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  };

  var onMainPinEnterPress = function (pressEvt) {
    if (window.keyboard.isEnterPressed(pressEvt) && window.variable.mapElement.classList.contains('map--faded')) {
      window.backend.load(window.constant.Url.GET, onSuccessLoadData, onErrorLoadData);
      window.mode.activeMapAndForm();
    }
  };

  var onErrorLoadData = function (errorMessage) {
    window.popupMessage.showError('#error', errorMessage);
  };

  var onSuccessLoadData = function (ads) {
    window.variable.usersAds = ads;
    window.addOffersPins(window.variable.usersAds);
    window.mode.activeFilter();
  };


  window.variable.mapMainPinElement.addEventListener('mousedown', onMainPinMouseDown);

  window.variable.mapMainPinElement.addEventListener('focus', function () {
    document.addEventListener('keydown', onMainPinEnterPress);
  });

  window.variable.mapMainPinElement.addEventListener('blur', function () {
    document.removeEventListener('keydown', onMainPinEnterPress);
  });
})();
