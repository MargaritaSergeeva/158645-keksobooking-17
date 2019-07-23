'use strict';

(function () {
  var minPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var correlationInputsMap = {
    'type': 'price',
    'timein': 'timeout',
    'timeout': 'timein',
    'room_number': 'capacity'
  };


  window.setCorrelation = function (element) {
    var correlatedElement = window.variables.formElement.querySelector('#' + correlationInputsMap[element.id]);
    var correlatedOptionElements = correlatedElement.querySelectorAll('option');
    var selectedValue = element.querySelector('option:checked').value;

    if (element.id === 'type') {
      correlatedElement.min = minPriceMap[selectedValue];
      correlatedElement.placeholder = minPriceMap[selectedValue];
    }

    if (element.id === 'timein' || element.id === 'timeout') {
      correlatedOptionElements.forEach(function (it) {
        if (it.value === selectedValue) {
          it.selected = true;
        } else {
          it.selected = false;
        }
      });
    }

    if (element.id === 'room_number') {
      var MAX_ROOMS_COUNT = 100;
      var notForGuestsOptionElement = correlatedElement.querySelector('option[value="0"]');

      window.utils.addAttributeToElementsInCollection(correlatedOptionElements, 'disabled');

      if (+selectedValue !== MAX_ROOMS_COUNT) {
        correlatedOptionElements.forEach(function (it) {
          if (+it.value !== 0 && +it.value <= +selectedValue) {
            window.utils.removeAttributeFromElement(it, 'disabled');
            if (it.value === selectedValue) {
              window.utils.removeAttributeFromElementsInCollection(correlatedOptionElements, 'selected');
              it.selected = true;
            }
          }
        });
      } else {
        window.utils.removeAttributeFromElement(notForGuestsOptionElement, 'disabled');
        window.utils.addAttributeToElement(notForGuestsOptionElement, 'selected');
      }
    }
  };

  var addChangeListener = function (element) {
    element.addEventListener('change', function () {
      window.setCorrelation(element);
    });
  };

  for (var i = 0; i < window.variables.formSelects.length; i++) {
    window.setCorrelation(window.variables.formSelects[i]);
    addChangeListener(window.variables.formSelects[i]);
  }
})();
