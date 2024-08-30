<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="../assets/WTF-W.svg" class="footer_logo" alt="Company Logo" />
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <p>ABOUT US</p>
          <p>CONTACT US</p>
          <p>AFFILIATES</p>
          <p>RESOURCES</p>
        </div>
        <div class="footer-column">
          <p>SERVICES</p>
          <p>THEME TWEAK</p>
        </div>
        <div class="footer-column">
          <p>NEWS</p>
          <p>SNS</p>
          <p>ACCOUNT</p>
        </div>
        <div class="footer-column">
          <p>SHOWCASE</p>
          <p>WIDGETKIT</p>
          <p>SUPPORT</p>
        </div>
        <div class="footer-column">
          <p>COMPANY</p>
          <p>ABOUT</p>
          <p>MUSINSA</p>
          <P>COLLABORATION</P>
        </div>
      </div>
      <div class="footer-social">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-rss"></i>
        <i class="fab fa-google-plus"></i>
        <i class="fab fa-ellipsis-h"></i>
      </div>
      <div class="footer-line"></div> <!-- 가로 선 추가 -->
      <div class="footer-copyright">
        <p>©Copyright. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  width: 100%;
  margin-top: 50px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 50px;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 20px;
  left: 20px;
}

.footer-logo img {
  width: 110px;
  height: auto;
  margin-bottom: 10px;
}

.footer-logo p {
  font-size: 16px;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
  margin-top: 10px;
  margin-left: 400px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-column p {
  margin: 5px 0;
  font-size: 16px; /* 글꼴 크기 키움 */
}

.footer-social {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.footer-social i {
  font-size: 18px;
  margin: 0 10px;
}

.footer-line {
  width: 100%;
  max-width: 1400px;
  border-top: 2px solid #535353; /* 가로 선 스타일 */
  margin: 30px 0; /* 선 위아래 간격 */
}

.footer-copyright {
  width: 100%;
  max-width: 1400px;
  text-align: center;
}

.footer-copyright p {
  font-size: 14px; /* 글꼴 크기 키움 */
  margin: 0;
  margin-bottom: 10px;
}

/* 반응형 스타일 */
@media (max-width: 1200px) {
  .footer-container {
    max-width: 1000px;
  }
  .footer-links {
    margin-left: 200px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    max-width: 750px;
    margin-top: 30px;
  }
  .footer-logo {
    position: static;
    align-items: center;
    text-align: center;
  }
  .footer-links {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
  .footer-column {
    margin-bottom: 20px;
  }
  .footer-logo img {
    margin-bottom: 5px;
  }
  .footer-line {
    max-width: 750px;
  }
  .footer-copyright {
    max-width: 750px;
  }
}

@media (max-width: 480px) {
  .footer-container {
    max-width: 400px;
  }
  .footer-links {
    flex-direction: column;
    align-items: center;
  }
  .footer-column p {
    font-size: 14px;
  }
  .footer-line {
    max-width: 400px;
  }
  .footer-copyright {
    max-width: 400px;
  }
}
</style>
