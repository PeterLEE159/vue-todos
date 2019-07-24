
import axios from 'axios';
import _ from 'lodash';

import store from '@/store';

export default {

    path: 'todos',

    getTodos(year, month) {
        
        const date = `${year}${month}`;
        const path = `${this.path}.json?orderBy="date"&startAt=${date}00&endAt=${date}99`;
        
        return axios.get(path).then((res) => {
            res = axios.parseF(res);
            res = _.sortBy(res, [ 'date' ]);
            store.state.todos = res;
            return res;
        });
    },

    

    createTodo(todo) {
        return axios.post(`${this.path}.json`, todo).then((res) => {
            todo.key = res.name;
            return todo;
        });
    },


    updateTodo(todo) {
        return axios.put(`${this.path}/${todo.key}.json`, todo).then((res) => {
            return res;
        });
    },

    deleteTodo(todo) {
        return axios.delete(`${this.path}/${todo.key}.json`, todo).then((res) => {
            return res;
        });
    }

}