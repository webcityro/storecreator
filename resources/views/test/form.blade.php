@extends('template.app')

@section('content')
<div class="container">
   <div class="row justify-content-center">
      <div class="col-md-8">
         <h1>Form test page</h1>

         <div id="formApp">
            <sc-form-wrap-panel title="Test form" :form="testForm" id="testForm" v-slot="{ form }" @submit="submit">
                  <sc-form-group id="name" label="{{ __('formLabels.name') }}" v-model="form.fields.name.value" :form="form" ></sc-form-group>
                  <sc-form-group-checkboxes id="fructs" label="Fructs" main-checkbox-label="All fructs" v-model="form.fields.fructs.value" :form="form" :options="{ apple: 'Apple', pair: 'Pair', orange: 'Orange', lemon: 'Lemon' }"></sc-form-group-checkboxes>

                  <sc-form-group-radio
                     v-cloak
                     id="dog"
                     label="Dog"
                     :form="form"
                     v-model="form.fields.dog.value"
                     :options="{
                        dog_1: 'Dog one',
                        dog_2: 'Dog two',
                        dog_3: 'Dog three'
                     }"
                  ></sc-form-group-radio>

                  <sc-form-group-select
                     v-cloak
                     id="cat"
                     label="Cat"
                     :form="form"
                     v-model="form.fields.cat.value"
                     :options="{
                        cat_1: 'Cat one',
                        cat_2: 'Cat two',
                        cat_3: 'Cat three'
                     }"
                  ></sc-form-group-select>

                  <sc-form-group-languages
                     v-cloak
                     id="language"
                     label="Language"
                     :form="form"
                     v-model="form.fields.language.value"
                  ></sc-form-group-languages>

                  <sc-form-group-textarea
                     v-cloak
                     id="description"
                     label="Description"
                     :form="form"
                     v-model="form.fields.description.value"
                  ></sc-form-group-textarea>

                  <sc-form-group-password
                     v-cloak
                     id="password"
                     label="password"
                     :form="form"
                     v-model="form.fields.password.value"
                  ></sc-form-group-password>

                  <sc-form-group-stores
                     v-cloak
                     id="storeID"
                     label="Store"
                     :form="form"
                     v-model="form.fields.storeID.value"
                  ></sc-form-group-stores>

                  <sc-form-group-dependable-select
                     v-cloak
                     id="size"
                     label="Size"
                     :form="form"
                     v-model="form.fields.size.value"
                     :options="{
                        small: 'Small',
                        medium: 'Mediun',
                        big: 'Big'
                     }"
                  ></sc-form-group-dependable-select>

                  <sc-form-group-dependable-select
                     id="color"
                     label="Color"
                     :form="form"
                     v-model="form.fields.color.value"
                     :options="{
                        small: {
                           red: 'Red',
                           green: 'Green',
                           blue: 'Blue'
                        },
                        medium: {
                           yallaw: 'Yallaw',
                           brown: 'Brown',
                           silver: 'Silver'
                        },
                        big: {
                           gold: 'Gold',
                           silver: 'Silver'
                        }
                     }"
                     depends-on="size"
                  ></sc-form-group-dependable-select>

                  <sc-form-group-dependable-select
                  id="brand"
                  label="Brand"
                  :form="form"
                  v-model="form.fields.brand.value"
                  :options="{
                     red: {
                        dacia: 'Dacia',
                        matiz: 'Matiz',
                        ford: 'Ford',
                        bmw: 'BMW',
                        opel: 'Opel'
                     },
                     green: {
                        dacia: 'Dacia',
                        jaguar: 'Jaguar',
                        nissan: 'Nissan',
                        bmw: 'BMW',
                        alfaRomeo: 'Alfa romeo'
                     },
                     blue: {
                        ferary: 'Ferary',
                        jaguar: 'Jaguar',
                        bentwlay: 'Bentwlay'
                     },
                     yallaw: {
                        jaguar: 'Jaguar',
                        nissan: 'Nissan',
                        bmw: 'BMW',
                        ferary: 'Ferary'
                     },
                     brown: {
                        ferary: 'Ferary',
                        nissan: 'Nissan',
                        bmw: 'BMW'
                     },
                     silver: {
                        jaguar: 'Jaguar',
                        ferary: 'Ferary'
                     },
                     gold: {
                        jaguar: 'Jaguar',
                        nissan: 'Nissan',
                        bmw: 'BMW'
                     }
                  }"
                  depends-on="color"
                  ></sc-form-group-dependable-select>


                  <sc-form-group-dependable-select
                     id="store"
                     label="Store"
                     :form="form"
                     v-model="form.fields.product.store.value"
                     :options="{
                        it: 'IT',
                        diy: 'DIY',
                        fashion: 'Fashion'
                     }"
                     select-first
                  ></sc-form-group-dependable-select>
                  <sc-form-group-dependable-select
                     id="category"
                     label="Category"
                     :form="form"
                     v-model="form.fields.product.category.value"
                     :default-option="{ key: '', value: 'Chose a category' }"
                     options="/test/form/all_categories"
                     :depends-on="{ store: 'product.store' }"
                  ></sc-form-group-dependable-select>
                  <sc-form-group-dependable-select
                     id="product"
                     label="Product"
                     :form="form"
                     v-model="form.fields.product.prd.value"
                     options="/test/form/all_products"
                     :depends-on="{
                        store: 'product.store',
                        category: 'product.category'
                     }"
                     last-request="/test/form/get_total"
                     @ajax="lastSelectAjax"
                  ></sc-form-group-dependable-select>
                  <sc-form-group-editor id="body" label="Body" v-model="form.fields.body.value" :form="form">
                  </sc-form-group-editor>
            </sc-form-wrap-panel>
         </div>
      </div>
   </div>
</div>
@stop

@section('bodyEnd')
    <script>
       new Vue({
          el: '#formApp',

          data: {
            testForm: new Form({
               fields: {
                  name: {
                     label: 'Name',
                     rules: {
                        required: true,
                        lengthRange: [3, 20]
                     },
                     value: 'andy'
                  },
                  fructs: {
                     label: 'Fructs',
                     rules: {
                        required: true
                     },
                     value: ["apple","pair"]
                  },
                  dog: {
                     label: 'Dog',
                     rules: {
                        required: true
                     },
                     value: 'dog_2'
                  },
                  cat: {
                     label: 'Cat',
                     rules: {
                        required: true
                     },
                     value: 'cat_1'
                  },
                  language: {
                     label: 'Language',
                     rules: {
                        required: true
                     },
                     value: '2'
                  },
                  description: {
                     label: 'Description',
                     rules: {
                        required: true
                     },
                     value: 'abc'
                  },
                  password: {
                     label: 'Password',
                     rules: {
                        required: true
                     },
                     value: ''
                  },
                  storeID: {
                     label: 'Store',
                     rules: {
                        required: true
                     },
                     value: [1]
                  },
                  color: {
                     label: 'Color',
                     rules: {
                        required: true
                     },
                     value: 'gold'
                  },
                  size: {
                     label: 'size',
                     rules: {
                        required: true
                     },
                     value: 'big'
                  },
                  brand: {
                     label: 'Brand',
                     rules: {
                        required: true
                     },
                     value: 'bmw'
                  },
                  product: {
                     store: {
                        label: 'Store',
                        rules: {
                           required: true
                        },
                        value: ''
                     },
                     category: {
                        label: 'Category',
                        rules: {
                           required: true
                        },
                        value: ''
                     },
                     prd: {
                        label: 'product',
                        rules: {
                           required: true
                        },
                        value: ''
                     }
                  },
                  body: {
                     label: 'Body',
                     rules: {
                        required: true,
                        minLength: 3
                     },
                     languages: {1: 'testing', 2: 'testare'},
                     value: 'testing'
                  }
               },
               group: 'testForm',
               multiLangs: true,
               id: 1
            })
          },

          methods: {
             test(event) {
               console.log({ input: event});

             },

             lastSelectAjax(data) {
                console.log({lastSelectAjax: data});
             },

             submit() {
                this.testForm.post('test.form.store').then(data => {
                   console.log({restpoceFromTestPost: data});
                }).catch(err => console.log({testSubmitError: err}));
             }
          }
       });
    </script>
@endsection

