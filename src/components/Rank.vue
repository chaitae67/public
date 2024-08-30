<template>
  <div>
    <Header />
    <div class="rank-container">
      <h2 class="title">Weekend Rank</h2>
      <div class="rank-list" v-for="(page, pageIndex) in pagedRanks" :key="pageIndex" v-show="currentPage === pageIndex + 1">
        <div class="rank-row" v-for="rowIndex in 3" :key="rowIndex">
          <div class="rank-item" v-for="item in getRowItems(page, rowIndex)" :key="item.id" @click="navigateToLink(item.purchaseLink)">
            <div class="item-image">
              <h3>{{ item.rank }}위</h3>
              <img :src="getImagePath(item.image)" :alt="item.name" />
            </div>
            <div class="item-info">
              <p style="font-weight:900; font-size: 16px">{{ item.brand }}</p>
              <p class="item_name">{{ item.name }}</p>
              <p style="font-weight:900">{{ item.price }}원</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button v-for="pageIndex in totalPageCount" :key="pageIndex" @click="changePage(pageIndex)" :class="{ active: currentPage === pageIndex }">
          {{ pageIndex }}
        </button>
      </div>
    </div>
    <Footer_component />
  </div>
</template>

<script>
import Header from './Header.vue';
import data from '../data/rank.json';
import Footer_component from './Footer_component.vue';

export default {
  name: 'Rank',
  components: {
    Header,
    Footer_component,
  },
  data() {
    return {
      currentPage: 1,
      ranks: data.map((item, index) => ({ ...item, rank: index + 1 })) // rank 번호 추가
    };
  },
  computed: {
    pagedRanks() {
      const itemsPerPage = 21;
      const pages = [];
      for (let i = 0; i < this.ranks.length; i += itemsPerPage) {
        pages.push(this.ranks.slice(i, i + itemsPerPage));
      }
      return pages;
    },
    totalPageCount() {
      return Math.ceil(this.ranks.length / 21);
    }
  },
  methods: {
    getRowItems(page, rowIndex) {
      const itemsPerRow = 7;
      const start = (rowIndex - 1) * itemsPerRow;
      return page.slice(start, start + itemsPerRow);
    },
    changePage(pageIndex) {
      this.currentPage = pageIndex;
    },
    getImagePath(image) {
      return require(`@/${image}`);
    },
    navigateToLink(link) {
      window.location.href = link;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 40px;
  font-weight: bolder;
  text-align: left;
  margin-left: 50px;
  margin-bottom: 80px;
}
.rank-container {
  padding: 20px;
  text-align: left; 
  margin-top: 5%;
}

.rank-list {
  display: flex;
  flex-direction: column;
}

.rank-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.rank-item {
  width: calc(100% / 7 - 10px);
  padding: 10px;
  background: #fff;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.rank-item:hover {
  background-color: #f0f0f0;
}

.item-image {
  position: relative;
  width: 180px;
}

.item-image h3 {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
}

.item-image img {
  width: 180px;
  height: 200px;
  object-fit: cover;
}

.item-info {
  width: 180px;
  text-align: left;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 16px;
  background: #eee;
  border: none;
  cursor: pointer;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background: #ccc;
}

.pagination button.active {
  background: #333;
  color: #fff;
}
</style>
