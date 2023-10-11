<template>
  <div class="login">
    <h1 class="login-title">
      description
    </h1>
    <div class="login-body">
      <p class="login-body-description">description</p>
      <form
        @submit.prevent="login"
        class="form"
      >
        <div class="form-name">
          <input
            v-model="name"
            type="text"
            name="name"
            placeholder="Username"
            class="input"
          >
          <span
            v-if="errors.name"
            class="form-error"
          >
            {{ errors.name }}
          </span>
        </div>
        <div class="form-phone">
          <input
            v-model="phone"
            type="text"
            name="phone"
            placeholder="Phone Number"
            class="input"
          >
          <span
            v-if="errors.phone"
            class="form-error"
          >
            {{ errors.phone }}
          </span>
        </div>
        <button class="green-button form-button">
          Login
        </button>
        <div v-if="errors.login" class="form-error">{{ errors.login }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import Provider from '@/utils/provider'

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      phone: '',
      errors: {
        name: '',
        phone: '',
        login: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.errors.name && !this.errors.phone
    }
  },
  methods: {
    async login() {
      if (!this.name) {
        this.errors.name = 'This field is required';
      } else if (!this.nameValidation(this.name)) {
        this.errors.name = 'Enter valid username';
      }
      if (!this.phone) {
        this.errors.phone = 'This field is required';
      } else if (!this.phoneValidation(this.phone)) {
        this.errors.phone = 'Enter valid phone';
      }

      if (this.isFormValid) {
        const users = await Provider.getUsers();
        if (users.length) {
          const user = users.find(user => user.username === this.name && user.phone === this.phone);
          if (user) {
            this.$store.commit('setUser', user);
            this.$router.push('/')
          } else {
            this.errors.login = 'This user does not exist'
          }
        } else {
          this.errors.login = 'Something went wrong'
        }
      }
    },
    nameValidation(value) {
      const onlyLetters = /[a-zA-Z\s]+/;
      return onlyLetters.test(value);
    },
    phoneValidation(value) {
      const phoneNumbers = /^[1-9\s\-+*#()]+$/;
      return phoneNumbers.test(value);
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/scss/varaibles';
  .login{
    width: 100%;
    max-width: 447px;
    background-color: $card-bg-color;
    margin: 10% auto 10%;
    border-radius: 5px;
    overflow: hidden;

    &-title{
      padding: 15px;
      text-align: center;
      font-size: 17px;
      font-weight: 400;
      color: $description-color;
      background-color: $title-bg-color;
    }

    &-body{
      padding: 15px 25px 30px;

      &-description{
        color: $description-color;
        margin-bottom: 14px;
      }
    }
  }
  .form{
    &-name{
      margin-bottom: 20px;
    }

    &-phone{
      margin-bottom: 25px;
    }

    &-button{
      width: 100%;
    }

    &-error{
      font-size: 10px;
      color: red;
    }
  }
</style>
