'use strict';

(function () {
  var formSubmitButtonElement = window.variables.formElement.querySelector('.ad-form__submit');
  var formResetButtonElement = window.variables.formElement.querySelector('.ad-form__reset');
  var requiredInputsCollectionElements = window.variables.formElement.querySelectorAll('input[required]');

  window.variables.addressInputElement.setAttribute('readonly', 'readonly');
  window.utils.setAddressInputValue();
  window.utils.addAttributeToElementsInCollection(window.variables.formFieldsetsCollectionElements, 'disabled');

  formSubmitButtonElement.addEventListener('click', function () {
    requiredInputsCollectionElements.forEach(function (it) {
      if (it.checkValidity() === false) {
        var inputCustomValidation = new window.CustomValidation();
        inputCustomValidation.invalidities = [];
        inputCustomValidation.checkValidity(it);
        var customValidityMessage = inputCustomValidation.getInvalidities();
        it.setCustomValidity(customValidityMessage);
      }
    });
  });

  formResetButtonElement.addEventListener('click', function () {
    window.mode.sleep();
  });
})();
