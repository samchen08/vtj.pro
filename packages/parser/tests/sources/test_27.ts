export const test_27 = `
<template>
  <div class="article-list-page">
    <Header></Header>
    <main class="main-content">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">文章列表</h1>
          <p class="page-description">浏览所有文章，按标签筛选或搜索感兴趣的内容</p>
        </div>
        <div class="filter-section">
          <div class="search-box">
            <el-input v-model="state.searchKeyword" placeholder="搜索文章标题或内容" clearable @keyup.enter="handleSearch"
              @clear="handleSearch">
              <template #append>
                <el-button :icon="Search" @click="handleSearch" />
              </template>
            </el-input>
          </div>
          <div class="filter-tags">
            <el-tag v-for="tag in state.allTags" :key="tag.id" :type="state.activeTag === tag.name ? 'primary' : ''"
              class="filter-tag" @click="toggleTag(tag.name)">
              {{ tag.name }}
            </el-tag>
          </div>
        </div>
        <div class="article-list-container">
          <div v-if="state.articles.length === 0" class="empty-state">
            <XIcon :icon="DocumentDelete" :size="60" color="#dcdfe6"></XIcon>
            <p>暂无文章</p>
            <el-button type="primary" @click="goToPublish">去发表文章</el-button>
          </div>
          <div v-else class="article-grid">
            <div v-for="article in state.articles" :key="article.id" class="article-card"
              @click="viewArticleDetail(article.id)">
              <div class="article-card-cover">
                <img :src="article.cover" :alt="article.title" />
                <div class="article-tags">
                  <el-tag v-for="tag in article.tags" :key="tag" size="small" type="info">{{ tag }}</el-tag>
                </div>
              </div>
              <div class="article-card-content">
                <h3 class="article-card-title">{{ article.title }}</h3>
                <p class="article-card-summary">{{ article.summary }}</p>
                <div class="article-card-meta">
                  <div class="meta-left">
                    <span class="meta-item">
                      <XIcon :icon="User" :size="14" color="#999"></XIcon>
                      {{ article.author }}
                    </span>
                    <span class="meta-item">
                      <XIcon :icon="Calendar" :size="14" color="#999"></XIcon>
                      {{ article.createTime }}
                    </span>
                  </div>
                  <div class="meta-right">
                    <span class="meta-item">
                      <XIcon :icon="View" :size="14" color="#999"></XIcon>
                      {{ article.views }}
                    </span>
                    <span class="meta-item">
                      <XIcon :icon="ChatRound" :size="14" color="#999"></XIcon>
                      {{ article.comments }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="state.articles.length > 0" class="pagination-container">
            <el-pagination v-model:current-page="state.currentPage" v-model:page-size="state.pageSize"
              :page-sizes="[10, 20, 30, 50]" :total="state.total" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>
<script>
  import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useProvider } from '@vtj/renderer';
import { ElInput, ElButton, ElTag, ElPagination } from 'element-plus';
import { XIcon } from '@vtj/ui';
import { Search, User, Calendar, View, ChatRound, DocumentDelete } from '@vtj/icons';
import Header from './6hd1mqdt.vue';
import Footer from './7hd1mtx9.vue';
import { mock } from 'mockjs';

export default defineComponent({
  name: 'ArticleList',
  components: {
    Header,
    Footer,
    ElInput,
    ElButton,
    ElTag,
    ElPagination,
    XIcon
  },
  setup(props) {
    const provider = useProvider({ id: '3hd1mfl4', version: '' });
    const state = reactive({
      articles: [],
      allTags: [],
      activeTag: '',
      searchKeyword: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    });
    return { state, props, provider, Search, User, Calendar, View, ChatRound, DocumentDelete };
  },
  methods: {
    handleSearch() {
      this.state.currentPage = 1;
      this.fetchArticles();
    },
    toggleTag(tagName) {
      if (this.state.activeTag === tagName) {
        this.state.activeTag = '';
      } else {
        this.state.activeTag = tagName;
      }
      this.state.currentPage = 1;
      this.fetchArticles();
    },
    viewArticleDetail(id) {

    },
    goToPublish() {
      this.$router.push('/publish-article');
    },
    handleSizeChange(size) {
      this.state.pageSize = size;
      this.fetchArticles();
    },
    handleCurrentChange(page) {
      this.state.currentPage = page;
      this.fetchArticles();
    },
    fetchArticles() {
      const mockData = mock({
        'list|20': [{
          'id|+1': 1,
          'title': '@ctitle(10, 30)',
          'summary': '@cparagraph(1, 3)',
          'author': '@cname',
          'createTime': '@date("yyyy-MM-dd")',
          'views|100-5000': 1,
          'comments|0-200': 1,
          'cover': 'https://picsum.photos/400/250?random=@integer(1,100)',
          'tags|1-3': ['@pick(["Vue", "JavaScript", "CSS", "Node.js", "React", "TypeScript", "前端", "后端"])']
        }]
      }).list;

      let filteredList = [...mockData];
      
      if (this.state.activeTag) {
        filteredList = filteredList.filter(article => 
          article.tags.includes(this.state.activeTag)
        );
      }
      
      if (this.state.searchKeyword) {
        const keyword = this.state.searchKeyword.toLowerCase();
        filteredList = filteredList.filter(article => 
          article.title.toLowerCase().includes(keyword) || 
          article.summary.toLowerCase().includes(keyword)
        );
      }

      this.state.total = filteredList.length;
      const start = (this.state.currentPage - 1) * this.state.pageSize;
      const end = start + this.state.pageSize;
      this.state.articles = filteredList.slice(start, end);
    },
    generateTags() {
      const tagNames = ['Vue', 'JavaScript', 'CSS', 'Node.js', 'React', 'TypeScript', '前端', '后端', '数据库', '算法', '设计模式', '性能优化'];
      this.state.allTags = tagNames.map((name, index) => ({
        id: index + 1,
        name
      }));
    }
  },
  mounted() {
    this.generateTags();
    this.fetchArticles();
  },
  watch: {
    'state.currentPage': 'fetchArticles',
    'state.pageSize': 'fetchArticles'
  }
});
</script>
<style lang="css" scoped>
  .article-list-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    padding: 30px 0;
    background-color: #f5f7fa;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .page-header {
    margin-bottom: 30px;
  }

  .page-title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin: 0 0 10px 0;
  }

  .page-description {
    font-size: 16px;
    color: #666;
    margin: 0;
  }

  .filter-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .search-box {
    margin-bottom: 20px;
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .filter-tag {
    cursor: pointer;
    transition: all 0.3s;
  }

  .filter-tag:hover {
    transform: translateY(-2px);
  }

  .article-list-container {
    min-height: 400px;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .empty-state p {
    margin: 20px 0;
    font-size: 16px;
    color: #999;
  }

  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
  }

  .article-card {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
  }

  .article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15);
  }

  .article-card-cover {
    position: relative;
    height: 180px;
    overflow: hidden;
  }

  .article-card-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .article-tags {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    gap: 5px;
  }

  .article-card-content {
    padding: 20px;
  }

  .article-card-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0 0 10px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-card-summary {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 0 0 15px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
  }

  .meta-left,
  .meta-right {
    display: flex;
    gap: 15px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
`;
