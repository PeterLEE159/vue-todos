
import axios from 'axios';
import _ from 'lodash';

import store from '@/store';

export default {

    path: 'todos.json',

    getTodos(year, month) {
        
        const date = `${year}${month}`;
        const path = `${this.path}?orderBy="date"&startAt=${date}00&endAt=${date}99`;
        
        return axios.get(path).then((res) => {
        
            res = axios.parseF(res);
            res = _.sortBy(res, [ 'date' ]);
            store.state.todos = res;
            return res;
        });
    },

    

    createTodo(todo) {

        return axios.post(this.path, todo).then((res) => {
            console.log('todo created');
            return res;
        });
    },


    updateTodo(todo) {
        return axios.put(this.path, todo).then((res) => {
            console.log('todo updated');
            return res;
        });
    },

    deleteTodo(todo) {
        return axios.delete(this.path, todo).then((res) => {
            console.log('todo deleted');
            return res;
        });
    }

}