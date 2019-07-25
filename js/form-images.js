'use strict';

(function () {
  var avatarInputElement = window.variables.formElement.querySelector('#avatar');
  var imageInputElement = window.variables.formElement.querySelector('#images');

  var onAvatarInputChange = function () {
    window.loadImage(avatarInputElement, window.variables.formAvatarPreviewElement.querySelector('img'));
  };

  var onImageInputChange = function () {
    var formImageTemplateElement = document.querySelector('#form-img').content.querySelector('.ad-form__photo-img');
    var formImageElement = formImageTemplateElement.cloneNode(true);
    var formimageElements = window.variables.formElement.querySelectorAll('.ad-form__photo-img');

    if (formimageElements.length === 0) {
      window.variables.formImageBlockElement.appendChild(formImageElement);
      window.loadImage(imageInputElement, formImageElement);
    } else {
      var imageBlockCloneElement = window.variables.formImageBlockElement.cloneNode(true);

      window.variables.formImageBlockContainerElement.appendChild(imageBlockCloneElement);
      imageBlockCloneElement.id = 'photo-' + (+formimageElements.length + 1);
      window.loadImage(imageInputElement, imageBlockCloneElement.querySelector('.ad-form__photo-img'));
    }

    window.utils.resetInputValue(imageInputElement);
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
      var movedPhotoElement = window.variables.formImageBlockContainerElement.querySelector('#' + idMovedPhoto);
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

  avatarInputElement.addEventListener('change', onAvatarInputChange);
  imageInputElement.addEventListener('change', onImageInputChange);
  window.variables.formImageBlockContainerElement.addEventListener('dragstart', onFormImageContainerDragStart);
  window.variables.formImageBlockContainerElement.addEventListener('dragover', onFormImageContainerDragOver);
  window.variables.formImageBlockContainerElement.addEventListener('dragleave', onFormImageContainerDragLeave);
  window.variables.formImageBlockContainerElement.addEventListener('drop', onFormImageContainerDrop);
})();
