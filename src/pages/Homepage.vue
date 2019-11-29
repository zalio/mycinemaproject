<template>
  <div class="container-fluid">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="container">
      <h2>Movies</h2>
      <b-card
        v-for="movie in movies"
        :img-src="path_background + movie.backdrop_path"
        img-alt="Image"
        img-top
        tag="movie"
        style="max-width: 20rem;"
        class="movieCard mb-2"
        :key="movie.id"
      >
        <b-card-text>
          <a href="#" class="movie card-title">{{ movie.title }}</a>
        </b-card-text>
        <b-button @click="follow(movie.id)" variant="info">Follow</b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Homepage",
  data() {
    return {
      movies: this.$store.getters.getMovies,
      path_background: "https://image.tmdb.org/t/p/w500/",
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    follow(movieId) {
      this.$store.dispatch("addMovie", { movieId: movieId }).then(response => {
        if (!response) {
          this.errorMessage = "You already followed this movie !";
          this.showDismissibleAlert = true;
        }
      });
    }
  }
};
</script>
