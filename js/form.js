'use strict';

(function () {
  var formSubmitButtonElement = window.variable.formElement.querySelector('.ad-form__submit');
  var requiredInputsCollectionElements = window.variable.formElement.querySelectorAll('input[required]');

  var onSuccessSendForm = function () {
    window.popupMessage.showSuccess('#success');
  };

  var onErrorSendForm = function () {
    window.popupMessage.showError('#error');
  };

  var onSubmitButtonClick = function (evt) {
    window.validateForm(requiredInputsCollectionElements);

    if (window.validateForm(requiredInputsCollectionElements)) {
      evt.preventDefault();
      window.backend.save(window.constant.Url.POST, new FormData(window.variable.formElement), onSuccessSendForm, onErrorSendForm);
    }
  };


  formSubmitButtonElement.addEventListener('click', onSubmitButtonClick);
  window.variable.formElement.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.mode.sleep();
  });

  window.variable.addressInputElement.setAttribute('readonly', 'readonly');
  window.util.setAddressInputValue();
  window.util.addAttributeToElementsInCollection(window.variable.formFieldsetsCollectionElements, 'disabled');
})();
