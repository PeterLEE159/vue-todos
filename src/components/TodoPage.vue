<template>

  <div id="app-todo-page">
    <div class="date-selector-group">
      <app-date-selector></app-date-selector>
    </div>
    <div class="todos">
      <div class="todos-option">
        <input class="form-control" type="text" placeholder="날짜 혹은 내용을 입력하세요." v-model="typed" @change.stop="onSearchTodosTyped">
        <button class="btn btn-primary" @click.stop="onSearchTodos">검색</button>
      </div>
      <div class="todos-group">
        <i v-if="isLoading" class="fa fa-sub fa-3x fa-spinner fa-spin"></i>
        <app-todos v-if="!isLoading" :todos="todos"></app-todos>
      </div>
    </div>
  </div>


</template>

<script>
import AppDateSelector from './DateSelector.vue';
import AppTodos from './Todos.vue';
import elemBus from '@/elem.bus';
import Todo from '@/model/Todo';
import { setTimeout } from 'timers';
import mixin from '@/mixins';


export default {
  name: 'app-todo-page',
  mixins: [mixin],
  props: [ 'year', 'month' ],
  data() {
    return {
      typed: '',
      todos: [],
      searchTimeout: undefined,
      // year: this.$route.params.year,
      // month: this.$route.params.month,
      isLoading: false
    }
  },
  components: {
    AppTodos,
    AppDateSelector
  },
  created() {
    // setTimeout(this.loadData, 1500);

    setTimeout(this.createFakeTodos, 1500);
  },
  watch: {
    year() {
      this.loadTodos();
    },
    month() {
      this.loadTodos();
    }
  },
  methods: {
    createFakeTodos() {
      
      elemBus.toggleLoading(false);

      let year = 2019;
      const contents = [ '책상정리', '모임참여', '동창회 참여', '결혼식 참여', '자격증 공부', '시장보기', '도서관 가기', '식물 물주기', '산보' ];
      const priorities = [ '높음', '중간', '낮음' ];
      const progresses = [ '대기', '연기', '진행', '완료' ];
      this.date = undefined;
      this.priority = undefined;
      this.progress = undefined;
      const todos = [];
      const month = 7;
      
      for(let day = 1; day <= 31; day++) {
          for(let i=0; i < 3 ; i++) {
            const rand = Math.random();
            const todo = new Todo({ 
                content: contents[Math.floor(rand * 6)], 
                date: Number(this.getStringDate(year, month, day)),
                priority: priorities[Math.floor(rand * 2)], 
                progress: progresses[Math.floor(rand * 4)],
                isEdit: false
            });
          
          todos.push(todo);
          
          
          // this.$http.service.todoService.createTodo(todo)
        }
      }
        
      
      this.$store.state.todos = todos;
    },
    onSearchTodos() {
      if(this.typed == '') {
        elemBus.toast('검색단어를 입력하세요');
        return;
      }

      
    },
    onSearchTodosTyped() {

      if(this.typed) return;

      if(this.searchTimeout != null) clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(this.onSearchTodos, 50);
    },

    loadData() {

      this.$http.forkJoin([
        this.$http.service.todoService.getTodos(this.$route.params.year, this.$route.params.month),
        this.$http.service.userService.getUsers()
      ]).then(res => {
        elemBus.toggleLoading(false);
      });
      
      
    },
    loadTodos() {
      this.isLoading = true;
      setTimeout(() => {
        this.$http.service.todoService.getTodos(this.year, this.month)
          .then((res) => {
            this.isLoading = false;
        });
      }, 500);
      
    }
  }
  
}
</script>


<style scoped lang="scss">
  #app-todo-page {
    display: flex;
    
    div {
      
    }
  }
  .date-selector-group {
    width: 250px;
    height: 100vh;
    top: 0;
    position: fixed;
  }
  .todos {
    padding: 64px;
    margin-left: 250px;
    width: calc(100% - 500px);
    min-width: 1400px;
    height: 100vh;
    margin-top: 6px;
    
    .todos-option {
      display: flex;
      align-items: stretch;
      
      button {
        border-radius: 0;
      }

      input {
        width: 250px;
        margin: 0;
        transition: all 0.2s;
        position: relative;
        display: inline-block;
        border-radius: 0;
        &:focus {
          width: 500px;
          
        }
      }

    }
    .todos-group {
      margin-top: 72px;
    }
    
  }
  
</style>
