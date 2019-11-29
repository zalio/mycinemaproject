<template>
  <div class="container">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="row  mt-5">
      <div
        class="col-md-4 offset-4 card card-primary p-3 border"
        :class="{ 'border-primary': isUser, 'border-success': !isUser }"
      >
        <h3
          :class="{ 'text-primary': isUser, 'text-success': !isUser }"
          class="text-center mb-3 mt-3"
        >
          My Cinema
        </h3>
        <hr />
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Your e-mail address</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              placeholder="E-posta adresinizi giriniz"
            />
          </div>
          <div class="form-group">
            <label>Your password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              placeholder="Şifreniz..."
            />
          </div>
          <div class="button-container d-flex  flex-column align-items-center">
            <button
              type="submit"
              :class="{ 'btn-primary': isUser, 'btn-success': !isUser }"
              class="btn btn-block mb-2"
            >
              {{ isUser ? "Log in" : "Register" }}
            </button>
            <a
              href="#"
              @click.prevent="isUser = !isUser"
              class="text-secondary"
            >
              {{ isUser ? "I have no account" : "I have already account" }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      isUser: true,
      errorMessage: "",
      showDismissibleAlert: false
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("login", { ...this.user, isUser: this.isUser })
        .then(response => {
          if (response) {
            this.$router.push("/");
          } else {
            if (this.isUser) {
              this.errorMessage = "Email or password is wrong!";
              this.showDismissibleAlert = true;
            } else {
              this.errorMessage = "Email or password is not valid!";
              this.showDismissibleAlert = true;
            }
          }
        });
    }
  }
};
</script>
