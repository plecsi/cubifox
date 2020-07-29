<template>
  <div class="login">
    <form  @submit.prevent="login" class="row justify-content-center">
      <div class="col-12 mb-3">
        <label><i class="fa fa-at"></i>E-mail/username</label>
        <input v-model="email" type="text" placeholder="email/username" class="form-control" required/>
      </div>
      <div class="col-12 mb-3">
        <label><i class="fa fa-lock"></i>Password</label>
        <input v-model="psw" type="password" placeholder="password" class="form-control" required/>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary">
          <i class="fa fa-user"></i>
          <span>Login</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "loginForm",
  data(){
			return {
				email : "",
        psw : "",
      }
		},
		methods: {
		 	login() {
		   		let email = this.email 
          let password = this.psw
		   		this.$store.dispatch('login', { email, password })
           .then(() => this.$router.push('/dashboard'))
           .catch(err => console.log('error: ',err))
		   	}
		}
};
</script>
