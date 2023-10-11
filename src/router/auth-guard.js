import store from '../store'

/* eslint-disable */
export default (to, from, next) => {
	const localUser = localStorage.getItem("user");
	if (store.getters.user || localUser) {
		if (!store.getters.user) {
			store.commit('setUser', JSON.parse(localUser))
		}
		next()
	} else {
		next('/login')
	}
}