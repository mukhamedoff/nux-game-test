<template>
  <div class="header">
    <button
      v-if="user"
      class="green-button"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    logout() {
      this.$store.commit('removeUser');
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/scss/varaibles';
.header{
  height: $header-height;
  background-color: $header-bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
