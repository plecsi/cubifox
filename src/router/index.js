import Vue from "vue"
import VueRouter from "vue-router"
import store from '../store/index'
import Home from "../views/Home.vue"
import Dashboard from "../views/Dashboard.vue"
import Product from "../views/Product.vue"
import notFound from '../views/404.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      isAuth: true,
    }
  },
  {
    path: "/product/:id",
    component: Product,
  },
  {
    path: "*",
    component: notFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.isAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router;
