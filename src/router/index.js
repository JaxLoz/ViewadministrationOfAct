import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      children: [
        {
          path: "/adminActs",
          name: "adminActs",
          component: () => import("../views/home/Home.vue")
        },
        {
          path: "/createAct",
          name: "createNewAct",
          component: () => import("../views/act/NewAct.vue")
        }
      ]
    },

    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: "/registro",
          name: "formRegister",
          component: () => import("../views/auth/Registro.vue")
        },
        {
          path: "/login",
          name: "formLogin",
          component: () => import("../views/auth/Login.vue")
        },
        
        {
          path: "/mailVerification",
          name: "mailVerification",
          component: () => import("../views/auth/EmailVerification.vue")
        },
        {
          path: "/viewAct",
          name: "viewAct",
          component: () => import("../views/act/ViewAct.vue")
        }
      ]
    }
    
  ]
})

export default router
