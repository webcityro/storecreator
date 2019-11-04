<template>
   <div class="container-fluid">
      <div class="page-header">
         <div class="float-right">
            <slot name="buttons"></slot>
         </div>
         <h1>{{ title }}</h1>
         <ul class="breadcrumb">
            <slot name="breadcrumb"></slot>
         </ul>
      </div>
   </div>
</template>

<script>
   export default {
      props: ['title']
   }
</script>
