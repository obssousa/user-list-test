import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUsers: state => state.users
  },
  mutations: {
    ADD_USER (state, payload) {
      state.users.push(payload)
    },
    REMOVE_USER (state) {
      state.users.pop()
    }
  },
  actions: {
    async fetchUser ({ commit }) {
      const response = await axios.get('https://randomuser.me/api?limit=1')
      const user = response.data.results[0]
      commit('ADD_USER', user)
    }
  }
})
