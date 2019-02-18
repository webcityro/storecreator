export default {
   methods: {
      ucFirst(str) {
         return str[0].toUpperCase()+str.substr(1);
      },

      displaySex(sex) {
         return trans('formLabels.sex'+this.ucFirst(sex));
      },

      displayDate(date) {
         if (!date) { return '-'; }

         const newDate = new Date(date);
         return newDate.getDay()+'.'+newDate.getMonth()+'.'+newDate.getFullYear()+' - '+newDate.getHours()+':'+newDate.getMinutes();
      }
   },

   filters: {
      ucFirst(str) {
         return str[0].toUpperCase()+str.substr(1);
      },

      displaySex(sex) {
         return trans('formLabels.sex'+sex[0].toUpperCase()+sex.substr(1));
      },

      displayDate(date) {
         if (!date) { return '-'; }

         const newDate = new Date(date);
         return newDate.getDay()+'.'+newDate.getMonth()+'.'+newDate.getFullYear()+' - '+newDate.getHours()+':'+newDate.getMinutes();
      }
   }
};