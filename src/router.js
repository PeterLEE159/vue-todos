import Vue from 'vue';
import Router from 'vue-router';
import Page from './views/Page.vue';
import TodosPage from './views/TodosPage.vue';


Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{ 
      path: '/', component: Page, children: [
        { path: '', redirect: 'todos'    },
        { path: 'todos', component: TodosPage }

      ]
    },


    { path: '*', redirect: '/toods' }
    // { path: '/about', name: 'about', component: () => import('./views/About.vue') }, // lazy loaded
    
  ],
});
