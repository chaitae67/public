<template>
    <div>로그인 중...</div>
  </template>
  
  <script>
  export default {
    async mounted() {
      try {
        // URL에 code 유무 체크
        const code = this.$route.query.code;
        if (!code) {
          console.log("인증 코드가 없습니다.");
          return this.$router.push('/');
        }
        console.log(`code : ${code}`);
  
        // 서버에 로그인 요청 (카카오 인증 코드 전달)
        const body = {
          code,
          domain: window.location.origin,
        };
        const response = await this.$axios.post('/auth/login', body);
  
        // 응답 처리
        console.log(response);
  
        // 예시: 로그인 성공 시 메인 페이지로 리디렉션
        if (response.data.success) {
          this.$router.push('/');
        } else {
          console.log('로그인 실패:', response.data.message);
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  