import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user));
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem('user')
    }
  },
  actions: {
  }
})
