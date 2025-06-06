export const test_26 = `
<template>
  <div class="creation-center">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="header-left">
        <XIcon :icon="VtjIconArrowLeft" :size="20" color="#000"></XIcon>
      </div>
      <div class="header-title">创作中心</div>
      <div class="header-right">
        <VanButton size="small" type="primary">+ 发布</VanButton>
      </div>
    </div>

    <!-- 主标签栏 -->
    <div class="main-tabs">
      <div 
        v-for="tab in state.mainTabs" 
        :key="tab" 
        class="main-tab"
        :class="{ active: state.activeMainTab === tab }"
        @click="state.activeMainTab = tab">
        {{ tab }}
      </div>
    </div>

    <!-- 筛选标签栏 -->
    <div class="filter-tabs">
      <div 
        v-for="filter in state.filters" 
        :key="filter" 
        class="filter-tab"
        :class="{ active: state.activeFilter === filter }"
        @click="state.activeFilter = filter">
        {{ filter }}
      </div>
    </div>

    <!-- 审核中提示 -->
    <div class="review-notice" v-if="state.activeFilter === '审核中'">
      <span>作品排队审核中,请耐心等待</span>
      <span class="view-link">去查看 ></span>
    </div>

    <!-- 内容列表 -->
    <div class="content-list">
      <div v-for="(item, index) in state.contentItems" :key="index" class="content-item">
        <div class="item-left">
          <img :src="item.image" :alt="'内容缩略图：' + item.title" class="thumbnail">
        </div>
        <div class="item-right">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-status" :class="item.statusClass">{{ item.status }} {{ item.time }}</div>
          <div class="item-stats">{{ item.stats }}</div>
          <div class="item-actions">
            <span class="detail-link">详细数据 ></span>
            <XIcon :icon="VtjIconMore" :size="20" color="#999"></XIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { useProvider } from '@vtj/renderer';
  import { XIcon } from '@vtj/ui';
  import { VtjIconArrowLeft, VtjIconMore } from '@vtj/icons';
  import { Button } from 'vant';

  export default defineComponent({
    name: 'Page6',
    components: {
      XIcon,
      VanButton: Button
    },
    setup(props) {
      const provider = useProvider({ id: '1663auu9', version: '1749089849216' });
      const state = reactive({
        mainTabs: ['全部', '文章', '视频', '微头条'],
        activeMainTab: '全部',
        filters: ['全部', '已发布', '审核中', '未通过', '仅我可见'],
        activeFilter: '全部',
        contentItems: [
          {
            image: 'https://picsum.photos/100/100?random=1',
            title: '低代码平台同质化问题严重... #如何搭建低代码平台#',
            status: '修改审核中',
            statusClass: 'under-review',
            time: '6分钟前',
            stats: '8展现 3阅读 0评论'
          },
          {
            image: 'https://picsum.photos/100/100?random=2',
            title: 'Vue3组件开发最佳实践',
            status: '已发布',
            statusClass: 'published',
            time: '前天',
            stats: '102展现 56阅读 8评论'
          }
        ]
      });
      return { state, props, provider, VtjIconArrowLeft, VtjIconMore };
    }
  });
</script>

<style lang="scss" scoped>
.creation-center {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .header-title {
    font-size: 18px;
    font-weight: 500;
  }
}

.main-tabs {
  display: flex;
  background-color: #fff;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  
  .main-tab {
    padding: 12px 0;
    margin-right: 24px;
    font-size: 16px;
    color: #333;
    
    &.active {
      color: #f85959;
      border-bottom: 2px solid #f85959;
    }
  }
}

.filter-tabs {
  display: flex;
  background-color: #fff;
  padding: 8px 16px;
  overflow-x: auto;
  white-space: nowrap;
  
  .filter-tab {
    padding: 6px 12px;
    margin-right: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 15px;
    color: #666;
    
    &.active {
      color: #f85959;
      border-color: #f85959;
      background-color: #fff0f0;
    }
  }
}

.review-notice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  
  .view-link {
    color: #999;
  }
}

.content-list {
  margin-top: 8px;
  
  .content-item {
    display: flex;
    padding: 12px 16px;
    background-color: #fff;
    margin-bottom: 8px;
    
    .item-left {
      margin-right: 12px;
      
      .thumbnail {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        object-fit: cover;
      }
    }
    
    .item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .item-title {
        font-size: 16px;
        color: #333;
        margin-bottom: 8px;
        line-height: 1.4;
      }
      
      .item-status {
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
        
        &.under-review {
          color: #ff9500;
        }
        
        &.published {
          color: #999;
        }
      }
      
      .item-stats {
        font-size: 12px;
        color: #999;
        margin-bottom: 8px;
      }
      
      .item-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .detail-link {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
`;
