<template>

  <div id="app-todos">
    <span class="target-dt">{{ $route.params.year }}년 {{ $route.params.month }}월</span>
    <div class="todos">
      <template v-if="!searchTerm">
        <div :id="dt + 1" class="dt-group" v-for="(todos, dt) in getTodosByDate" :key="dt">
          <div class="dt">
            <span>{{ dt + 1 }} 일 :</span>
          </div>
          <div class="todo-lt-cover" v-for="(todo, idx) in todos" :key="idx">
            <div class="todo-lt">
              <template v-if="!todo.isEdit">

                <div class="todo-hovered">
                  <button class="btn btn-edit" @click.stop="onStartEditTodo(todo)">수정</button>
                  <button class="btn btn-del" @click.stop="onDeleteTodo(todo)">삭제</button>
                </div>

                <div class="todo-etc">

                </div>
                <div class="todo-content">
                  {{ todo.content }}
                </div>
                <div class="todo-progress">
                  <span class="todo-badge" :style="{ background: badgeColors[todo.progress] }">
                    {{ todo.progress }}
                  </span>
                </div>
                <div class="todo-priority">
                  <span class="todo-badge" :style="{ background: badgeColors[todo.priority] }">
                    {{ todo.priority }}
                  </span>
                </div>
                
              </template>

              <template v-if="todo.isEdit">
                <div class="todo-etc">

                </div>
                <div class="todo-content">
                  <input type="text" class="form-control" v-model="todo.content" ref="todoContentElem">
                </div>
                <div class="todo-progress">
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" 
                      :style="{ background: badgeColors[todo.progress] }" >
                      {{ todo.progress }} <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li @click="todo.progress = '대기'"><a>대기</a></li>
                      <li @click="todo.progress = '연기'"><a>연기</a></li>
                      <li @click="todo.progress = '진행'"><a>진행</a></li>
                      <li @click="todo.progress = '완료'"><a>완료</a></li>
                    </ul>
                  </div>
                </div>
                <div class="todo-priority">

                  <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" 
                      :style="{ background: badgeColors[todo.priority] }" >
                      {{ todo.priority }} <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li @click="todo.priority = '낮음'"><a>낮음</a></li>
                      <li @click="todo.priority = '중간'"><a>중간</a></li>
                      <li @click="todo.priority = '높음'"><a>높음</a></li>
                    </ul>
                  </div>
                </div>
                
                
              </template>
              

            </div>
            <div class="todo-opts">
                <template v-if="todo.isEdit">
                  <i class="fa fa-check fa-sub" @click.stop="onUpdateTodo(todo)"></i>
                  <i class="fa fa-refresh" @click.stop="shallowCopy(todo, todo.memento)"></i>
                  <i class="fa fa-times" @click.stop="onCancelEdit(todo)"></i>
                </template>
              </div>
          </div>
          
          
          <div class="todo-not-found" v-if="todos.length == 0">
            해당 일에 저장된 일정이 없습니다.
          </div>
          <div class="todo-add">
            <i class="fa fa-plus-square-o" @click.stop="onAddTodo(dt + 1)"></i>
          </div>
        </div>
      </template>
      <template v-if="searchTerm">
        <div class="todo-lt"  v-for="(todo, idx) in searchTodos" :key="idx">

            <div class="todo-etc">

            </div>
            <div class="todo-content" v-html="todo.searchContent">
              
            </div>
            <div class="todo-progress">
              <span class="todo-badge" :style="{ background: badgeColors[todo.progress] }">
                {{ todo.progress }}
              </span>
            </div>
            <div class="todo-priority">
              <span class="todo-badge" :style="{ background: badgeColors[todo.priority] }">
                {{ todo.priority }}
              </span>
            </div>
            <div class="todo-opts">

            </div>
          </div>
      </template>
    </div>
  </div>


</template>

<script>

import mixin from '@/mixins';
import Todo from '@/model/Todo';
import { getters } from '@/store';

import elemBus from '@/elem.bus';

export default {
  name: 'app-todos',
  props: { 
    todos: {}, 
    searchTerm: {
      default: ''
    }
  },
  mixins: [mixin],
  data() {
    
    return {
      console,
      searchTodos: [],
      badgeColors: {
        '높음': '#f88',
        '중간': '#88f',
        '낮음': '#8a8',
        '대기': '#8a8',
        '연기': '#666',
        '진행': '#f88',
        '완료': '#88f'
      }
      // todos: this.$store.state.todos
    }
  },
  created() {

  },

  watch: {
    searchTerm() {
      this.onSearchTodo();
    }
  },
  
  
  computed: {
    ...getters
  },

  methods: {
    

    isTodoHovered(todo) {
      return todo.isHovered;
    },

    onUpdateTodo(todo) {
      todo.isEdit = false;
      this.$http.service.todoService.updateTodo(todo)
        .then(() => {
          todo.memento = undefined;
        })
        .catch((err) => {
          console.error(err);
          elemBus.toast('업데이트를 실패했습니다. 다시 시도해주세요');
          todo.isEdit = true;
        })
    },

    onAddTodo(dt) {
      
      const date = Number(this.getStringDate(this.$route.params.year, this.$route.params.month, dt));
      
      const todo = new Todo({ date, isEdit: true, content: '', priority: '중간', progress: '대기' });
      
      let memento = new Todo();
      memento = this.shallowCopy(memento, todo);
      
      this.$store.state.todos.push(todo);
      
      this.$http.service.todoService.createTodo(todo)
        .then(() => {
          todo.memento = memento;
        })
        .catch(() => {
          console.error(err);
          elemBus.toast('생성을 실패했습니다. 다시 시도해주세요');
          this.deleteObj(this.$store.state.todos, todo);
        })
    },

    onDeleteTodo(todo) {
      const idx = this.deleteObj(this.$store.state.todos, todo);
      if(idx == -1) return;

      this.$http.service.todoService.deleteTodo(todo)
        .then(() => {
          
        })
        .catch(() => {
          console.error(err);
          elemBus.toast('삭제를 실패했습니다. 다시 시도해주세요');
          this.$store.state.todos.splice(idx, 0, todo);
        })


    },

    onSearchTodo() {
      const dts = this.getTodosByDate;
      this.searchTodos = [];
      const yellowCode = '#B87D4B'; 
      for(let todos of dts) {
        for(let todo of todos) {

          if(!todo) continue;
          
          let target = `${todo.content} / ( ${todo.date} )`;
          target = target.replace('undefined', '');
          
          if(!target.includes(this.searchTerm)) continue;

          todo.searchContent = target.replace(this.searchTerm, `<span style="background:${yellowCode}; color:white;">${this.searchTerm}</span>`);
          this.searchTodos.push(todo);
          
        }
      }
    },

    onStartEditTodo(todo) {
      todo.isEdit = true;
      
      todo.memento = this.shallowCopy(new Todo(), todo);

      setTimeout(() => {
        if(!this.$refs.todoContentElem) return;
        this.$refs.todoContentElem[0].focus();
      }, 50);
      
      
    },
    onCancelEdit(todo) {
      this.shallowCopy(todo, todo.memento);
      todo.memento = undefined;
      todo.isEdit = false;
    }
  }
}
</script>


<style scoped lang="scss">
@import '@/assets/variable.scss';

  #app-todos {
    background: white;
    width: 95%;
    display: inline-block;
    box-shadow: 0 0 6px $shadow;
    padding: 20px 48px;
    .target-dt {
      padding: 24px;
      display: block;
      font-size: 24px;
      border-bottom: 2px solid #ddd;
      
    }
    .dropdown-toggle {
      border: 0;
      outline: 0;
    }
    .todos {
      margin-top: 42px;
      
      .dt-group {
        > * {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dropdown-menu {
          li {
            cursor: pointer;
          }
        }
        .fa {
          cursor: pointer;
        }
        .fa-dt-toggler {
          font-size: 24px;
        }

        
        .dt {
          width: 85%;
          padding: 20px 30px 20px 4px;
          border-bottom: 1.5px solid #999;
          font-size: 18px;
        }
        
        .todo-not-found {
          padding: 20px 30px 20px 30px;
          font-size: 18px;
        }
        .todo-add {
          display: flex;
          padding: 20px 30px 20px 30px;
          width: 85%;
          border-bottom: 3px dotted #ddd;
          i {
            margin: auto;
            font-size: 32px;
          }
        }
      }
    }
  }

  .todo-lt-cover {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .todo-opts {
      width: 15%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      i {
        margin: 0 8px;
        font-size: 24px;
      }
    }
  
  .todo-lt {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px 20px 30px;
    border-bottom: 1.5px solid #ddd;
    font-size: 18px;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    .todo-hovered {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: none;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      button {
        margin: 0 24px;
        color: white;
      }
      .btn-edit {
        background: $sprimary;
      }
      .btn-del {
        background: #f66;
      }
    }
    &:hover {
      .todo-hovered {
        display: flex;
      }
    }
    
    
    .todo-etc {
      flex: 1;
    }
    .todo-content {
      flex: 6;
      input {
        width: 80%;
      }
    }
    .todo-progress {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .todo-priority {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    .todo-badge {
      border-radius: 12px;
      font-size: 14px;
      color: white;
      padding: 4px 12px;
      cursor: default;
    }
  }
</style>
