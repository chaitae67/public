<template>
  <div v-if="isVisible" class="modal-overlay fade-in" @click.self="closeModal">
    <button class="global-close-button" @click="goHome">X</button>
    <div class="modal-content">
      <!-- 첫 번째 모달: 환영 메시지와 시작하기 버튼 -->
      <div v-if="step === 1">
        <p class="welcome-text">{{ displayedText }}</p>
        <div v-if="showNextButton" class="next-button-container">
          <button @click="nextStep" class="styled-button" style="margin-right: 10px;">시작하기</button>
        </div>
      </div>

      <!-- 두 번째 모달: 성별 입력 -->
      <div v-if="step === 2">
        <h1 class="Modal-title" style="margin-bottom: 50px;">귀하의 성별을 입력해주세요</h1>
        <div class="radio-container">
          <input type="radio" id="male" value="male" v-model="gender">
          <label for="male">남</label>
          <input type="radio" id="female" value="female" v-model="gender">
          <label for="female">여</label>
        </div>
        <div class="button-container">
          <button @click="nextStep" class="styled-button">다음</button>
        </div>
      </div>

      <!-- 세 번째 모달: 연령대 입력 -->
      <div v-if="step === 3">
        <h1 class="Modal-title" style="margin-bottom: 50px;">귀하의 연령대를 입력해주세요</h1>
        <div class="radio-container">
          <input type="radio" id="10s" value="10대" v-model="ageGroup">
          <label for="10s">10대</label>
          <input type="radio" id="20s" value="20대" v-model="ageGroup">
          <label for="20s">20대</label>
          <input type="radio" id="30s" value="30대" v-model="ageGroup">
          <label for="30s">30대</label>
          <input type="radio" id="40s" value="40대" v-model="ageGroup">
          <label for="40s">40대</label>
          <input type="radio" id="50s" value="50대" v-model="ageGroup">
          <label for="50s">50대</label>
          <input type="radio" id="60s" value="60대" v-model="ageGroup">
          <label for="60s">60대</label>
        </div>
        <div class="button-container">
          <button @click="nextStep" class="styled-button">다음</button>
        </div>
      </div>

      <!-- 네 번째 모달: 위치 확인 -->
      <div v-if="step === 4">
        <h1 class="Modal-title" style="margin-bottom: 40px;">현재 당신의 위치는 여기가 맞습니까?</h1>
        <div style="margin-right: auto;">
          <Weather class="weather" @weather-updated="updateWeatherData" />
        </div>
        <div class="map-container">
          <KakaoMap class="map" />
        </div>
        <div class="p-container">
          <p style="font-size: 13px; margin-right: auto; margin-top: 0; color:yellow">*어느정도 오차가 있을 수 있습니다. 날씨정보가 뜨면 버튼을 눌러주세요.</p>
        </div>
        <div class="button-container">
          <button @click="confirmLocationAndFetchData" class="styled-button">맞습니다</button>
        </div>
      </div>

      <!-- 다섯 번째 모달: 로딩 화면 -->
      <div v-if="step === 6">
        <div class="loading_container">
          <div class="loading-content">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading...</p>
            <p class="loading-subtext">{{ loadingMessage }}</p>
          </div>
        </div>
      </div>

      <!-- 여섯 번째 모달: 오늘의 추천 아이템 표시 -->
      <div v-if="step === 5">
        <div class="recommend-container">
          <h1 class="Modal-title">Today's Pick</h1>
          <div class="choice-content">
            <div class="top-container">
              <p class="choice-text">Top</p>
              <div class="top-box">
                <img :src="recommendation.top" alt="Top Image" class="top-image">
              </div>
              <p class="choice-text">Pants</p>
              <div class="pants-box">
                <img :src="recommendation.pants" alt="Pants Image" class="pants-image">
              </div>
            </div>
            <div class="view-container">
              <p class="choice-text">View</p>
              <div class="view-box">
                <img :src="recommendation.view" alt="View Image" class="view-image">
              </div>
            </div>
            <div class="outer-container">
              <p class="choice-text">Outer</p>
              <div class="outer-box">
                <img :src="recommendation.outer" alt="Outer Image" class="outer-image">
              </div>
              <p class="choice-text">Shoes</p>
              <div class="shoes-box">
                <img :src="recommendation.shoes" alt="Shoes Image" class="shoes-image">
              </div>
            </div>
          </div>
          <div style="margin-right: 0">
            <Weather class="weather" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import Weather from './Weather.vue';
import KakaoMap from './Kakao_map.vue';

export default {
  name: 'ServiceModal',
  components: {
    Weather,
    KakaoMap,
  },
  props: {
    isVisible: Boolean,
    modalTitle: String
  },
  data() {
    return {
      step: 1,
      welcomeText: '안녕하세요! WTF의 날씨 기반 옷 추천 서비스 입니다.',
      additionalText: '해당 서비스는 사용자의 위치를 기반으로 제공되며\n위치정보수집 동의를 허용하지 않을 시 서비스 이용이 제한될 수 있습니다.',
      displayedText: '',
      currentIndex: 0,
      currentText: 'welcomeText',
      showNextButton: false,
      recommendation: {
        top: '',
        pants: '',
        view: '',
        outer: '',
        shoes: ''
      },
      gender: '',
      ageGroup: '',
      weatherData: null,
      loadingMessages: [
        "데이터를 분석중입니다",
        "AI가 옷장에서 옷을 꺼내는 중입니다",
        "추천 아이템을 선택 중입니다"
      ],
      currentMessageIndex: 0,
      loadingMessage: "AI가 옷장에서 옷을 고르는 중입니다",
      loadingDots: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    nextStep() {
      if (this.step === 2 && !this.gender) {
        alert('성별을 선택해주세요.');
        return;
      }
      if (this.step === 3 && !this.ageGroup) {
        alert('연령대를 선택해주세요.');
        return;
      }
      if (this.step < 6) {
        this.step++;
        this.showNextButton = false;
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
        this.showNextButton = false;
      }
    },
    goHome() {
      this.$emit('close');
      this.$router.push('/');
    },
    typeText() {
      const text = this[this.currentText];
      if (this.currentIndex < text.length) {
        this.displayedText += text.charAt(this.currentIndex);
        this.currentIndex++;
        setTimeout(this.typeText, 40);
      } else {
        if (this.currentText === 'welcomeText') {
          setTimeout(() => {
            this.displayedText = '';
            this.currentIndex = 0;
            this.currentText = 'additionalText';
            setTimeout(this.typeText, 100);
          }, 500);
        } else if (this.currentText === 'additionalText') {
          setTimeout(() => {
            this.showNextButton = true;
          }, 1200);
        }
      }
    },
    prevImage(type) {
      if (type === 'top') {
        this.topIndex = (this.topIndex > 0) ? this.topIndex - 1 : this.topImages.length - 1;
      } else if (type === 'pants') {
        this.pantsIndex = (this.pantsIndex > 0) ? this.pantsIndex - 1 : this.pantsImages.length - 1;
      } else if (type === 'view') {
        this.viewIndex = (this.viewIndex > 0) ? this.viewIndex - 1 : this.viewImages.length - 1;
      } else if (type === 'outer') {
        this.outerIndex = (this.outerIndex > 0) ? this.outerIndex - 1 : this.outerImages.length - 1;
      } else if (type === 'shoes') {
        this.shoesIndex = (this.shoesIndex > 0) ? this.shoesIndex - 1 : this.shoesImages.length - 1;
      }
    },
    nextImage(type) {
      if (type === 'top') {
        this.topIndex = (this.topIndex < this.topImages.length - 1) ? this.topIndex + 1 : 0;
      } else if (type === 'pants') {
        this.pantsIndex = (this.pantsIndex < this.pantsImages.length - 1) ? this.pantsIndex + 1 : 0;
      } else if (type === 'view') {
        this.viewIndex = (this.viewIndex < this.viewImages.length - 1) ? this.viewIndex + 1 : 0;
      } else if (type === 'outer') {
        this.outerIndex = (this.outerIndex < this.outerImages.length - 1) ? this.outerIndex + 1 : 0;
      } else if (type === 'shoes') {
        this.shoesIndex = (this.shoesIndex < this.shoesImages.length - 1) ? this.shoesIndex + 1 : 0;
      }
    },
    updateWeatherData(data) {
      this.weatherData = data;
    },
    confirmLocationAndFetchData() {
      var self = this;
      const data = {
        gender: this.gender,
        ageGroup: this.ageGroup,
        weatherData: this.weatherData
      };
      axios.post('https://b171f1e5-1f22-4284-87e4-d649c2a4a433.mock.pstmn.io/weather', data)
        .then(function (response) {
          console.log("Data sent to server successfully");
          self.fetchRecommendations();
        })
        .catch(function (error) {
          console.error("Error sending data to server:", error);
          self.fetchRecommendations();
        });
    },
    fetchRecommendations() {
      this.step = 5;
      axios.get('https://b171f1e5-1f22-4284-87e4-d649c2a4a433.mock.pstmn.io')
        .then(response => {
          this.recommendation = response.data;
          this.nextStep();
        })
        .catch(error => {
          console.error("Error fetching recommendations:", error);
        });
    },
    startLoadingAnimation() {
      this.loadingInterval = setInterval(() => {
        this.loadingDots += ".";
        if (this.loadingDots.length > 4) {
          this.loadingDots = "";
          this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
          this.loadingMessage = this.loadingMessages[this.currentMessageIndex];
        } else {
          this.loadingMessage = `${this.loadingMessages[this.currentMessageIndex]}${this.loadingDots}`;
        }
      }, 500);
    }
  },
  beforeDestroy() {
    clearInterval(this.loadingInterval);
  },
  mounted() {
    this.startLoadingAnimation();
  },
  watch: {
    isVisible(newVal) {
      if (newVal && this.step === 1) {
        setTimeout(() => {
          this.typeText();
        }, 1500);
      }
    },
    step(newStep) {
      if (newStep === 1) {
        this.displayedText = '';
        this.currentIndex = 0;
        this.currentText = 'welcomeText';
        this.typeText();
      }
    }
  }
};
</script>





<style scoped>
@font-face {
  font-family: 'rabit';
  src: url('../assets/NanumSquare_acR.ttf') format('truetype');
}

.Modal-title {
  color: white;
  font-size: 50px;
  margin-bottom: 0;
  margin-top: 0;
}

.choice-text {
  font-size: 20px;
}

.welcome-text {
  font-family: 'rabit', sans-serif;
  white-space: pre-line;
  line-height: 2;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 2s forwards;
}

.global-close-button {
  position: fixed;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: white;
  z-index: 1100;
  margin-right: 30px;
  margin-top: 30px;
}

.radio-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 40px;

}

.radio-container input[type="radio"] {
  margin: 0 5px 0 0;
}

.radio-container label {
  margin: 0 20px 0 0;
}



.choice-content {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  height: 750px;
}

.pants-box {
  background: white;
  width: 300px;
  height: 393px;
  position: relative;
}

.top-box {
  background: white;
  width: 300px;
  height: 200px;
  position: relative;
}

.view-box {
  background: white;
  height: 660px;
  width: 300px;
  position: relative;
}

.outer-box {
  background: white;
  width: 300px;
  height: 443px;
  position: relative;
}

.shoes-box {
  background: white;
  width: 300px;
  height: 150px;
  position: relative;
}

.top-image {
  width: 300px;
  height: 200px;
}

.pants-image {
  width: 300px;
  height: 393px;
}

.view-image {
  width: 300px;
  height: 660px;
}

.outer-image {
  width: 300px;
  height: 443px;
}

.shoes-image {
  width: 300px;
  height: 150px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  z-index: 2;
}

.nav-button.prev {
  left: 0;
}

.nav-button.next {
  right: 0;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  max-width: 1250px;
  text-align: center;
  color: white;
  font-size: 60px;
  font-weight: bolder;
}

.SecondModal-content {
  max-width: 1250px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.next-button-container {
  margin-top: 40px;
  animation: fadeIn 2s forwards;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.button-container {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  position: relative;
  margin-top: 20px;
  width: 100%;
}

.p-container {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  position: relative;
  width: 100%;
}

.styled-button {
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background: none;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  min-width: 200px;
  text-align: center;
  font-weight: bold;
}

.styled-button:hover {
  background-color: white;
  color: black;
}

.weather {
  border-radius: 8px;
  color: white;
  width: 100%;
  text-align: center;
  z-index: 2;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.map {
  width: 100%;
  height: 500px;
  z-index: 1;
}

.Recommend-container {
  border: 2px solid white;
  width: 1850px;
  height: 900px;
}

.top-container,
.view-container,
.outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 750px;
  margin-top: 0;
  margin-right: 100px;
  margin-left: 100px;
}

.loading_container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* 화면의 중앙에 배치하기 위해 */
}

.loading-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.loading-spinner {
  border: 16px solid #f3f3f3;
  /* Light grey */
  border-top: 16px solid #106586;
  /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loading-text {
  font-size: 20px;
  margin-top: 15px;
  /* 스피너 아래에 배치하기 위해 */
}

.loading-subtext {
  font-size: 30px;
  margin-top: 20px;
  /* "Loading..." 텍스트 아래에 배치하기 위해 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
