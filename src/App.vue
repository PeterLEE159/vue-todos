<template>
  <div id="app">
    
    <app-page-component></app-page-component>

  </div>
  
</template>

<script>


import AppPageComponent from './components/Page.vue';


export default {
  name: 'app',
  components: {
    AppPageComponent
  }
};
</script>

<style lang="scss">
   .btn-primary {
     background: #2F97C1;
   }
   input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    input[type="number"] {
        -moz-appearance: textfield;
    }

    .fa-sub {
      color: #0EAD69;
    }
</style>
