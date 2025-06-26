export const test_14 = `
<template>
  <div class="news-container">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="nav-items">
        <a 
          v-for="item in navItems" 
          :key="item" 
          href="#" 
          class="nav-item"
          :class="{ active: activeNav === item }"
          @click.prevent="activeNav = item"
        >
          {{ item }}
        </a>
      </div>
      <div class="nav-icons">
        <a href="#" class="icon notification" @click.prevent="handleNotification">
          <i class="icon-bell"></i>
        </a>
        <a href="#" class="icon user" @click.prevent="handleUser">
          <i class="icon-user"></i>
        </a>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 新闻文章列表 -->
      <div class="news-list">
        <div 
          v-for="(article, index) in articles" 
          :key="index" 
          class="article-block"
          @click="handleArticleClick(article)"
        >
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-desc">{{ article.desc }}</p>
          </div>
          <img 
            v-if="article.image" 
            :src="article.image" 
            alt="article image" 
            class="article-image"
          >
        </div>
      </div>

      <!-- 快讯侧边栏 -->
      <div class="quick-news">
        <div class="quick-news-header">
          <h3>快讯</h3>
          <button class="refresh-btn" @click="refreshQuickNews">
            换一换
          </button>
        </div>
        <ul class="quick-news-list">
          <li 
            v-for="(news, index) in quickNews" 
            :key="index" 
            class="quick-news-item"
            @click="handleQuickNewsClick(news)"
          >
            {{ news }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 特殊信息块 -->
    <div 
      class="info-block special" 
      @click="handleSpecialClick"
    >
      <h3>湖北湖南65家陶瓷厂名录及产品大全</h3>
      <p>Directory of 65 Ceramic Factories in Hubei and Hunan and their Products</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
export default defineComponent({
  name: 'P2',
  setup(props) {
    const provider = useProvider({ id: '54p8ziqq', version: '' });
    const state = reactive({
      activeNav: '看一看',
      navItems: [
        '看一看', '常读', '朋友', '热点', '娱乐', 
        '社会', '教育', '科技', '情感', '军事', '更多'
      ],
      articles: [
        {
          title: '最新科技突破：量子计算机实现重大进展',
          desc: '科学家宣布在量子计算领域取得重大突破，将为未来计算带来革命性变化...',
          image: 'https://picsum.photos/200/150?random=1'
        },
        {
          title: '教育改革新政策解读',
          desc: '教育部发布最新教育改革方案，重点关注素质教育与公平教育...',
          image: 'https://picsum.photos/200/150?random=2'
        },
        {
          title: '城市空气质量持续改善',
          desc: '最新数据显示，全国主要城市空气质量优良天数比例持续上升...'
        }
      ],
      quickNews: [
        '央行宣布降准0.5个百分点',
        '新能源汽车销量再创新高',
        '国际油价大幅波动',
        'A股市场开盘走高'
      ]
    });
    return { state, props, provider };
  },
  methods: {
    handleNotification() {
      console.log('Notification clicked');
    },
    handleUser() {
      console.log('User profile clicked');
    },
    handleArticleClick(article) {
      console.log('Article clicked:', article.title);
      // this.$router.push('/article-detail');
    },
    handleQuickNewsClick(news) {
      console.log('Quick news clicked:', news);
    },
    handleSpecialClick() {
      console.log('Special info block clicked');
    },
    refreshQuickNews() {
      // 模拟刷新快讯
      this.state.quickNews = [
        '最新疫情数据公布',
        '世界杯预选赛赛程调整',
        '国际会议达成重要协议',
        '科技巨头发布新产品'
      ];
    }
  }
});
</script>

<style lang="css" scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.nav-items {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.nav-item {
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  padding: 5px 10px;
}

.nav-item.active {
  color: #1a73e8;
  font-weight: bold;
}

.nav-item:hover {
  color: #1a73e8;
}

.nav-icons {
  display: flex;
  gap: 15px;
}

.icon {
  color: #333;
  font-size: 18px;
  text-decoration: none;
}

.main-content {
  display: flex;
  gap: 30px;
}

.news-list {
  flex: 3;
}

.quick-news {
  flex: 1;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.quick-news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.quick-news-header h3 {
  margin: 0;
  font-size: 18px;
}

.refresh-btn {
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
}

.quick-news-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-news-item {
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
  cursor: pointer;
}

.quick-news-item:hover {
  color: #1a73e8;
}

.article-block {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.article-block:hover {
  background-color: #f9f9f9;
}

.article-content {
  flex: 1;
}

.article-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.article-desc {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.article-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin-left: 20px;
  border-radius: 4px;
}

.info-block {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
}

.info-block h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.info-block p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.info-block.special {
  background-color: #fff0f0;
  border-left: 4px solid #e53935;
}

.info-block.special h3 {
  color: #e53935;
}
</style>

`;
