window.appFlash = new Vue({
   el: '#appFlash',

   data: {
      type: '',
      message: '',
      timeout: 10000,
      show: false
   },

   methods: {

   },

   watch: {
      show() {
         if (this.show) {
            setTimeout(() => this.show = false, this.timeout);
         }
      }
   },

   created() {
      window.Event.on('scFlashMessage', event => {
         this.type = event.type;
         this.message = event.message;
         this.timeout = event.timeout || this.timeout;
         this.show = true;
      });
   }
});

window.flashMessage = (type, msg, time) => {
   window.Event.emit('scFlashMessage', { message: msg, type: type, timeout: time });
}