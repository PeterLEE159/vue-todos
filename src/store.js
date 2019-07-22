import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    users: []
  },
  getters: {
    getTodos(state) {
      return state.todos;
    }
  },
  mutations: {

  },
  actions: {

  },
});
