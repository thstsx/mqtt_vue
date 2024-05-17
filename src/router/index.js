import { createRouter, createWebHistory } from 'vue-router';
//import Home from './views/Home.vue';
import Publisher from '../components/Publisher.vue';
import Subscriber from '../components/Subscriber.vue';

const routes = [
  //{ path: '/', name: 'home', component: Publisher }, 
  //{ path: '/', name: 'home', component: MainPage },
  //{ path: '/', name: 'Home', component: Home, meta: { title: 'MQTT Home' }},
  // {
     
  { path: '/', component: { template: '<div></div>' } },
  //{ path: '/', redirect: '/' },
  { path: '/publisher', component: Publisher , meta: { title: 'MQTT Publisher (New)' }},
  { path: '/subscriber', component: Subscriber , meta: { title: 'MQTT Subscriber (New)' }},
  //{ path: '/:pathMatch(.*)*', redirect: '/404' }, // Redirect all unmatched paths to "/404" // 
  //{ path: '/404', component: NotFound, meta: { title: '404 Not Found' }}, //
  {
    // Catch all unmatched paths and display a 404 error message
    path: '/:pathMatch(.*)',
    meta: { title: 'Not Found' },
    component: {
      template: `
        <div>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      `
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Set the title to the route's meta title or fallback to a default title
  document.title = to.meta.title || 'Vue App'; 
  next();
});

export default router;
