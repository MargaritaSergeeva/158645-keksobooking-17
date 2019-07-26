'use strict';

(function () {
  window.popupMessages = {
    showError: function (idTemplate, errorMessage) {
      var errorTemplateElement = document.querySelector(idTemplate).content.querySelector('.error');
      var errorModalElement = errorTemplateElement.cloneNode(true);
      var errorTextElement = errorModalElement.querySelector('.error__message');

      var onErrorModalEscPress = function (evt) {
        if (window.keyboard.isEscPressed(evt)) {
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorModalEscPress);
        }
      };

      var onErrorModalClick = function (evt) {
        if (evt.target.classList.contains('error')) {
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorModalEscPress);
        }

        if (evt.target.classList.contains('error__button')) {
          evt.preventDefault();
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorModalEscPress);
        }
      };

      if (errorMessage) {
        errorTextElement.textContent = errorMessage;
      }

      window.variables.mainElement.appendChild(errorModalElement);
      document.addEventListener('keydown', onErrorModalEscPress);
      errorModalElement.addEventListener('click', onErrorModalClick);
    },

    showSuccess: function (idTemplate) {
      var successTemplateElement = document.querySelector(idTemplate).content.querySelector('.success');
      var successModalElement = successTemplateElement.cloneNode(true);

      var onSuccessModalEscPress = function (evt) {
        if (window.keyboard.isEscPressed(evt)) {
          window.mode.sleep();
          window.variables.mainElement.removeChild(successModalElement);
          document.removeEventListener('keydown', onSuccessModalEscPress);
        }
      };

      var onSuccessModalClick = function (evt) {
        if (evt.target.className === 'success') {
          evt.preventDefault();
          window.mode.sleep();
          window.variables.mainElement.removeChild(successModalElement);
          document.removeEventListener('keydown', onSuccessModalEscPress);
        }
      };

      window.variables.mainElement.appendChild(successModalElement);
      document.addEventListener('keydown', onSuccessModalEscPress);
      successModalElement.addEventListener('click', onSuccessModalClick);
    }
  };
})();
