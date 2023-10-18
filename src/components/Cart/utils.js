/**
 * Class definition
 * @property {object} cart - Object that represents the content of cart attribute in storage
 * @property {int} time_for_booking - The time for booking in seconds that we get from API
 */
class Cart {
   cart = {};

   constructor() {
      const cart_raw = localStorage.getItem('cart');
      if (cart_raw !== null) {
         this.cart = JSON.parse(cart_raw);
      }
   }

   /**
    *
    * @param {int} vehicle_id
    * @param {object} booking_info
    * @param {object} booking_info.product - Object with product info
    * @param {string} booking_info.pickup_location
    * @param {string} booking_info.return_location
    * @param {string} booking_info.dates
    * @param {object} booking_info.details - Object representing order details
    * @param {int} booking_info.creation_timestamp
    * @param {int} booking_info.expiration_timestamp
    */
   addBooking(booking_id, booking_info) {
      booking_id = Number(booking_id);
      if (isNaN(booking_id)) return false;

      this.cart[booking_id] = booking_info;
      this.commitChanges();
   }

   deleteBooking(booking_id) {
      delete this.cart[booking_id];
      this.commitChanges();
   }

   /**
    * If no bookings in cart return true.
    * @return {boolean}
    */
   cartIsEmpty() {
      return Object.keys(this.cart).length === 0;
   }

   /**
    * Delete all expired booking and check if booking exists in cart
    * @param booking_id
    * @return {boolean}
    */
   bookingExists(booking_id) {
      this.deleteExpiredBookings();
      return this.cart.hasOwnProperty(booking_id);
   }

   /**
    * Look through all bookings in cart and delete expired
    */
   deleteExpiredBookings() {
      for (const booking_id in this.cart) {
         if (this.bookingIsExpired(booking_id)) {
            delete this.cart[booking_id];
         }
      }
      this.commitChanges()
   }

   /**
    * Check if booking in cart is expired
    * @param booking_id
    * @return {boolean}
    */
   bookingIsExpired(booking_id) {
      return Date.now() > this.cart[booking_id].expiration_timestamp;
   }

   commitChanges() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
   }
}

export default Cart;