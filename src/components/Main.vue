<template>
  <div>
    <Header @openServiceModal="openServiceModal" />
    <main>
      <section class="banner">
        <img src="../assets/배너.webp" alt="Banner Image">
        <div class="banner-text">
          <h1 :class="{ 'slide-down': showFirstText }">오늘 뭐 입지?</h1>
          <h1 :class="{ 'slide-up': showSecondText }">고민이 될 땐 WTF!</h1>
          <div class="buttons" :class="{ 'fade-in': showButtons }">
            <button class="btn" @click="openServiceModal">시작하기</button>
            <button class="btn">더 알아보기</button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <Modal :isVisible="showServiceModal" @close="closeServiceModal"/>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer_component.vue';
import Modal from './Service_modal.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Modal,
  },
  data() {
    return {
      showLoginModal: false,
      showServiceModal: false,
      isHovered: '',
      showFirstText: false,
      showSecondText: false,
      showButtons: false,
    };
  },
  mounted() {
    this.animateText();
  },
  methods: {
    openServiceModal() {
      this.showServiceModal = true;
    },
    closeServiceModal() {
      this.showServiceModal = false;
    },
    openLoginModal() {
      this.showLoginModal = true;
    },
    closeLoginModal() {
      this.showLoginModal = false;
    },
    hoverBackground(buttonType) {
      this.isHovered = buttonType;
    },
    navigateToMain() {
      this.$router.push('/');
    },
    animateText() {
      setTimeout(() => {
        this.showFirstText = true;
      }, 500); // 첫 번째 텍스트가 나타나는 시간
      setTimeout(() => {
        this.showSecondText = true;
      }, 1500); // 두 번째 텍스트가 나타나는 시간
      setTimeout(() => {
        this.showButtons = true;
      }, 2500); // 버튼이 나타나는 시간
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  padding-top: 100px; /* 고정 헤더 높이만큼 패딩 추가 */
}

.banner {
  position: relative;
  text-align: center;
  color: white;
  height: 100vh;
  background-color: #f0f0f0; /* Placeholder background color */
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  bottom: 35%;
  left: 25%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2; 
}

.banner-text h1 {
  font-size: 60px;
  margin: 20px 20px;
  margin-bottom: 20px;
  opacity: 0; 
  transition: opacity 1s, transform 1s; 
}

.banner-text h1.slide-down {
  opacity: 1; 
  transform: translateY(0); 
  animation: slideDown 1s forwards;
}

.banner-text h1.slide-up {
  opacity: 1; 
  transform: translateY(0); 
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
  transition: opacity 1s; 
}

.buttons.fade-in {
  opacity: 1; 
}

.buttons .btn {
  background-color: black;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 25px;
  margin: 0 55px;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
  width: 200px;
  margin-top: 30px;
}

.buttons .btn:hover {
  background-color: gray;
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
}
</style>


<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  padding-top: 100px; /* 고정 헤더 높이만큼 패딩 추가 */
}

.banner {
  position: relative;
  text-align: center;
  color: white;
  height: 100vh;
  background-color: #f0f0f0; /* Placeholder background color */
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text {
  position: absolute;
  bottom: 35%;
  left: 25%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 2; 
}

.banner-text h1 {
  font-size: 60px;
  margin: 20px 20px;
  margin-bottom: 20px;
  opacity: 0; 
  transition: opacity 1s, transform 1s; 
}

.banner-text h1.slide-down {
  opacity: 1; 
  transform: translateY(0); 
  animation: slideDown 1s forwards;
}

.banner-text h1.slide-up {
  opacity: 1; 
  transform: translateY(0); 
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
  transition: opacity 1s; 
}

.buttons.fade-in {
  opacity: 1; 
}

.buttons .btn {
  background-color: black;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 25px;
  margin: 0 55px;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
  width: 200px;
  margin-top: 30px;
}

.buttons .btn:hover {
  background-color: gray;
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
}
</style>
