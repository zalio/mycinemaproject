<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>
        My Cinema
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link tag="li" to="/">
              <a class="nav-link">Movies</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link tag="li" to="/genres">
              <a class="nav-link">Genres</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link tag="li" to="/stars">
              <a class="nav-link">Stars</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link tag="li" to="/userfollowed">
              <a class="nav-link">My Followeds</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link tag="li" to="/recommendeds">
              <a class="nav-link">For you</a>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <ul class="navbar-nav my-2 my-lg-0" :class="userClass">
            <li class="nav-item">
              <a @click.prevent="changepassword" class="nav-link" href="#"
                >Change password</a
              >
            </li>
            <li class="nav-item">
              <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
            </li>
          </ul>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
    },
    changepassword() {
      this.$router.replace("/changepassword");
    }
  },
  computed: {
    userClass() {
      return {
        "d-none": !this.$store.getters.isAuthenticated
      };
    }
  }
};
/*
 * */

/*
* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="/">My Movies</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" tag="li" to="/">
          <a class="nav-link" href="/">Movies</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/genres">
          <a class="nav-link">Genres</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/stars">
          <a class="nav-link">Stars</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/myfollowed">
          <a class="nav-link">My Followed</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/recommendeds">
          <a class="nav-link">For Me</a>
        </router-link>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="userClass">
        <li class="nav-item">
          <a @click.prevent="changepassword" class="nav-link" href="#">Change password</a>
        </li>
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" href="#">Çıkış Yap</a>
        </li>
      </ul>
    </div>
* */
</script>
