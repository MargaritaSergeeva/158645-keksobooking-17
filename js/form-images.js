'use strict';

(function () {
  var formAvatarInputElement = window.variable.formElement.querySelector('#avatar');
  var formImageInputElement = window.variable.formElement.querySelector('#images');

  var onAvatarInputChange = function () {
    window.loadImage(formAvatarInputElement, window.variable.formAvatarPreviewElement.querySelector('img'));
  };

  var onImageInputChange = function () {
    var formImageTemplateElement = document.querySelector('#form-img').content.querySelector('.ad-form__photo-img');
    var formImageElement = formImageTemplateElement.cloneNode(true);
    var formImageCollectionElements = window.variable.formElement.querySelectorAll('.ad-form__photo-img');
    var formImageBlockElement = window.variable.formElement.querySelector('.ad-form__photo');

    if (!formImageCollectionElements.length) {
      formImageBlockElement.appendChild(formImageElement);
      window.loadImage(formImageInputElement, formImageElement);
    } else {
      var imageBlockCloneElement = formImageBlockElement.cloneNode(true);

      window.variable.formImageBlockContainerElement.appendChild(imageBlockCloneElement);
      imageBlockCloneElement.id = 'photo-' + (+formImageCollectionElements.length + 1);
      window.loadImage(formImageInputElement, imageBlockCloneElement.querySelector('.ad-form__photo-img'));
    }

    window.util.resetInputValue(formImageInputElement);
  };

  var onFormImageContainerDragStart = function (evt) {
    var movedPhoto = evt.target.parentNode;

    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text', movedPhoto.id);
    evt.dataTransfer.setDragImage(movedPhoto, 0, 0);
  };

  var onFormImageContainerDragOver = function (evt) {
    var targetPhoto = evt.target.parentNode;

    evt.preventDefault();

    if (targetPhoto.classList.contains('ad-form__photo')) {
      evt.target.style.outline = '1px solid #ff5635';
    }
  };

  var onFormImageContainerDragLeave = function (evt) {
    var targetPhoto = evt.target.parentNode;

    evt.preventDefault();

    if (targetPhoto.classList.contains('ad-form__photo')) {
      evt.target.style.outline = '';
    }
  };

  var onFormImageContainerDrop = function (evt) {
    var targetPhoto = evt.target.parentNode;

    evt.preventDefault();
    evt.target.style.outline = '';

    if (targetPhoto.classList.contains('ad-form__photo')) {
      var idMovedPhoto = evt.dataTransfer.getData('text');
      var movedPhotoElement = window.variable.formImageBlockContainerElement.querySelector('#' + idMovedPhoto);
      var container = targetPhoto.parentNode;
      var indexTarget = Array.from(container.childNodes).indexOf(targetPhoto);
      var indexMovedPhoto = Array.from(container.childNodes).indexOf(movedPhotoElement);

      if (indexMovedPhoto > indexTarget) {
        container.removeChild(movedPhotoElement);
        container.insertBefore(movedPhotoElement, container.childNodes[indexTarget]);
        container.removeChild(targetPhoto);
        container.insertBefore(targetPhoto, container.childNodes[indexMovedPhoto]);
      } else {
        container.removeChild(targetPhoto);
        container.insertBefore(targetPhoto, container.childNodes[indexMovedPhoto]);
        container.removeChild(movedPhotoElement);
        container.insertBefore(movedPhotoElement, container.childNodes[indexTarget]);
      }
    }
  };

  formAvatarInputElement.addEventListener('change', onAvatarInputChange);
  formImageInputElement.addEventListener('change', onImageInputChange);
  window.variable.formImageBlockContainerElement.addEventListener('dragstart', onFormImageContainerDragStart);
  window.variable.formImageBlockContainerElement.addEventListener('dragover', onFormImageContainerDragOver);
  window.variable.formImageBlockContainerElement.addEventListener('dragleave', onFormImageContainerDragLeave);
  window.variable.formImageBlockContainerElement.addEventListener('drop', onFormImageContainerDrop);
})();
