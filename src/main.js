import Vue from 'vue';

import VueRx from 'vue-rx';
import axios from 'axios';
import VTooltip from 'v-tooltip'
import UUID from 'vue-uuid';
import VueLodash from 'vue-lodash'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';

import App from './App.vue';
import store from './store';
import router from '@/router';



 
Vue.use(VTooltip)
Vue.use(VueRx);
Vue.use(VueAxios, axios);
Vue.use(VueLodash, { name: 'lodash' });
Vue.use(UUID);
Vue.use(VueRouter);


require('./http.conf');

Vue.mixin({
  methods: {
    
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
