import Vue from "vue"
import VueRouter from "vue-router"

import Homepage from "./pages/Homepage.vue"
import Auth from "./pages/auth/Auth.vue"
import ChangePassword from "./pages/ChangePassword.vue"
import Genres from "./pages/Genres.vue"
import Stars from "./pages/Stars.vue"
import UserFollowed from "./pages/UserFollowed.vue"
import Recommendeds from "./pages/Recommendeds.vue"

import store from "./store"


Vue.use(VueRouter);

export const router = new VueRouter({
  routes : [
    {
      path : "/",
      component : Homepage,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    {
      path : "/genres",
      component : Genres,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    {
      path : "/stars",
      component : Stars,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    {
      path : "/userfollowed",
      component : UserFollowed,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    {
      path : "/recommendeds",
      component : Recommendeds,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    {
      path : "/changepassword",
      component : ChangePassword,
      beforeEnter(to, from, next){
        if(store.getters.isAuthenticated){
          next();
        }
        else{
          next("/auth");
        }
      }
    },
    { path : "/auth", component : Auth}
  ],
  mode: "history"
})
