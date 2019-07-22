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
        <i v-if="isLoading" class="fa fa-sub fa-4x fa-spinner fa-spin"></i>
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
import mixins from '@/mixins';


export default {
  name: 'app-todo-page',
  mixins: [mixins],
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
    // elemBus.toggleLoading(true);
    
    
    elemBus.toggleLoading(false);
    setTimeout(this.loadData, 3000);

    // this.createFakeTodos();
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
      let year = 2019;
      const contents = [ '책상정리', '모임참여', '동창회 참여', '결혼식 참여', '자격증 공부', '시장보기', '도서관 가기', '식물 물주기', '산보' ];
      const priorities = [ '높음', '중간', '낮음' ];
      const progresses = [ '대기', '연기', '진행', '완료' ];
      this.date = undefined;
      this.priority = undefined;
      this.progress = undefined;
      for(let month = 6; month <= 7; month++) {
        for(let day = 1; day <= 31; day++) {
            for(let i=0; i <5 ; i++) {
            const rand = Math.random();
            const todo = { 
                content: contents[Math.floor(rand * 6)], 
                date: Number(String(year) + String(month).padStart(2, '0') + String(day).padStart(2, '0')),
                priority: priorities[Math.floor(rand * 2)], 
                progress: progresses[Math.floor(rand * 4)]
            };
            
            this.$http.service.todoService.createTodo(todo)
          }
        }
        
      }
    },
    onSearchTodos() {
      if(this.typed == '') {
        elemBus.toast('검색단어를 입력하세요');
        return;
      }
      
      // const todo = new Todo({ type: this.typed});
      // this.$http.service.todoService.createTodo(todo)
      //   .then((res) => {

      //   }
      // );

      
    },
    onSearchTodosTyped() {

      if(this.typed) return;

      if(this.searchTimeout != null) clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(this.onSearchTodos, 2000);
    },
    loadData() {
      
      // this.$http.forkJoin([
      // this.$http.service.todoService.getTodos('20190722'),
      // this.$http.service.userService.getUsers()
      // ]).then((res) => {
      //   elemBus.toggleLoading(false);
      // });
      this.$store.state.todos = [
        { content: 'qq', date: 20190722 },
        { content: 'ww', date: 20190721 }
      ];
      
    },
    loadTodos() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000)
      // this.$http.service.todoService.getTodos(this.year, this.month)
      //     .then((res) => {
      //       this.isLoading = false;
      // });
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
    position: fixed;
  }
  .todos {
    margin: 64px 0 32px 0;
    padding: 12px;
    margin-left: 320px;
    width: calc(100% - 600px);
    height: 100vh;
    
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
