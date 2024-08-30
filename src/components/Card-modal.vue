<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="username">{{ post.username }}</span>
        <button class="modal-close" @click="closeModal">
          <img src="../assets/x.svg" alt="Close Icon" class="close-icon">
        </button>
      </div>
      <div class="post-image-wrapper">
        <img :src="post.images[0]" alt="Post Image" class="post-image" />
      </div>
      <div class="post-actions">
        <div class="actions-container">
          <div class="like-section">
            <button class="like-button" @click="toggleLike(post)">
              <img :src="post.liked ? require('../assets/heart-fill.svg') : require('../assets/heart.svg')" alt="Like Icon">
            </button>
            <span class="like-count">{{ post.likes }}</span>
          </div>
          <div class="comment-section">
            <img src="../assets/chat.svg" alt="Comment Icon" class="comment-icon" style="margin-bottom:2px">
            <span class="comment-count">{{ post.comments.length }}</span>
          </div>
        </div>
      </div>
      <div class="post-caption">{{ post.caption }}</div>
      <div class="comments">
        <div class="comment" v-for="(comment, index) in post.comments" :key="index">
          <div class="comment-header">
            <span class="username">{{ comment.username }}</span>
            <button v-if="comment.username === currentUser" @click="deleteComment(comment.id, index)" class="delete-comment">삭제</button>
            <button v-else @click="toggleCommentLike(comment)" class="like-comment">
              <img :src="comment.liked ? require('../assets/heart-fill.svg') : require('../assets/heart.svg')" alt="Like Icon">
            </button>
          </div>
          <span class="comment-text">{{ comment.text }}</span>
        </div>
      </div>
      <div class="comment-input">
        <input type="text" v-model="newComment" placeholder="댓글을 입력하세요..." />
        <button @click="addComment">게시</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      newComment: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    toggleLike(post) {
      if (post.liked) {
        post.likes--;
      } else {
        post.likes++;
      }
      post.liked = !post.liked;

      // 서버에 좋아요 상태를 업데이트 요청
      axios.post(`/api/posts/${post.id}/toggle-like`, {
        liked: post.liked
      }).catch(error => {
        console.error('Error toggling like:', error);
      });
    },
    addComment() {
      if (this.newComment.trim() !== '') {
        // 서버에 새로운 댓글을 추가 요청
        axios.post(`/api/posts/${this.post.id}/comments`, {
          text: this.newComment
        }).then(response => {
          // 서버 응답에서 추가된 댓글을 받아와서 화면에 추가
          this.post.comments.push({
            id: response.data.id,
            username: response.data.username,
            text: response.data.text,
            liked: false
          });
          this.newComment = '';
        }).catch(error => {
          console.error('Error adding comment:', error);
        });
      }
    },
    deleteComment(commentId, index) {
      // 서버에 댓글 삭제 요청
      axios.delete(`/api/comments/${commentId}`)
        .then(() => {
          // 성공적으로 삭제되면 화면에서 댓글 제거
          this.post.comments.splice(index, 1);
        })
        .catch(error => {
          console.error('Error deleting comment:', error);
        });
    },
    toggleCommentLike(comment) {
      comment.liked = !comment.liked;

      // 서버에 댓글 좋아요 상태를 업데이트 요청
      axios.post(`/api/comments/${comment.id}/toggle-like`, {
        liked: comment.liked
      }).catch(error => {
        console.error('Error toggling comment like:', error);
      });
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2px 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  height: 790px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 10px;
}

.username {
  font-weight: bold;
  flex-grow: 1;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

.close-icon {
  width: 24px;
  height: 24px;
}

.post-image-wrapper {
  width: 100%;
  height: 300px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.post-caption {
  text-align: left;
  margin-top: 10px;
  height: 145px;
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-items: center;
}

.actions-container {
  display: flex;
  align-items: center;
}

.like-section, .comment-section {
  display: flex;
  align-items: center;
  margin-right: 15px;
  height: 24px;
}

.like-section:last-child, .comment-section:last-child {
  margin-right: 0;
}

.like-button, .like-comment {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.like-button img, .comment-icon, .like-comment img {
  width: 24px;
  height: 24px;
  margin-right: 5px;
  vertical-align: middle;
}

.like-count, .comment-count {
  font-size: 16px;
  line-height: 24px;
  margin-right: 3px;
}

.comments {
  text-align: left;
  margin-top: 10px;
  height: 300px;
  overflow-y: auto;
  flex-grow: 1;
  border-top: 1px solid #e0e0e0;
}

.comment {
  margin-top: 5px;
}

.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment .username {
  font-weight: bold;
  margin-right: 5px;
}

.delete-comment {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

.comment-text {
  display: block;
  word-wrap: break-word;
}

.comment-input {
  display: flex;
  align-items: center;
  background: white;
  padding: 10px 0;
  border-top: 1px solid #e0e0e0;
}

.comment-input input {
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 5px;
  outline: none;
}

.comment-input button {
  background: none;
  border: none;
  color: #0095f6;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
}
</style>
