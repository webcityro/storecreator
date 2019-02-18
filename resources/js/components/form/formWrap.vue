<template>
   <div class="container">
      <div class="container">
         <div class="card card-default">
            <div class="card-header">
               <h3 class="card-title"><slot name="title">{{ title }}</slot></h3>
            </div>
            <div class="card-body"><slot></slot></div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      props: ['title']
   }
</script>
