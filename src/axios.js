import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 서버의 기본 URL을 설정하세요
  timeout: 1000,
});

export default {
  install: (app) => {
    app.config.globalProperties.$axios = instance;
  },
};