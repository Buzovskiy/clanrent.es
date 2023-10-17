/**
 * Class definition
 * @property {object} cart - Object that represents the content of cart attribute in storage
 * @property {int} time_for_booking - The time for booking in seconds that we get from API
 */
class Cart {
   cart = {};
   time_for_booking;

   constructor() {
      const cart_raw = localStorage.getItem('cart');
      if (cart_raw !== null) {
         this.cart = JSON.parse(cart_raw);
      }
   }

   /**
    *
    * @param vehicle_id
    * @param preOrderInfo
    */
   addPreorder(vehicle_id, preOrderInfo){

   }

   removeOldBookings(time_for_booking) {
      time_for_booking = Number(time_for_booking);
      if (isNaN(time_for_booking))
         return false;
      for (const vehicle_id in this.cart) {
         const order = this.cart[vehicle_id].order;
         const time_end = order.creation_timestamp + time_for_booking * 1000;
         if (Date.now() > time_end) {
            delete this.cart[vehicle_id];
         }
      }
      this.updateCart();
   }

   updateCart(){
      localStorage.setItem('cart', JSON.stringify(this.cart));
   }
}

export default Cart;