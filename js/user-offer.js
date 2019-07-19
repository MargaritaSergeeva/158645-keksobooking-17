
'use strict';

(function () {
  window.UserOffer = function (ad) {
    this.avatar = ad.author.avatar;
    this.title = ad.offer.title;
    this.address = ad.offer.address;
    this.price = ad.offer.price;
    this.type = ad.offer.type;
    this.rooms = ad.offer.rooms;
    this.guests = ad.offer.guests;
    this.checkin = ad.offer.checkin;
    this.checkout = ad.offer.checkout;
    this.features = ad.offer.features;
    this.description = ad.offer.description;
    this.photos = ad.offer.photos;
  };
})();
