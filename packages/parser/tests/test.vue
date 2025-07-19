<template>
  <div class="blog-homepage">
    <ElContainer>
      <ElHeader>
        <div class="header-content">
          <h1 class="logo">我的博客</h1>
          <ElMenu
            :default-active="state.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect">
            <ElMenuItem index="1"> 首页</ElMenuItem>
            <ElMenuItem index="2">
              <ElLink href="#/articles" :underline="false"> 文章</ElLink>
            </ElMenuItem>
            <ElMenuItem index="3">
              <ElLink href="#/about" :underline="false"> 关于</ElLink>
            </ElMenuItem>
          </ElMenu>
          <ElInput
            v-model="state.searchQuery"
            placeholder="搜索文章..."
            class="search-input"
            suffix-icon="Search"
            @keyup.enter="handleSearch">
            <template #suffix="scope_c7x6dtnd">
              <XIcon :icon="Search"></XIcon>
            </template>
          </ElInput>
        </div>
      </ElHeader>
      <ElMain>
        <ElRow :gutter="20">
          <ElCol :span="16">
            <ElCarousel indicator-position="outside" height="300px">
              <ElCarouselItem
                v-for="(item, index) in state.carouselItems"
                :key="index">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="carousel-image" />
                <div class="carousel-title">
                  {{ item.title }}
                </div>
              </ElCarouselItem>
            </ElCarousel>
            <h2 class="section-title">最新文章</h2>
            <ElCard
              v-for="(article, index) in state.latestArticles"
              :key="article.id"
              class="article-card">
              <template #header="scope_n7x6dtnd">
                <div class="card-header">
                  <span> {{ article.title }}</span>
                  <ElTag> {{ article.category }}</ElTag>
                </div>
              </template>
              <p class="article-summary">
                {{ article.summary }}
              </p>
              <div class="article-meta">
                <span> <XIcon :icon="Clock"></XIcon></span>
                <span> <XIcon :icon="User"></XIcon></span>
                <ElButton
                  type="text"
                  @click="
                    (...args: any[]) => click_y7x6dtnd({ article, index }, args)
                  ">
                  阅读更多</ElButton
                >
              </div>
            </ElCard>
            <ElPagination
              background=""
              layout="prev, pager, next"
              :total="state.totalArticles"
              :page-size="state.pageSize"
              :current-page="state.currentPage"
              class="pagination"
              @current-change="handlePageChange"></ElPagination>
          </ElCol>
          <ElCol :span="8">
            <ElCard class="sidebar-card">
              <template #header="scope_117x6dtnd">
                <div class="card-header">热门标签</div>
              </template>
              <div class="tag-list">
                <ElTag
                  v-for="(tag, index) in state.hotTags"
                  :key="tag"
                  type="info"
                  effect="plain"
                  class="tag-item">
                  {{ tag }}</ElTag
                >
              </div>
            </ElCard>
            <ElCard class="sidebar-card">
              <template #header="scope_167x6dtnd">
                <div class="card-header">统计图</div>
              </template>
              <XChart
                width="100%"
                height="200px"
                :option="{
                  xAxis: {
                    type: 'category',
                    data: ['代码', '设计', '生活', '技术', '旅游']
                  },
                  yAxis: { type: 'value' },
                  series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }]
                }"></XChart>
            </ElCard>
          </ElCol>
        </ElRow>
      </ElMain>
      <ElFooter>
        <p>© 2023 我的博客. All rights reserved.</p>
      </ElFooter>
    </ElContainer>
  </div>
</template>
<script lang="ts">
  // @ts-nocheck
  import { defineComponent,reactive} from 'vue';
  import { ElContainer,ElHeader,ElMenu,ElMenuItem,ElLink,ElInput,ElMain,ElRow,ElCol,ElCarousel,ElCarouselItem,ElCard,ElTag,ElButton,ElPagination,ElFooter} from 'element-plus';
  import { XIcon} from '@vtj/ui';
  import { XChart} from '@vtj/charts';
  import { Mock} from 'mockjs';
  import { Search,Clock,User} from '@vtj/icons';import { useProvider } from '@vtj/renderer';export default defineComponent({  name: 'Bbb',      components: { ElContainer,ElHeader,ElMenu,ElMenuItem,ElLink,ElInput,XIcon,ElMain,ElRow,ElCol,ElCarousel,ElCarouselItem,ElCard,ElTag,ElButton,ElPagination,XChart,ElFooter },          setup(props) {    const provider = useProvider({      id: '77x3ael3',      version: '1752904452999'    });    const state = reactive({ activeIndex:'1',searchQuery:'',carouselItems:[
    {
      image: 'https://picsum.photos/800/300?random=1',
      title: '探索Vue3最新特性'
    },
    { image: 'https://picsum.photos/800/300?random=2', title: '前端工程化实践' },
    {
      image: 'https://picsum.photos/800/300?random=3',
      title: '用ECharts构建数据可视化'
    }
  ],latestArticles:[],hotTags:['Vue', 'JavaScript', 'CSS', 'Element-Plus', '数据可视化', 'UI/UX'],totalArticles:0,pageSize:5,currentPage:1 });            return {      state,      props,      provider            , Mock,Search,Clock,User     };  },     methods: { click_y7x6dtnd({article, index}, args){
            return (($event) => {
    this.viewArticle(article.id);
  }).apply(this, args);
          },handleSelect(key, keyPath)  {
    console.log(key, keyPath);
    this.state.activeIndex = key;
  },handleSearch()  {
    console.log('搜索内容:', this.state.searchQuery);
    this.fetchArticles(1);
  },viewArticle(id)  {
    console.log('查看文章:', id);
  },handlePageChange(page)  {
    this.state.currentPage = page;
    this.fetchArticles(page);
  },fetchArticles()  {
    const mockArticles = Mock.mock({
      'total|20-50': 0,
      'list|5': [
        {
          'id|+1': 1,
          title: '@ctitle(10, 20)',
          summary: '@cparagraph(2, 4)',
          date: '@date('yyyy-MM-dd')',
          author: '@cname()',
          'category|1': ['前端技术', '后端开发', '设计', '生活随笔']
        }
      ]
    });
    this.state.latestArticles = mockArticles.list;
    this.state.totalArticles = mockArticles.total;
  } },    created()  {
    this.fetchArticles();
  }});
</script>
<style lang="css" scoped>
  .blog-homepage {
    font-family: Arial, sans-serif;
    background-color: #f4f5f7;
  }

  .el-container {
    min-height: 100vh;
  }

  .el-header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #ebeef5;
    padding: 0 20px;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    color: #409eff;
  }

  .el-menu-demo {
    flex-grow: 1;
    border-bottom: none;
    margin-left: 30px;
  }

  .el-menu-item {
    font-size: 16px;
  }

  .search-input {
    width: 250px;
  }

  .el-main {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
  }

  .section-title {
    font-size: 24px;
    color: #333;
    margin-top: 30px;
    margin-bottom: 20px;
    border-left: 4px solid #409eff;
    padding-left: 10px;
  }

  .article-card {
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: #333;
  }

  .article-summary {
    color: #606266;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .article-meta {
    font-size: 14px;
    color: #909399;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .article-meta .el-button {
    margin-left: auto;
    color: #409eff;
  }

  .article-meta .x-icon {
    vertical-align: middle;
    margin-right: 5px;
  }

  .sidebar-card {
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag-item {
    margin-right: 0px;
  }

  .pagination {
    margin-top: 30px;
    text-align: center;
  }

  .el-footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .carousel-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    text-align: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
