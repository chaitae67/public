<template>
  <div class="ootd-background">
    <Header />
    <div class="ootd-container">
      <h2 class="ootd-text">Outfit Of The Day</h2>
      <button class="write-button" @click="openWriteModal">자랑해보세요!</button>
      <div class="ootd-cards-container">
        <button v-if="startIndex > 0" class="nav-button prev" @click="prevCard">&lt;</button>
        <div class="ootd-cards-wrapper">
          <div class="ootd-cards" :style="cardsStyle">
            <div class="ootd-card" v-for="(post, index) in posts" :key="index">
              <div class="image-placeholder" @click="openPostModal(post)">
                <img :src="post.images[0]" alt="Post Image" />
              </div>
              <div class="post-info">
                <div class="user-info">
                  <span class="username">{{ post.username }}</span>
                </div>
                <div class="like-section">
                  <button class="like-button" @click.stop="toggleLike(post)">
                    <img :src="post.liked ? require('../assets/heart-fill.svg') : require('../assets/heart.svg')" alt="Like Icon">
                  </button>
                  <span class="like-count">{{ post.likes }}</span>
                </div>
              </div>
              <button v-if="post.userId === currentUser" class="delete-button" @click="deletePost(post.id, index)">X</button>
            </div>
          </div>
        </div>
        <button v-if="endIndex < posts.length" class="nav-button next" @click="nextCard">&gt;</button>
      </div>
    </div>
    <OOTDWriteModal v-if="showWriteModal" @close="closeWriteModal" />
    <PostModal v-if="showPostModal" :post="selectedPost" @close="closePostModal" :current-user="currentUser" />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
import OOTDWriteModal from './OOTD_write.vue';
import PostModal from './Card-modal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Header,
    OOTDWriteModal,
    PostModal,
  },
  data() {
    return {
      posts: [],
      startIndex: 0,
      visibleCount: 5,
      showWriteModal: false,
      showPostModal: false,
      selectedPost: null,
    };
  },
  computed: {
    ...mapState(['isLoggedIn', 'nickname', 'userId']),
    currentUser() {
      return this.userId;
    },
    cardsStyle() {
      return {
        transform: `translateX(-${this.startIndex * (100 / this.visibleCount)}%)`,
        transition: 'transform 0.5s ease'
      };
    },
    endIndex() {
      return this.startIndex + this.visibleCount;
    }
  },
  methods: {
    ...mapActions(['setUserFromStorage']),
    fetchPosts() {
      axios
        .get('https://b171f1e5-1f22-4284-87e4-d649c2a4a433.mock.pstmn.io/posts', {})
        .then((res) => {
          console.log("---axios Get 성공---- ");
          const posts = res.data;
          this.posts.push(...posts);
          console.log(this.posts);
        })
        .catch((res) => {
          console.log("실패했어")
        });
    },
    toggleLike(post) {
      if (post.liked) {
        post.likes--;
      } else {
        post.likes++;
      }
      post.liked = !post.liked;
      axios.post(`/api/posts/${post.id}/toggle-like`, {
        liked: post.liked
      }).catch(error => {
        console.error('Error toggling like:', error);
      });
    },
    nextCard() {
      if (this.endIndex < this.posts.length) {
        this.startIndex++;
      }
    },
    prevCard() {
      if (this.startIndex > 0) {
        this.startIndex--;
      }
    },
    openWriteModal() {
      this.showWriteModal = true;
    },
    closeWriteModal() {
      this.showWriteModal = false;
    },
    openPostModal(post) {
      this.selectedPost = post;
      this.showPostModal = true;
    },
    closePostModal() {
      this.showPostModal = false;
      this.selectedPost = null;
    },
    deletePost(postId, index) {
      axios.delete(`/api/posts/${postId}`)
        .then(() => {
          this.posts.splice(index, 1);
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  },
  created() {
    this.fetchPosts();
    this.setUserFromStorage();
  }
};
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  border: none;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ootd-background {
  background-color: rgb(225, 225, 225);
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.ootd-container {
  text-align: center;
  margin: 100px;
  margin-top: 6%;
  border-radius: 10px;
  padding: 20px;
  position: relative; /* 버튼을 절대 위치로 배치하기 위해 */
  height: 600px;
}

.ootd-text {
  margin-bottom: 70px;
  font-size: 40px;
  font-weight: bolder;
  color: rgb(30, 30, 60);
}

.write-button {
  background-color: rgb(30, 30, 60);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  margin-right: 30px;
  font-weight: bold;
}

.ootd-cards-container {
  display: flex;
  align-items: center;
}

.ootd-cards-wrapper {
  overflow: hidden;
  width: calc(250px * 5 + 24px * 4); /* 250px * 5 + 20px * 4, 한 화면에 5개가 보이도록 설정, 카드 간격 20px */
}

.ootd-cards {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
}

.ootd-card {
  min-width: 250px;
  max-width: 250px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.image-placeholder {
  height: 300px;
  background-color: #f0f0f0;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
}

.like-section {
  display: flex;
  align-items: center;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.like-button img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.like-count {
  font-size: 16px;
}

.nav-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  border: none;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>

