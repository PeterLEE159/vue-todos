import Vue from 'vue';
import Vuex, { mapGetters } from 'vuex';

Vue.use(Vuex);

const vuex = new Vuex.Store({
  state: {
    todos: [],
    users: []
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },

    getTodosByDate(state) {

      const dts = [];
      for(let i = 0; i < 31; i ++) {
        dts[i] = [];
      }

      const todos = state.todos;

      for(let todo of todos) {
        const dt = Number(String(todo.date).substring(6));
        if(dt < 1) continue;
        dts[dt - 1].push(todo);
      }
      
      
      return dts;
    }
  },
  mutations: {

  },
  actions: {

  },
});


export default vuex;

const getterNms = [];
for(let key in vuex.getters) {
  getterNms.push(key);
}

export const getters = { ...mapGetters(getterNms) };