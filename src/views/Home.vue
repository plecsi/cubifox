<template>
  <div class="home">
   <loginForm v-if="!isLoggedIn"/>
   <h1>Home</h1>
   <p>ez lesz itt a tartalom...</p>
  </div>
</template>

<script>
import loginForm from "@/components/loginForm.vue";

export default {
  name: "Home",
  components: {
    loginForm
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    }
};
</script>
