import store from '@/store';
import axios from 'axios';

export default {

  path: 'users.json',

  getUsers() {
    return axios.get(this.path).then((res) => {
      res = axios.parseF(res);
      store.state.users = res;
      return res;
    })
},
  createUser(user) {
    return axios.post(this.path, user).then((res) => {
      return res;
    })
  }
}