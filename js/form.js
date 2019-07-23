'use strict';

(function () {
  var formSubmitButtonElement = window.variables.formElement.querySelector('.ad-form__submit');
  var requiredInputsCollectionElements = window.variables.formElement.querySelectorAll('input[required]');

  var onSuccessSendForm = function () {
    window.popupMessages.showSuccess('#success');
    window.mode.sleep();
  };

  var onErrorSendForm = function () {
    window.popupMessages.showError('#error');
  };


  formSubmitButtonElement.addEventListener('click', function (evt) {
    window.validateForm(requiredInputsCollectionElements);

    if (window.validateForm(requiredInputsCollectionElements)) {
      evt.preventDefault();
      window.backend.save(window.constants.Url.POST, new FormData(window.variables.formElement), onSuccessSendForm, onErrorSendForm);
    }
  });

  window.variables.formElement.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.mode.sleep();
  });

  window.variables.addressInputElement.setAttribute('readonly', 'readonly');
  window.utils.setAddressInputValue();
  window.utils.addAttributeToElementsInCollection(window.variables.formFieldsetsCollectionElements, 'disabled');
})();
