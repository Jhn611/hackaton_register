<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      positionClass: 'arrow__1', 
      name:"@stanislaw",
    };
  },
  computed: {
    getTransitionName() {
      switch (this.$route.name) {
        case 'home':
          return 'page_swap';
        case 'admin_hackaton_list':
          return 'page_swap';
        case 'admin_users_list':
          return 'page_swap';
        case 'admin_steck_list':
          return 'right';
        case 'admin_ban_word_list':
          return 'left';
        default:
          return 'fade';
      }
    },
  },
  methods: {
    updatePosition(position) {
      if (position === '1') {
        this.positionClass = 'arrow__1';
        localStorage.setItem('arrow', '1');
      } else if (position === '2') {
        this.positionClass = 'arrow__2';
        localStorage.setItem('arrow', '2');
      } else if (position === '3') {
        this.positionClass = 'arrow__3';
        localStorage.setItem('arrow', '3');
      }
      console.log("update!!");
    }
  },
  mounted() {
    const arrow_pos = localStorage.getItem('arrow');
    if(arrow_pos != '' && arrow_pos != null){
      this.updatePosition(arrow_pos);
    }
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="account">
      <img src="./imgs/account_circle.svg" alt="">
      <h1 class="text-h1">{{ name }}</h1>
    </div>
    <nav>
      <div :class="positionClass" class="arrow"><img src="./imgs/arrow.svg" alt=""></div>
      <div class="nav_el">
        <RouterLink @click="updatePosition('1')" to="/admin/hackatons">хакатоны</RouterLink>
        <RouterLink @click="updatePosition('2')" to="/admin/users">участники</RouterLink>
        <RouterLink :class="{white: $route.path === '/admin/banword'}" @click="updatePosition('3')" to="/admin/stecks">стеки</RouterLink>
      </div>
    </nav>
  </div>
  <transition
      :name="getTransitionName"
      mode="out-in">
    <RouterView />
  </transition>
  <div class="switch_theme"></div>
</template>

<style></style>
