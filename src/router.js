import VueRouter from 'vue-router';
import AppComponent from '@/App.vue';
import PageComponent from '@/components/Page.vue';
import TodoPageComponent from '@/components/TodoPage.vue';
import UserPageComponent from '@/components/UserPage.vue';


const date = new Date();
const redirect = `/todos/${date.getFullYear()}/${String(date.getMonth()+1).padStart(2, '0')}`;

const routes = [
  { 
    
    path: '', component: PageComponent, redirect: redirect, children: [
        { path: 'todos/:year/:month', component: TodoPageComponent, props: true, hash: 'day' },
        { path: 'users', component: UserPageComponent }
      ]
      
    
  },

  { path: '*', redirect }

];



export default new VueRouter({
  routes,
  mode: 'history'
  // scrollBehavior(to, from, savedPosition) {

  //   if(to.hash) return { selector: to.hash };
  //   if(savedPosition) return savedPosition;

  //   return { x: 0, y: 0 };
  // }
});