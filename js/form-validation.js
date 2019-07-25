'use strict';

(function () {
  window.validateForm = function (inputs) {
    var isValidity = true;

    inputs.forEach(function (it) {
      it.setCustomValidity('');

      if (it.checkValidity() === false) {
        isValidity = false;

        var inputCustomValidation = new window.CustomValidation();
        inputCustomValidation.invalidities = [];
        inputCustomValidation.checkValidity(it);
        var customValidityMessage = inputCustomValidation.getInvalidities();
        it.setCustomValidity(customValidityMessage);

        it.style.borderColor = '#db1a27';
        it.style.borderWidth = '2px';
      } else {
        it.style.borderColor = '#d9d9d3';
        it.style.borderWidth = '1px';
      }
    });

    return isValidity;
  };
})();
