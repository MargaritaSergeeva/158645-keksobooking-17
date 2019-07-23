'use strict';

(function () {
  window.popupMessages = {
    showError: function (idTemplate, errorMessage) {
      var errorTemplateElement = document.querySelector(idTemplate).content.querySelector('.error');
      var errorModalElement = errorTemplateElement.cloneNode(true);
      var errorTextElement = errorModalElement.querySelector('.error__message');

      var onErrorEscPress = function (evt) {
        if (window.keyboard.isEscPressed(evt)) {
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      };

      if (errorMessage) {
        errorTextElement.textContent = errorMessage;
      }

      window.variables.mainElement.appendChild(errorModalElement);
      document.addEventListener('keydown', onErrorEscPress);

      errorModalElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('error')) {
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorEscPress);
        }

        if (evt.target.classList.contains('error__button')) {
          evt.preventDefault();
          window.variables.mainElement.removeChild(errorModalElement);
          document.removeEventListener('keydown', onErrorEscPress);
        }
      });
    },

    showSuccess: function (idTemplate) {
      var successTemplateElement = document.querySelector(idTemplate).content.querySelector('.success');
      var successModalElement = successTemplateElement.cloneNode(true);

      var onSuccessEscPress = function (evt) {
        if (window.keyboard.isEscPressed(evt)) {
          window.variables.mainElement.removeChild(successModalElement);
          document.removeEventListener('keydown', onSuccessEscPress);
        }
      };

      window.variables.mainElement.appendChild(successModalElement);
      document.addEventListener('keydown', onSuccessEscPress);

      successModalElement.addEventListener('click', function (evt) {
        if (evt.target.className === 'success') {
          evt.preventDefault();
          window.variables.mainElement.removeChild(successModalElement);
          document.removeEventListener('keydown', onSuccessEscPress);
        }

        if (evt.target.classList.contains('success__button')) {
          evt.preventDefault();
          window.variables.mainElement.removeChild(successModalElement);
          document.removeEventListener('keydown', onSuccessEscPress);
        }
      });
    }
  };
})();
