<template>
  <div class="container-fluid">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="container">
      <h2>Stars</h2>
      <b-card
        v-for="star in stars"
        :img-src="
          star.profile_path !== null
            ? path_background + star.profile_path
            : default_photo
        "
        img-alt="Image"
        img-top
        tag="star"
        style="max-width: 20rem;"
        class="starCard mb-2"
        :key="star.id"
      >
        <b-card-text>
          <a href="#" class="card-title">{{ star.name }}</a>
        </b-card-text>
        <b-button @click="follow(star.id)" variant="info">Follow</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: this.$store.getters.getStars,
      path_background: "https://image.tmdb.org/t/p/w500/",
      default_photo: "src/images/no-photo-available.png",
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    follow(id) {
      this.$store.dispatch("addStar", { starId: id }).then(response => {
        if (!response) {
          this.errorMessage = "You already followed this movie !";
          this.showDismissibleAlert = true;
        }
      });
    }
  }
};
</script>
