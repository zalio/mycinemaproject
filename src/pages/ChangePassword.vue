<template>
  <div class="container">
    <b-alert v-model="showDismissibleAlert" :variant="variant" dismissible>
      {{ errorMessage }}
    </b-alert>
    <div class="row  mt-5">
      <div
        class="col-md-4 offset-4 card card-primary p-3 border"
        :class="'border-primary'"
      >
        <h3 :class="'text-primary'" class="text-center mb-3 mt-3">
          Change password
        </h3>
        <hr />
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              placeholder="Password..."
            />
          </div>
          <div class="form-group">
            <label>Password again</label>
            <input
              v-model="user.passwordagain"
              type="password"
              class="form-control"
              placeholder="Password..."
            />
          </div>
          <div class="button-container d-flex  flex-column align-items-center">
            <button
              type="submit"
              :class="'btn-success'"
              class="btn btn-block mb-2"
            >
              Change
            </button>
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
        password: null,
        passwordagain: null
      },
      showDismissibleAlert: false,
      errorMessage: "",
      variant: "danger"
    };
  },
  methods: {
    onSubmit() {
      if (this.user.password !== this.user.passwordagain) {
        this.errorMessage = "Passwords are not the same!";
        this.variant = "warning";
        this.showDismissibleAlert = true;
      } else {
        this.$store
          .dispatch("changepassword", { password: this.user.password })
          .then(response => {
            if (response) {
              this.errorMessage = "Password was changed successfully!";
              this.variant = "success";
              this.showDismissibleAlert = true;
            } else {
              this.errorMessage = "Passwords are not valid!";
              this.variant = "danger";
              this.showDismissibleAlert = true;
            }
          });
      }
    }
  }
};
</script>
