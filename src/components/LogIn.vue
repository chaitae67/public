<template>
  <div class="login_container">
    <div class="logo_container">
      <img @click="navigateToMain" src="../assets/WTF로고.svg" style="width: 100px; height: 100px; cursor: pointer;">
    </div>
    <div class="login_text">
      ID/PW 로그인 
    </div>
    <input v-model="userId" type="text" placeholder="아이디 or 휴대폰번호로 입력" class="id_input">
    <div class="password_box">
      <input v-model="userPassword" :type="showPassword ? 'text' : 'password'" placeholder="비밀번호 입력" class="pw_input">
      <img :src="showPassword ? getPwPng(1) : getPwPng(0)" class="password_icon" @click="togglePasswordVisibility">
    </div>
    <div class="search_box">
      <span class="search_text">아이디찾기</span>
      <span style="padding:0px 5px">|</span>
      <span class="search_text">비밀번호 찾기</span>
    </div>
    <div @click="performLogin" class="login_button" >
      로그인
    </div>
    <div class="signup_box">
        <span class="first">처음이신가요? </span>
      <span @click="handleSignup" class="signup_text">회원가입</span>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';

export default {
data() {
  return {
    showPassword: false,
    userId: '',
    userPassword: '',
  };
},
computed:{
  ...mapState(['userId', 'nickname'])
},
methods: {
  ...mapActions(['login']),

    performLogin() {
      // 입력 필드 검증
      if (!this.userId.trim()) {
        alert ('아이디를 입력해주세요.');
        return;
      }
      if (!this.userPassword.trim()) {
        alert ('비밀번호를 입력해주세요.');
        return;
      }

      this.login({
        userId: this.userId,
        userPassword: this.userPassword
      }).then(() => {
        // 로그인 성공 시 메인 페이지로 리다이렉션
        this.$router.push('/Main');
      }).catch(error => {
        if (error.message === 'Unauthorized') {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          // 기타 오류 처리
          alert('비밀번호가 일치하지 않습니다.', error);
        }
      });
  },
  
  togglePasswordVisibility(){
      this.showPassword = !this.showPassword;
  },
  getPwPng(num) {
    return num == 0 ? require('../assets/ico_join_pw_on.png') : require('../assets/ico_join_pw_off.png');
  },
  handleSignup() {
    this.$router.push('./SignUp');
  },
  navigateToMain(){
    this.$router.push('/');  
  },
  }
};
</script>

<style scoped>
.password_box{
  position: relative;
}
.login_container{
  width:400px;
  margin: 0px auto;
  padding-top: 120px;

}
.logo_container{
  display: flex; 
  align-items: center; 
  justify-content: center; 
  flex-direction: column;
  margin-bottom: 25px;
}
.login_text{
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 40px;
}
.id_input{
  width: 100%;
  margin-top: 20px;
  border-top: none;
  border-right: none ;
  border-left: none ;
  border-image: initial;  
  font-size: 13px ;
  padding: 0px 0px 8px; 
  border-bottom: 1px solid rgb(240, 240, 240);
  outline: none;
  color: gray;
}
.pw_input{
  width: 100%;
  margin-top: 20px;
  border-top: none;
  border-right: none ;
  border-left: none ;
  border-image: initial;  
  font-size: 13px ;
  padding: 0px 0px 8px; 
  border-bottom: 1px solid rgb(240, 240, 240);
  outline: none;
  color: gray;
  height: 22px;
}
.search_box{
  text-align: right;
  color: rgb(56, 56, 56);
  margin: 10px 0px 30px;
}
.search_text{
  font-size:12px;
  cursor: pointer;
}
.login_button{
  color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 18px 0px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  border-radius: 3px;
  margin: 15px 0px 20px;
  background-color: rgb(31, 31, 31);
}
.signup_box{
  text-align: center;
}
.first{
  font-size: 14px;
  font-weight: medium;
}
.signup_text{
  font-size:14px;
  cursor: pointer;
  font-weight:700;
  color: rgb(255, 0, 0);
}
.password_icon{
  position: absolute;
  top: 23px;
  right: 23px;
  width: 20px;
  height: 16px;
  cursor: pointer; 
}
</style>