<template>
  <div class="modal-background" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <button class="share-button" @click="savePost">공유하기</button>
        <span>새 게시물 만들기</span>
        <button class="back-button" @click="closeModal">
          <img src="../assets/x.svg" alt="Close Icon" class="close-icon">
        </button>
      </div>
      <div class="modal-body">
        <div class="image-upload-section">
          <div class="image-slider">
            <div class="image-placeholder" v-for="(image, index) in images" :key="index" v-show="currentImageIndex === index">
              <img :src="image" alt="Uploaded Image" class="uploaded-image">
              <button class="delete-button" @click="deleteImage(index)">삭제</button>
            </div>
            <div v-if="images.length === 0" class="image-placeholder">
              <p>이미지를 업로드 해주세요</p>
            </div>
            <button class="nav-button prev" @click="prevImage" v-if="images.length > 1">&lt;</button>
            <button class="nav-button next" @click="nextImage" v-if="images.length > 1">&gt;</button>
          </div>
          <input type="file" @change="handleImageUpload" multiple ref="fileInput" style="display: none;">
          <button class="upload-button" @click="triggerFileInput" :disabled="images.length >= 5">
            <img src="../assets/plus-circle-dotted.svg" alt="Upload Icon" class="upload-icon">
          </button>
          <p v-if="images.length >= 5" class="image-limit-text">최대 5장까지 업로드할 수 있습니다.</p>
        </div>
        <div class="text-input-section">
          <div class="user-info">
            <span class="username">{{ user.username }}</span>
          </div>
          <textarea v-model="postText" placeholder="문구를 입력하세요..." maxlength="2200"></textarea>
          <div class="text-counter">{{ postText.length }}/2200</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: [],
        avatarUrl: 'path_to_user_avatar.png'
      },
      postText: '',
      images: [],
      currentImageIndex: 0
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleImageUpload(event) {
      const files = event.target.files;
      if (files.length + this.images.length > 5) {
        alert('최대 5장까지 업로드할 수 있습니다.');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.unshift(e.target.result); // 최신 이미지를 배열 앞에 추가
          this.currentImageIndex = 0; // 최신 이미지로 인덱스 업데이트
        };
        reader.readAsDataURL(files[i]);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    nextImage() {
      if (this.currentImageIndex < this.images.length - 1) {
        this.currentImageIndex++;
      }
    },
    deleteImage(index) {
      this.images.splice(index, 1);
      if (this.currentImageIndex >= this.images.length) {
        this.currentImageIndex = this.images.length - 1;
      }
    },
    async savePost() {
      try {
        const post = {
          username: this.user.username,
          postText: this.postText,
          images: this.images,
        };
        const response = await axios.post('https://b171f1e5-1f22-4284-87e4-d649c2a4a433.mock.pstmn.io', post);
        console.log('Post saved:', response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error saving post:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 80%;
  max-width: 1000px;
  height: 65%; /* 수정된 부분 */
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
}

.back-button,
.share-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  font-weight: bolder;
  color: #2c2c2c;
}

.close-icon {
  width: 24px;
  height: 24px;
}

.modal-body {
  display: flex;
  flex: 1;
  padding: 20px;
}

.image-upload-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.image-slider {
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 10px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d3d3d3; /* 밝은 회색 배경 */
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888; /* 텍스트 색상 */
  font-size: 14px;
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.upload-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-top:20px
}

.upload-icon {
  width: 50px;
  height: 50px;
}

.text-input-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-left: 1px solid #e0e0e0;
  height: 490px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

textarea {
  flex: 1;
  border: none;
  resize: none;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  outline: none;
  height: 500px;
}

.text-counter {
  text-align: right;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
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
  border-radius: 50%;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.7);
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}

.image-limit-text {
  color: red;
  margin-top: 10px;
}
</style>
