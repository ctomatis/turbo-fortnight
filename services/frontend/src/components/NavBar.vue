<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom border-primary">
      <div class="container-fluid">
        <button v-if="isLoggedIn" @click="open = true" type="button" class="btn btn-sm btn-link">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="!isLoggedIn">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div v-if="isLoggedIn" class="offcanvas offcanvas-start" :class="{ show: open }" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header text-bg-white justify-content-center border-bottom border-primary py-2">
      <h6 class="offcanvas-title" id="offcanvasLabel">
        <img src="https://biomakers.net/site/templates/images/svg/pluton_logo.svg" height="32" />
      </h6>
    </div>
    <div class="offcanvas-body px-0">
      <div class="list-group list-group-flush small">
        <router-link active-class="active" class="list-group-item list-group-item-action" to="/">Listado de
          resultados</router-link>
        <router-link active-class="active" class="list-group-item list-group-item-action" to="/dashboard">Carga de
          resultados</router-link>
        <router-link active-class="active" class="list-group-item list-group-item-action" to="/profile">My
          Profile</router-link>
        <a role="button" rel="noopener" class="list-group-item list-group-item-action" @click="logout">Logout</a>
      </div>
    </div>
  </div>
  <div v-if="open" @click="open = !open" class="offcanvas-backdrop fade show"></div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavBar',
  data() {
    const open = ref(false)
    return { open }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    }
  },
  watch: {
    $route() {
      this.open = false
    }
  }
})
</script>

<style scoped>
.offcanvas.offcanvas-start {
  width: 240px;
}
</style>
