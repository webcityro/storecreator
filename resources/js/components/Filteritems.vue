<template>
   <b-container class="filter-items">
      <b-btn v-b-toggle.filterform class="filtersBtn">{{ trans('generic.filters') }}</b-btn>
      <b-collapse id="filterform">
         <b-card @input="currentField = $event.target.id">
            <b-row>
               <b-col>
                  <label for="id">{{ trans('generic.id') }}</label>
               </b-col>
               <b-col v-for="(label, field) in fields" :key="'label_'+field">
                  <label :for="field">{{ label.label || label }}</label>
               </b-col>
            </b-row>
            <b-row>
               <b-col :key="'input_id'">
                  <i class="fas fa-spinner loadingField" v-if="form.submiting && currentField == 'id'"></i>
                  <input type="text" id="id" class="form-control" v-model="form.id">
               </b-col>
               <b-col v-for="(value, field) in fields" :key="'input_'+field">
                  <i class="fas fa-spinner loadingField" v-if="form.submiting && currentField == field && typeof value === 'string'"></i>
                  <i class="fas fa-spinner loadingField" v-if="form.submiting && currentField == field && typeof value === 'object'" style="margin-right: 2rem"></i>
                  <input type="text" v-if="typeof value === 'string'" :id="field" class="form-control" v-model="form[field]">
                  <select v-else-if="value.type === 'select'" :id="field" class="form-control" v-model="form[field]">
                     <option></option>
                     <option v-for="(label, key) in value.options" :value="key">{{ label }}</option>
                  </select>
               </b-col>
            </b-row>

            <b-row><b-col><hr></b-col></b-row></b-row>

            <b-row>
               <b-col>
                  <label for="sortBy">{{ trans('formLabels.sortBy') }}</label>
                  <i class="fas fa-spinner loadingField" v-if="form.submiting && currentField == 'sortBy'" style="margin-right: 2rem"></i>
                  <select id="sortBy" class="form-control" v-model="form.sortBy">
                     <option></option>
                     <option value="id">{{ trans('generic.id') }}</option>
                     <option v-for="(label, field) in fields" :key="'sortBy_'+field" :value="field">{{ label.label || label }}</option>
                  </select>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="radio" id="sortDirAsc" name="sortDir" value="ASC"  v-model="form.sortDir">
                     <label class="form-check-label" for="sortDirAsc">{{ trans('formLabels.sortAsc') }}</label>
                  </div>
                  <div class="form-check form-check-inline">
                     <input class="form-check-input" type="radio" id="sortDirDesc" name="sortDir" value="DESC"  v-model="form.sortDir">
                     <label class="form-check-label" for="sortDirDesc">{{ trans('formLabels.sortDesc') }}</label>
                  </div>
                  <i class="fas fa-spinner ml-2" v-if="form.submiting && (currentField == 'sortDirAsc' || currentField == 'sortDirDesc')"></i>
               </b-col>

               <b-col>
                  <label for="perPage">{{ trans('formLabels.perPage') }}</label>
                  <i class="fas fa-spinner loadingField" v-if="form.submiting && currentField == 'perPage'" style="margin-right: 2rem"></i>
                  <input type="number" id="perPage" class="form-control" v-model="form.paginate">
               </b-col>
            </b-row>
            <b-row>
               <b-col class="text-right">
                  <i class="fas fa-spinner" v-if="form.submiting && currentField == ''"></i>&nbsp;&nbsp;
                  <a href="#" @click.prevent="clear()">{{ trans('generic.clearFilters') }}</a>
               </b-col>
            </b-row>
         </b-card>
      </b-collapse>
   </b-container>
</template>

<style>
   .filtersBtn {
      color: #212529;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-bottom: none;
      background: #fff;
   }

   .filtersBtn:focus {
      box-shadow: none;
   }

   #filterform .loadingField {
      display: block;
      margin: 0 0.6rem -1.6rem auto;
      width: 12px;
      height: 12px;
   }

   #filterform .loadingField + input[type="text"], #filterform .loadingField + select {
      padding-right: 1.9rem;
   }
</style>

<script>
   export default {
      props: {
         fields: { required: true, type: Object, default: {} },
         url: { default: window.location.href }
      },

      data() {
         return {
            postFields: { id: '' },
            form: null,
            currentField: '',
            pivots: {}
         }
      },

      created() {
         for (let field in this.fields) {
            this.postFields[field] = '';

            if (typeof this.fields[field].pivot === 'string') {
               this.pivots[field] = this.fields[field].pivot;
            }
         }

         this.form = new Form({
            ...this.postFields,
            sortBy: '',
            sortDir: '',
            paginate: 10,
            pivots: JSON.stringify(this.pivots)
         });

         this.form.url = this.url;
         this.form.clear = false;
         this.form.skipEmpty = true;

         for (let field in this.form.originalData) {
            this.$watch('form.'+field, (newValue, oldValue) => {
               if (newValue != oldValue) {
                  if (field == 'sortBy') {
                     this.changeSort();
                     return;
                  }

                  if (field == 'paginate') {
                     window.Event.emit('scChangePaginate', newValue);
                  }
                  this.search();
               }
            });
         }

         this.Event.on('scItemsPerPage', itemsPerPage => {
            this.form.paginate = itemsPerPage;
         });

         this.Event.on('scPaginationChanged', page => {
            this.form.url = this.url+'?page='+page;
            this.search();
         });

         this.Event.on('scFilteredItemsRefresh', () => {
            this.search();
         });
      },

      mounted() {
         window.Event.emit('scChangePaginate', this.form.paginate);
      },

      methods: {
         search() {
            this.form.get().then(data => {
               Event.emit('scFilteredItems', data);
            });
         },

         changeSort() {
            if (this.form.sortDir) {
               this.search();
               return;
            }

            this.form.sortDir = 'DESC';
         },

         clear() {
            this.currentField = '';
            this.form.clear = true;
            this.form.reset();
            this.form.clear = false;
            this.search();
         }
      }
   }
</script>
