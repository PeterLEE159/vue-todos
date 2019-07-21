import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/store';

Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
