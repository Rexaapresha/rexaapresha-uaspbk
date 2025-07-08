import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Courses from '../views/Courses.vue'
import Grades from '../views/Grades.vue'
import Krs from '../views/Krs.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/courses', component: Courses },
  { path: '/grades', component: Grades },
  { path: '/krs', component: Krs }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
