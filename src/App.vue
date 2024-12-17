<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      admin: true,
      isRegister: true,
      theme_flag: true,
      positionClassAdmin: 'arrow__1', 
      positionClassUser: 'arrow2__1', 
      name:"@stanislaw",
      tg_id: 7890,
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
        this.positionClassAdmin = 'arrow__1';
        localStorage.setItem('arrow', '1');
      } else if (position === '2') {
        this.positionClassAdmin = 'arrow__2';
        localStorage.setItem('arrow', '2');
      } else if (position === '3') {
        this.positionClassAdmin = 'arrow__3';
        localStorage.setItem('arrow', '3');
      }
      console.log("update!!");
    },
    updatePositionUser(position) {
      if (position === '1') {
        this.positionClassUser = 'arrow2__1';
        localStorage.setItem('arrow2', '1');
      } else if (position === '2') {
        this.positionClassUser = 'arrow2__2';
        localStorage.setItem('arrow2', '2');
      } else if (position === '3') {
        this.positionClassUser = 'arrow2__3';
        localStorage.setItem('arrow2', '3');
      }
      console.log("update!!");
    },
    switch_theme_var(event){
      if (this.theme_flag) {
        localStorage.setItem('theme', false)
        this.theme_flag = false;
      }else {
        localStorage.setItem('theme', true)
        this.theme_flag = true;
      }
      this.switch_theme();
    },
    switch_theme(event) {
      console.log(this.theme_flag);
      if (!this.theme_flag) {
        document.documentElement.style.setProperty("--black", "#ffffff");
        document.documentElement.style.setProperty("--bg", "#313131");
        document.documentElement.style.setProperty("--bgopacity", "0.6");
        document.documentElement.style.setProperty("--switcherbg", "#9656e4");
        document.documentElement.style.setProperty("--inputbg", "#383638");
        document.documentElement.style.setProperty("--borderhead", "#393939");
        document.documentElement.style.setProperty("--img", "100%");
        document.documentElement.style.setProperty("--listbg", "#4F4A51");
        document.documentElement.style.setProperty("--scrollbg", "#4F4A51");
        document.documentElement.style.setProperty("--listelcolor", "#4A434C");
        document.documentElement.style.setProperty("--hackstatusbg", "#576D56");
        document.documentElement.style.setProperty("--hackunactivestatusbg", "#664848");
        document.documentElement.style.setProperty("--hackcountrybg", "#636052");
        document.documentElement.style.setProperty("--elhover", "#474747");

      } else {
        document.documentElement.style.setProperty("--black", "#000000");
        document.documentElement.style.setProperty("--bg", "#ffffff");
        document.documentElement.style.setProperty("--bgopacity", "1");
        document.documentElement.style.setProperty("--switcherbg", "#65558f");
        document.documentElement.style.setProperty("--inputbg", "#E1DAE3");
        document.documentElement.style.setProperty("--borderhead", "#dbdbdb");
        document.documentElement.style.setProperty("--img", "0");
        document.documentElement.style.setProperty("--listbg", "#E1DAE3");
        document.documentElement.style.setProperty("--scrollbg", "#E1DAE3");
        document.documentElement.style.setProperty("--listelcolor", "#D2C8D4");
        document.documentElement.style.setProperty("--hackstatusbg", "#C4D6C3");
        document.documentElement.style.setProperty("--hackunactivestatusbg", "#E3ABAB");
        document.documentElement.style.setProperty("--hackcountrybg", "#D6D2C3");
        document.documentElement.style.setProperty("--elhover", "#dbdbdb");
      }
    },
  },
  mounted() {
    const arrow_pos = localStorage.getItem('arrow');
    if(arrow_pos != '' && arrow_pos != null){
      this.updatePosition(arrow_pos);
      console.log(arrow_pos, "UPDATE");
    }
    const arrow_pos2 = localStorage.getItem('arrow2');
    if(arrow_pos2 != '' && arrow_pos2 != null){
      this.updatePositionUser(arrow_pos2);
    }
    
    const isReg = localStorage.getItem('isRegister');
    if(isReg != '' && isReg != null && isReg === 'true'){
      this.isRegister = true;
    }else{
      this.isRegister = false;
    }
    
    const theme = localStorage.getItem("theme");
    if (theme != null){
      if(theme == 'false'){
        this.theme_flag = false;
      }else{
        this.theme_flag = true;
      }
      this.switch_theme();
    }

    if(this.admin){
      if(arrow_pos != '' && arrow_pos != null){
        if(arrow_pos === '1'){
          this.$router.push('/admin/hackatons');
        }else if(arrow_pos === '2'){
          this.$router.push('/admin/users');
        }else if(arrow_pos === '3'){
          this.$router.push('/admin/banwords');
        }
      }
    }else if(!this.isRegister){
      this.$router.push('/user/register');
    }
    else{
      if(arrow_pos2 != '' && arrow_pos2 != null){
        if(arrow_pos2 === '1'){
          this.$router.push('/user/write');
        }else if(arrow_pos2 === '2'){
          this.$router.push('/user/profile');
        }else if(arrow_pos2 === '3'){
          this.$router.push('/user/hackatons');
        }
      }
    }
    localStorage.setItem("telegram_tag", this.name);
    localStorage.setItem("telegram_id", this.tg_id);
  },
  watch: {
    // Следим за изменением пути маршрута
    '$route.path'(newPath, oldPath) {
      console.log(`Маршрут изменился: ${oldPath} → ${newPath}`);
        if(newPath === '/user/write'){
          const isReg = localStorage.getItem('isRegister');
        if(isReg != '' && isReg != null && isReg === 'true'){
          this.isRegister = true;
        }else{
          this.isRegister = false;
        }
      }
    },
  },
};
</script>

<template>
  <div class="over_body"></div>
  <div class="wrapper">
    <div class="account">
      <img class="img_color" src="./imgs/account_circle.svg" alt="">
      <h1 class="text-h1 account__text">{{ name }}</h1>
    </div>
    <nav v-if="admin">
      <div :class="positionClassAdmin" class="arrow"><img src="./imgs/arrow.svg" alt=""></div>
      <div class="nav_el">
        <RouterLink @click="updatePosition('1')" to="/admin/hackatons">хакатоны</RouterLink>
        <RouterLink @click="updatePosition('2')" to="/admin/users">участники</RouterLink>
        <RouterLink :class="{white: $route.path === '/admin/banword'}" @click="updatePosition('3')" to="/admin/stecks">стеки</RouterLink>
      </div>
    </nav>
    <nav v-if="!admin && isRegister">
      <div :class="positionClassUser" class="arrow2"><img src="./imgs/arrow.svg" alt=""></div>
      <div class="nav_el">
        <RouterLink @click="updatePositionUser('1')" to="/user/write">запись</RouterLink>
        <RouterLink @click="updatePositionUser('2')" to="/user/profile">профиль</RouterLink>
        <RouterLink :class="{white: $route.path === '/user/hackatons'}" @click="updatePositionUser('3')" to="/user/hackatons">хакатоны</RouterLink>
      </div>
    </nav>
  </div> 
  <transition
      :name="getTransitionName"
      mode="out-in">
    <RouterView />
  </transition>
  <div class="switch_theme">
    <div class="theme_switch__bg">
        <img class="sun_icon" :class="{
              sun_off: !theme_flag,
              sun_on: theme_flag
            }" src="./imgs/sun.png" alt="" />
        <img class="moon_icon" :class="{
              moon_on: !theme_flag,
              moon_off: theme_flag
            }" src="./imgs/moon.png" alt="" />
        <div @click="switch_theme_var" class="switcher">
          <svg :class="{
              switch_animate_on: !theme_flag,
              switch_animate_off: theme_flag
            }"
            class="switcher__round"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="white" />
          </svg>
        </div>
    </div>
  </div>
</template>

<style></style>
