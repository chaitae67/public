import { createStore } from 'vuex';
import axios from 'axios';
import router from './router';

const clientId = "OqNmmISRl_zHT1brO3lB"; // Naver Client ID

export default createStore({
  state() {
    return {
      userId: '',
      nickname: '',
      isLoggedIn: false,
    };
  },
  mutations: {
    userinfo(state, userData) {
      state.userId = userData.userId;
      state.nickname = userData.nickname;
      state.isLoggedIn = true;
    },
    LOGOUT(state) {
      state.userId = '';
      state.nickname = '';
      state.isLoggedIn = false;
    },
    SET_USER_FROM_STORAGE(state) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        state.userId = userInfo.userId;
        state.nickname = userInfo.nickname;
        state.isLoggedIn = true;
      }
    }
  },
  actions: {
    navigateToMain() {
      router.push('/');
    },
    navigateToRank() {
      router.push('/rank');
    },
    navigateToOOTD() {
      router.push('/ootd');
    },
    
    login({ commit }, { userId, userPassword }) {
      return new Promise((resolve, reject) => {
        axios.post('http://220.69.241.101:3001/login', {
          userId,
          userPassword,
        })
          .then(response => {
            console.log('로그인 성공:', response);
            const userData = {
              userId: response.data.response.userId,
              nickname: response.data.response.nickname,
            };
            commit('userinfo', userData);
            // 로컬 스토리지에 유저 정보 저장
            localStorage.setItem('userInfo', JSON.stringify(userData));
            resolve(response);
          })
          .catch(error => {
            console.error('로그인 실패:', error);
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit('LOGOUT');
      localStorage.removeItem('userInfo'); // 로그아웃 시 로컬 스토리지에서 유저 정보 삭제
      console.log('로그아웃 되었습니다');
    },

    loadKakaoSdk() {
      return new Promise((resolve, reject) => {
        if (typeof Kakao !== 'undefined') {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.onload = () => {
          Kakao.init('2ea274d8c03a1a0e23a75378ec0afcb5'); // KaKao client key
          console.log('Kakao SDK 로드 성공');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Kakao SDK 로드 실패', error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    },

    async loginKakao({ dispatch, commit }) {
      try {
        await dispatch('loadKakaoSdk');
        Kakao.Auth.authorize({
          redirectUri: `${window.location.origin}/kakao-callback`
        });
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    },

    handleKakaoCallback({ commit }, { code }) {
      axios.post(`https://kauth.kakao.com/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: '2ea274d8c03a1a0e23a75378ec0afcb5', 
        redirect_uri: `${window.location.origin}/kakao-callback`,
        code: code,
      })
      .then(response => {
        const { access_token } = response.data;
        return axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
      })
      .then(response => {
        const userData = {
          userId: response.data.id,
          nickname: response.data.properties.nickname,
        };
        commit('userinfo', userData);
        localStorage.setItem('userInfo', JSON.stringify(userData)); // 로컬 스토리지에 유저 정보 저장
        router.push('/');
      })
      .catch(error => {
        console.error('카카오 로그인 실패:', error);
      });
    },

    loadNaverSdk() {
      return new Promise((resolve, reject) => {
        if (typeof window.naver !== 'undefined' && typeof window.naver.LoginWithNaverId !== 'undefined') {
          console.log('Naver SDK 이미 로드됨');
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
        script.onload = () => {
          console.log('Naver SDK 로드 성공');
          resolve();
        };
        script.onerror = (error) => {
          console.error('Naver SDK 로드 실패', error);
          reject(error);
        };
        document.head.appendChild(script);
      });
    },

    generateState() {
      const state = (new Date()).getTime().toString(36);
      sessionStorage.setItem('naver_state', state);
      return state;
    },
    async loginNaver({ dispatch }) {
      try {
        await dispatch('loadNaverSdk');
        const state = dispatch('generateState');
        const redirectUri = encodeURIComponent(`${window.location.origin}/naver-callback`);
        const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
        window.location.href = url;
      } catch (error) {
        console.error('네이버 로그인 실패:', error);
      }
    }
  }
});
