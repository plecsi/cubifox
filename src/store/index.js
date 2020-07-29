import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error_msg: {},
    products: [],
    currency: 'Ft',
    e: {
      showModal: false,
      edit: false,
      editP: []
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    e: state => state.e.showModal
  },
  mutations: {
    auth_success(state, datas){
      state.status = 'success'
      state.token = datas.token
      state.user = datas.user
    },
    error_msg(state, datas){
      state.error_msg = datas
      setTimeout(function() {
        state.error_msg = null
     }.bind(this), 2500);
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = null
    },
    setProducts: (state, products) => state.products = products,
    editProducts: (state, e) => {
      state.e.showModal = true,
      state.e.edit = true,  
      state.e.editP = e
    }
  },
  actions: {
    async login({commit}, user){
      try {
        let resp = await axios({
                                url: process.env.VUE_APP_APIURL,
                                method: 'POST',
                                data: user
                              })
        const token = resp.data.token
        const status = resp.status
        if(status == 200 && token) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(resp.data.user))
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', resp.data)
        }
        else {
          throw resp.data
        }
      }
      catch(err) {
        commit('error_msg', err)
      }
    },
    logout({commit}){
      return new Promise((resolve) => {
          commit('logout')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    },
    async getProducts({commit}){
      try{
        let resp = await axios({url: process.env.VUE_APP_PRODUCT, method:"GET"})
        if(resp) {
          commit('setProducts', resp.data)
        }
      }
      catch(err){
        console.log('product error', err)
      }
    },
    async addProduct({commit}, product) {
      try{
        let resp = await axios({url: process.env.VUE_APP_PRODUCT, headers:{"Authorization": this.state.token}, method:"POST", data: product})
        if(resp.status == 200) {
          commit('error_msg', resp.data.message)
          commit('setProducts', resp.data.product)
        }
        else {
          throw resp.data.msg_type
        }
      }
      catch(err){
        commit('error_msg', err)
      }
    },
    async editProduct({commit}, product) {
      try{
        let resp = await axios({url: process.env.VUE_APP_PRODUCT, headers:{"Authorization": this.state.token}, method:"PUT", data: product})
        if(resp.status == 200) {
          commit('error_msg', resp.data.message)
          commit('editProducts', resp.data)
        }
        else {
          throw resp.data
        }
      }
      catch(err){
        commit('error_msg', err)
      }
    },
    async editInModal({commit}, product) {
      commit('editProducts', product)
    },
    async deleteProduct({commit}, product) {
      try{
        let resp = await axios({url: process.env.VUE_APP_PRODUCT, headers:{"Authorization": this.state.token}, method:"DELETE", data: product})
        if(resp.status == 200) {
          commit('error_msg', resp.data.message)
          commit('setProducts', resp.data.product)
        }
        else {
          throw resp.data
        }
      }
      catch(err){
        commit('error_msg', err)
      }
    }
  },
  modules: {}
});
