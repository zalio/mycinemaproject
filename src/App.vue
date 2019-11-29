<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "./components/Header";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
export default {
  components: {
    Header
  },
  created() {
    this.$store.dispatch("initAuth");
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getGenres");
    this.$store.dispatch("getStars");
  }
};
</script>
<style>
.movieCard {
  width: 250px;
  display: inline-block;
  margin: 10px;
}
.genreCard {
  height: 150px;
  width: 200px;
  display: inline-block;
  margin: 10px;
}
.starCard {
  display: inline-block;
  margin: 10px;
}
.movieCard img {
  width: 248px;
  height: 139.97px;
}
.starCard img {
  width: 248px;
  height: 372px;
}
img {
  max-width: 250px;
}
.card {
  border: 1px solid #4b4b4b;
}
.card-title {
  height: 40px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7d5fff;
}
.btn {
  width: 100%;
}
h2 {
  display: flex;
  justify-content: center;
  margin: 30px;
  color: #4b4b4b;
  border-top: 2px solid #4b4b4b;
  border-bottom: 2px solid #4b4b4b;
  border-radius: 12px;
}
.button-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 15px;
  margin-bottom: 30px;
}
.button-group button {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 2px solid #ffffff;
}
.button-group button:focus {
  outline: none !important;
}
.buttonFocused {
  border-bottom: 2px solid #7158e2 !important;
}
#headerlogo {
  max-width: 50px;
}
</style>
