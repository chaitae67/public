<template>
  <header>
    <div class="navbar">
      <img @click="navigateToMain" src="../assets/WTF-W.svg" style="width: 80px; height: 80px; margin-left: 50px; cursor: pointer;">
      <nav>
        <ul>
          <li><a class="list_font" href="#">ABOUT</a></li>
          <li><a class="list_font" href="#" @click.prevent="openServiceModal">SERVICE</a></li>
          <li><a @click="navigateToOOTD" class="list_font" href="#">OOTD</a></li>
          <li><a @click="navigateToRank" class="list_font">RANK</a></li>
        </ul>
      </nav>
      <div class="login-signup">
        <a v-if="!isLoggedIn" style="font-weight: bolder; margin-right: 50px" href="#" @click.prevent="openLoginModal">Login / Sign Up</a>
        <div v-else class="login_text">
          <span style="font-weight: 900;">{{ nickname }}</span>님 환영합니다
          <img :src="getDropdownIcon(showDropdown)" @click="toggleDropdown" style="width: 20px; height: 20px; cursor: pointer; margin-left: 10px;">
          <div v-if="showDropdown" class="dropdown">
            <ul>
              <li><a @click="logout" style="color: red; cursor: pointer;">로그아웃</a></li>
              <li><a @click="navigateToMyPage" style="color: black; cursor: pointer;">마이페이지</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal :isVisible="showServiceModal" @close="closeServiceModal"/>
    <div class="Modal_background" v-if="showLoginModal">
      <div class="Modal_container">
        <button class="closemodal_icon" @click="closeLoginModal">
          <img src="../assets/x.svg" style="width: 30px; height: 30px" />
        </button>
        <img src="../assets/WTF로고.svg" class="modal_logo" />
        <div class="title_box">내일 뭐 입지? 고민이 될 땐!</div>
        <div class="subtitle_box">쉽고 빠르게 시작하세요</div>
        <div class="button_container">
          <button class="login_button" @click="loginKakao" @mouseover="hoverBackground('kakao')"
            @mouseleave="hoverBackground('')"
            :style="isHovered === 'kakao' ? { backgroundColor: 'rgb(60, 52, 31)', color: 'white' } : {}">
            <div class="button_background kakao_button"></div>
            카카오로 이용하기
          </button>
          <button class="login_button" @click="loginNaver" @mouseover="hoverBackground('naver')" @mouseleave="hoverBackground('')"
            :style="isHovered === 'naver' ? { backgroundColor: 'rgb(3, 199, 90)', color: 'white' } : {}">
            <div class="button_background naver_button"></div>
            네이버로 이용하기
          </button>
          <a class="id_button" href="LogIn" @mouseover="hoverBackground('idpw')" @mouseleave="hoverBackground('')"
            :style="isHovered === 'idpw' ? { backgroundColor: 'rgb(0,0,0)', color: 'white' } : {}">
            <div class="button_background basic_button"></div>
            ID/PW로 이용하기
          </a>
        </div>
        <div class="modal_footer">
          <p>도움이 필요하면 이메일 또는 고객센터 1111-2222로 문의 부탁드립니다.<br>
            고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)</p>
        </div>
      </div>
    </div>
  </header>
</template>



<script>
import { mapActions, mapState } from 'vuex';
import Modal from './Service_modal.vue';

export default {
  name: 'Header',
  components: {
    Modal
  },
  data() {
    return {
      showLoginModal: false,
      isHovered: '',
      showServiceModal: false,
      showDropdown: false,
    };
  },
  computed: {
    ...mapState(['isLoggedIn', 'nickname'])
  },
  methods: {
    ...mapActions(['loginNaver', 'loginKakao', 'navigateToRank', 'navigateToMain', 'loadKakaoSdk', 'loadNaverSdk', 'navigateToOOTD']),
    openLoginModal() {
      this.showLoginModal = true;
    },
    closeLoginModal() {
      this.showLoginModal = false;
    },
    openServiceModal() {
      this.showServiceModal = true;
    },
    closeServiceModal() {
      this.showServiceModal = false;
    },
    hoverBackground(buttonType) {
      this.isHovered = buttonType;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown; 
    },
    logout() {
      localStorage.removeItem('user'); 
      this.$store.dispatch('logout'); 
      this.showDropdown = false; 
    },
    navigateToMyPage() {
      this.$router.push('/mypage'); 
      this.showDropdown = false; 
    },
    getDropdownIcon(state) {
      return state ? require('../assets/down-w.svg') : require('../assets/up-w.svg');
    },
  },
  mounted() {
    this.loadKakaoSdk();
    this.loadNaverSdk();
    this.$store.commit('SET_USER_FROM_STORAGE'); 
  }
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Arial', sans-serif;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  margin-right: 10px;
}

.dropdown ul {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.dropdown ul li {
  padding: 8px 12px;
}

.dropdown ul li a {
  text-decoration: none;
  color: black;
  display: block;
}

.dropdown ul li a:hover {
  background-color: #f0f0f0;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.login_text {
  color: white;
  margin-right: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-right: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  position: relative;
}

nav ul li a::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: green;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

nav ul li a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.login-signup a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.banner {
  position: relative;
  text-align: center;
  color: white;
  height: 100vh;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
}

.banner-text {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.banner-text h1 {
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0;
  /* 초기 상태에서 투명하게 설정 */
  transition: opacity 1s, transform 1s;
  /* 투명도와 변형 애니메이션 설정 */
}

.banner-text h1.slide-down {
  opacity: 1;
  /* 애니메이션 후 투명도 설정 */
  transform: translateY(0);
  /* 애니메이션 후 위치 설정 */
  animation: slideDown 1s forwards;
}

.banner-text h1.slide-up {
  opacity: 1;
  /* 애니메이션 후 투명도 설정 */
  transform: translateY(0);
  /* 애니메이션 후 위치 설정 */
  animation: slideUp 1s forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.buttons {
  opacity: 0;
  /* 초기 상태에서 투명하게 설정 */
  transition: opacity 1s;
  /* 투명도 애니메이션 설정 */
}

.buttons.fade-in {
  opacity: 1;
  /* 애니메이션 후 투명도 설정 */
}

.buttons .btn {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}

.buttons .btn:hover {
  background-color: gray;
}

.list_font {
  font-size: 22px;
  font-weight: bold;
  margin-left: 35px;
  cursor: pointer;
}

.Modal_background {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  display: flex;
}

.Modal_container {
  background: rgb(247, 247, 247);
  width: 90%;
  max-width: 420px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 50px 0px;
  position: relative;
  padding-top: 40px;
}

.closemodal_icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.modal_logo {
  height: 90px;
  width: 90px;
  display: block;
  margin: auto auto 20px;
}

.title_box {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.subtitle_box {
  line-height: 1.5;
  margin-bottom: 35px;
  text-align: center;
  font-weight: normal;
}

.button_container {
  padding: 0px 20px;
}

.login_button {
  width: 100%;
  height: 38px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 7px 0px;
  background: rgb(255, 255, 255);
  text-align: center;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  border: none;
  color: black;
  cursor: pointer;
}

.id_button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 7px 0px;
  background: rgb(255, 255, 255);
  text-align: center;
  border-radius: 4px;
  margin-bottom: 12px;
  position: relative;
  padding: 0;
  text-decoration: none;
  font-size: 13.3px;
  color: black;
}

.button_background {
  position: absolute;
  top: calc(50% - 12px);
  left: 35px;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
}

.modal_footer {
  padding: 2.5rem 2rem 1.5rem;
  font-size: 11px;
  line-height: 1.5;
  color: rgb(153, 153, 153);
}

@media (max-width: 768px) {
  .banner-text h1 {
    font-size: 32px;
  }

  .buttons .btn {
    font-size: 16px;
    padding: 8px 16px;
    margin: 0 5px;
  }

  .modal_footer {
    font-size: 10px;
  }

  .title_box {
    font-size: 18px;
  }

  .subtitle_box {
    font-size: 14px;
  }

  .login_button,
  .id_button {
    height: 34px;
  }
}
</style>
