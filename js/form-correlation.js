'use strict';

(function () {
  var MAX_ROOMS_COUNT = 100;

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


  window.setInputCorrelation = function (element) {
    var correlatedElement = window.variable.formElement.querySelector('#' + correlationInputsMap[element.id]);
    var correlatedOptionCollectionElements = correlatedElement.querySelectorAll('option');
    var selectedValue = element.querySelector('option:checked').value;

    if (element.id === 'type') {
      correlatedElement.min = minPriceMap[selectedValue];
      correlatedElement.placeholder = minPriceMap[selectedValue];
    }

    if (element.id === 'timein' || element.id === 'timeout') {
      correlatedOptionCollectionElements.forEach(function (it) {
        if (it.value === selectedValue) {
          window.util.addAttributeToElement(it, 'selected');
        } else {
          window.util.removeAttributeFromElement(it, 'selected');
        }
      });
    }

    if (element.id === 'room_number') {
      var notForGuestsOptionElement = correlatedElement.querySelector('option[value="0"]');

      window.util.addAttributeToElementsInCollection(correlatedOptionCollectionElements, 'disabled');

      if (+selectedValue !== MAX_ROOMS_COUNT) {
        correlatedOptionCollectionElements.forEach(function (it) {
          if (+it.value !== 0 && +it.value <= +selectedValue) {
            window.util.removeAttributeFromElement(it, 'disabled');
            if (it.value === selectedValue) {
              window.util.removeAttributeFromElementsInCollection(correlatedOptionCollectionElements, 'selected');
              window.util.addAttributeToElement(it, 'selected');
            }
          }
        });
      } else {
        window.util.removeAttributeFromElement(notForGuestsOptionElement, 'disabled');
        window.util.addAttributeToElement(notForGuestsOptionElement, 'selected');
      }
    }
  };

  var addChangeListener = function (element) {
    element.addEventListener('change', function () {
      window.setInputCorrelation(element);
    });
  };

  window.variable.formSelects.forEach(function (it) {
    window.setInputCorrelation(it);
    addChangeListener(it);
  });
})();
