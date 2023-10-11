<template>
  <div class="app">
    <Header />
    <router-view class="main"/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/varaibles';
body, p, h1 {
  margin: 0;
}
body {
  margin: 0;
  background-color: $base-bg-color;
  font-family: 'Roboto', serif;
  font-size: 15px;
  font-weight: 400;
}
.app{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main{
  flex-grow: 1;
}
.input{
  margin: 0;
  width: 100%;
  background-color: $input-bg-color;
  color: $text-color;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;

  outline: none;
  border:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;  
}
.green-button{
  background-color: $button-bg-color;
  color: $button-color;
  font-size: 17px;
  font-weight: 500;
  padding: 10px 30px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;

  outline: none;
  border:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  &--disabled{
    background-color: scale-color($button-bg-color, $lightness: +45%);
    cursor: default;
  }
}
</style>
