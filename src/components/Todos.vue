<template>

  <div id="app-todos">
    <ul>
      <li v-for="(todos, dt) in todosMap" :key="dt">
        {{ dt }}
        <ul>
          <li v-for="(todo, idx) in todos" :key="idx">
            {{ todo.content }}
          </li>
        </ul>
      </li>
    </ul>
  </div>


</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app-todos',
  props: [ 'todos' ],
  data() {
    return {
      // todos: this.$store.state.todos
    }
  },
  created() {

  },
  
  computed: {
    ...mapGetters({
      getTodos: 'getTodos'
    }),
     todosMap() {
        const dtMap = {};
        const todos = this.getTodos;
        console.log(todos);
        for(let todo of todos) {
          // const todo = this.todos[key];
          const todoByDate = dtMap[String(todo.date)];
          if(todoByDate == null) {
            todoByDate = [];
            dtMap[String(todo.date)] = todoByDate;
          }
          todoByDate.push(todo);
        }
        return dtMap;
     } 
  },

  methods: {
    
  }
}
</script>


<style scoped lang="scss">
  
</style>
