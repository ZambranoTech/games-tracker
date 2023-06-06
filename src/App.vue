<template>
  <navbar>
  <div class="container mx-auto border-b pb-2 border-gray-500">
  <navbar-component/>
  </div>  
</navbar>
  <body class="container mx-auto mt-5">
    <router-view></router-view>
    
  </body>


  
</template>

<script>
import NavbarComponent from './components/header/NavbarComponent.vue';



export default {
    components: { NavbarComponent },

    
}
</script>

<style>

</style>
