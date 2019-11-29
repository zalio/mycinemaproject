<template>
  <div class="container-fluid">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="container">
      <h2>Genres</h2>
      <b-card
        v-for="genre in genres"
        tag="movie"
        style="max-width: 20rem;"
        class="genreCard mb-2"
        :key="genre.id"
      >
        <b-card-text>
          <p class="card-title">{{ genre.name }}</p>
        </b-card-text>
        <b-button @click="follow(genre.id)" variant="info">Follow</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Genres",
  data() {
    return {
      genres: this.$store.getters.getGenres,
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    follow(id) {
      this.$store.dispatch("addGenre", { genreId: id }).then(response => {
        if (!response) {
          this.errorMessage = "You already followed this genre !";
          this.showDismissibleAlert = true;
        }
      });
    }
  }
};
</script>
