import AdminHackatons from '@/views/AdminHackatons.vue'
import AdminUsersList from '@/views/AdminUsersList.vue'
import AdminSteckList from '@/views/AdminSteckList.vue'
import AdminBanWordList from '@/views/AdminBanWordList.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserView,
    },
    {
      path: '/admin/hackatons',
      name: 'admin_hackaton_list',
      component: AdminHackatons,
    },
    {
      path: '/admin/users',
      name: 'admin_users_list',
      component: AdminUsersList,
    },
    {
      path: '/admin/stecks',
      name: 'admin_steck_list',
      component: AdminSteckList,
    },
    {
      path: '/admin/banword',
      name: 'admin_ban_word_list',
      component: AdminBanWordList,
    },
  ],
})

export default router
