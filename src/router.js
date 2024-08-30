import { createWebHistory, createRouter } from "vue-router";
import login from '../src/components/LogIn.vue';
import signup from '../src/components/SignUp.vue';
import header from './components/Header.vue';
import main from './components/Main.vue';
import kakaologin from './components/kakao-callback.vue';
import naverlogin from './components/naver-callback.vue';
import rank from './components/Rank.vue';
import ootd from './components/OOTD.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup,
  },
  {
    path: '/header',
    name: 'header',
    component: header,
  },
  {
    path: '/',
    name: 'main',
    component: main,
  },
  {
    path: '/kakao-callback',
    name: 'KakaoCallback',
    component: kakaologin,
  },
  {
    path: '/naver-callback',
    name: 'Naver-callback',
    component: naverlogin,
  },
  {
    path: '/rank',
    name: 'rank',
    component: rank,
  },
  {
    path: '/ootd',
    name: 'ootd',
    component: ootd,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;