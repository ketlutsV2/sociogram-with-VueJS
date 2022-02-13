import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Connexion from '../views/Connexion.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/mentions',
    name: 'Mentions',
    component: function () {
      return import('../views/Mentions.vue')
    }
  },
  { path: '/cohorte/:cohorte_id',
  name : 'Cohorte',
  component: function () {
    return import('../views/Cohorte.vue')
  },
  children: [
    {
      path: 'import',
      component: function () {
        return import('@/components/PersonsImport.vue')
      }
    },
    {
      path: '',
      component: function () {
        return import('@/components/CohorteMain.vue')
      }
    }
   
  ],
},
  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
