import { createRouter, createWebHistory } from 'vue-router';
import BookView from '../views/BookView.vue';
import AuthView from '../views/AuthView.vue';
import AdminView from '../views/AdminView.vue';
import { useUserStore } from '@/stores/user';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { role: 'user' },
      component: BookView,
    },
    // Create Go back button on component which will go to last route
    {
      path: '/auth',
      name: 'auth',
      meta: { role: 'none' },
      component: AuthView,
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { role: 'admin' },
      component: AdminView,
    },
  ],
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  if (!userStore.userToken && to.name !== 'auth') {
    return { name: 'auth' }
  } else if (userStore.userToken && to.name === 'auth') {
    return { name: '/' }
  }


  // this route requires condition to be accessed
  // if not, redirect to home page. 
  // if (false) {
  //   //check codition is false
  //   next({ path: '/' })
  // } else {
  //   //check codition is true
  //   next()
  // }
})

export default router;