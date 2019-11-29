<template>
  <div class="container-fluid">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="container">
      <h2>Followings</h2>
      <div class="button-group">
        <button
          :class="current === 'movie' ? 'buttonFocused' : ''"
          @click="toMovies"
        >
          Movies
        </button>
        <button
          :class="current === 'genre' ? 'buttonFocused' : ''"
          @click="toGenres"
        >
          Genres
        </button>
        <button
          :class="current === 'star' ? 'buttonFocused' : ''"
          @click="toStars"
        >
          Stars
        </button>
      </div>
    </div>
    <div class="container">
      <b-card
        v-for="item in followed"
        :img-src="
          current === 'movie'
            ? path_background + item.backdrop_path
            : '' + current === 'star'
            ? path_background + item.profile_path
            : ''
        "
        img-alt="Image"
        img-top
        :tag="current"
        style="max-width: 20rem;"
        :class="current + 'Card mb-2'"
        :key="item.id"
      >
        <b-card-text>
          <a href="#" class="card-title">{{
            current === "movie" ? item.title : item.name
          }}</a>
        </b-card-text>
        <b-button @click="unfollow(item.id)" variant="info">Unfollow</b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserFollowed",
  data() {
    return {
      followed: this.$store.getters.getFollowedMovies,
      current: "movie",
      path_background: "https://image.tmdb.org/t/p/w500/",
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    toMovies() {
      this.followed = this.$store.getters.getFollowedMovies;
      this.current = "movie";
    },
    toGenres() {
      this.followed = this.$store.getters.getFollowedGenres;
      this.current = "genre";
    },
    toStars() {
      this.followed = this.$store.getters.getFollowedStars;
      this.current = "star";
    },
    unfollow(id) {
      if (this.current === "movie") {
        this.$store.dispatch("deleteMovie", { movieId: id }).then(response => {
          if (!response) {
            this.errorMessage =
              "There is an error while unfollowing the movie!";
            this.showDismissibleAlert = true;
          }
        });
      } else if (this.current === "genre") {
        this.$store.dispatch("deleteGenre", { genreId: id }).then(response => {
          if (!response) {
            this.errorMessage =
              "There is an error while unfollowing the genre!";
            this.showDismissibleAlert = true;
          }
        });
      } else if (this.current === "star") {
        this.$store.dispatch("deleteStar", { starId: id }).then(response => {
          if (!response) {
            this.errorMessage = "There is an error while unfollowing the star";
            this.showDismissibleAlert = true;
          }
        });
      }
    }
  }
};
</script>
