<script>
import baseInput from "./baseInput";
export default {
   mixins: [baseInput],

   data() {
      return {
         // selected: this.fieldValue
      };
   },

   methods: {
      isSelected(value) {
         return this.fieldValue.includes(value);
      }
   }
}
</script>
