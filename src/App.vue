<template>
  <div id="app">
    <header id="nav" class="container-fluid">
      <div class="nav">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
        <router-link to="/dashboard" v-if="isLoggedIn" class="nav-item">Dashboard</router-link>
        <router-link to="/" v-if="isLoggedIn" class="nav-item"><span @click="logout">Logout</span></router-link>
        <div v-if="user" class="nav-item"><i class="fa fa-user"></i><span>user: {{user.username}}</span></div>
      </div>
    </header>
    <Stat/>
    <section class="main-container">
      <router-view />
    </section>
    <footer>
      made by @plecsi™
    </footer>
    <ErrorMsg v-if="error_message" :msg="error_message" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Stat from '@/components/Statistics.vue'
import ErrorMsg from '@/components/ErrorMsg.vue'
export default {
  computed : {
        ...mapState(['user']),
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        error_message : function(){ return this.$store.state.error_msg}
    },
  created() {
    this.$store.dispatch('getProducts')
  },
  components: {
    Stat, 
    ErrorMsg
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="scss">
  @import "./scss/app.scss";
</style>
