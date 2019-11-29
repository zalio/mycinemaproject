<template>
  <div class="container-fluid">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="container">
      <h2>For you</h2>
      <b-card
        v-for="movie in recommendeds"
        :img-src="
          movie.backdrop_path !== null
            ? path_background + movie.backdrop_path
            : default_photo
        "
        img-alt="Image"
        img-top
        tag="movie"
        style="max-width: 20rem;"
        class="movieCard mb-2"
        :key="movie.id"
      >
        <b-card-text>
          <a href="#" class="card-title">{{ movie.title }}</a>
        </b-card-text>
        <b-button @click="follow(movie.id)" variant="info">Follow</b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Recommendeds",
  data() {
    return {
      recommendeds: this.$store.getters.getRecommendeds,
      path_background: "https://image.tmdb.org/t/p/w500/",
      default_photo: "src/images/no-photo-available.png",
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    follow(movieId) {
      this.$store
        .dispatch("addMovie", { movieId: movieId, isrecommended: true })
        .then(response => {
          if (!response) {
            this.errorMessage = "You already followed this movie !";
            this.showDismissibleAlert = true;
          }
        });
    },
    createRecommends() {
      let followedGenres = this.$store.getters.getFollowedGenres;
      let followedStars = this.$store.getters.getFollowedStars;
      let followedMovies = this.$store.getters.getFollowedMovies;

      if (followedGenres.length !== 0 || followedStars.length !== 0) {
        let randGenreFirst = Math.ceil(Math.random() * followedGenres.length);
        let randGenreSecond;
        if (followedGenres.length !== 1) {
          randGenreSecond = Math.ceil(Math.random() * followedGenres.length);
          while (randGenreSecond === randGenreFirst) {
            randGenreSecond = Math.ceil(Math.random() * followedGenres.length);
          }
        }
        for (let star in followedStars) {
          let data = {
            starIds: followedStars[star].id.toString(),
            genreIds:
              followedGenres[randGenreFirst].id.toString() +
              "%2C" +
              followedGenres[randGenreFirst].id.toString()
          };
          this.$store.dispatch("getRecommends", data);
        }
        let randStarFirst = Math.ceil(Math.random() * followedStars.length);
        let randStarSecond;
        if (followedStars.length !== 1) {
          randStarSecond = Math.ceil(Math.random() * followedStars.length);
          while (randStarSecond === randStarFirst) {
            randStarSecond = Math.ceil(Math.random() * followedStars.length);
          }
        }
        for (let genre in followedGenres) {
          let data = {
            starIds:
              followedStars[randStarFirst].id.toString() +
              "%2C" +
              followedStars[randStarFirst].id.toString(),
            genreIds: followedGenres[genre].id.toString()
          };
          this.$store.dispatch("getRecommends", data);
        }
      } else if (
        followedGenres.length === 0 &&
        followedStars.length === 0 &&
        followedMovies.length !== 0
      ) {
        let genres = [];
        for (let movies in followedMovies) {
          let genreIds = followedMovies[movies].genres;
          for (let genre in genreIds) {
            genres.push(genreIds[genre]);
          }
        }
        let randomGenres = [];
        for (let i = 0; i < genres.length; i++) {
          let randomNumber = Math.ceil(Math.random() * genres.length) - 1;
          randomGenres.push(genres[randomNumber].id);
        }
        if (randomGenres % 2 === 0) {
          for (let i = 0; i < randomGenres.length; i += 2) {
            let data = {
              starIds: "",
              genreIds:
                randomGenres[i].toString() +
                "%2C" +
                randomGenres[i + 1].toString()
            };
            this.$store.dispatch("getRecommends", data);
          }
        } else {
          for (let i = 0; i < randomGenres.length - 1; i += 2) {
            let data = {
              starIds: "",
              genreIds:
                randomGenres[i].toString() +
                "%2C" +
                randomGenres[i + 1].toString()
            };
            this.$store.dispatch("getRecommends", data);
          }
          let data = {
            starIds: "",
            genreIds: randomGenres[randomGenres.length].toString()
          };
          this.$store.dispatch("getRecommends", data);
        }
      }
    }
  },
  created() {
    this.createRecommends();
  }
};
</script>
