import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/login"
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
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
      path: "/adminActs",
      name: "adminActs",
      component: () => import("../views/home/Home.vue")
    },
    {
      path: "/resumenAct",
      name: "resumenAct",
      component: () => import("../components/ResumeAct.vue")
    },

    {
      path: "/createAct",
      name: "createNewAct",
      component: () => import("../views/act/NewAct.vue")
    }
    
  ]
})

export default router
