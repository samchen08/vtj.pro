export const test_27 = `
<template>
  <div class="tech-home">
    <van-sticky>
      <van-nav-bar title="TechVision" fixed>
        <template #left>
          <XIcon :icon="Cpu" size="24" color="#409EFF" />
        </template>
        <template #right>
          <van-button size="small" type="primary" @click="scrollToContact">联系我们</van-button>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">引领未来科技</h1>
        <p class="hero-subtitle">用创新驱动世界，用技术改变生活</p>
        <div class="hero-buttons">
          <van-button type="primary" size="large" round @click="scrollToProducts">探索产品</van-button>
          <van-button size="large" round plain @click="scrollToAbout">了解更多</van-button>
        </div>
      </div>
      <div class="hero-bg"></div>
    </div>

    <div class="section advantage-section">
      <h2 class="section-title">核心优势</h2>
      <p class="section-desc">以技术创新为核心，打造行业领先解决方案</p>
      <van-grid :column-num="2" :gutter="16">
        <van-grid-item v-for="(item, index) in state.advantages" :key="index">
          <div class="advantage-card">
            <XIcon :icon="item.icon" size="40" :color="item.color" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="section product-section" id="products">
      <h2 class="section-title">产品服务</h2>
      <p class="section-desc">为您提供全方位的技术解决方案</p>
      <div class="product-list">
        <div v-for="(product, index) in state.products" :key="index" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.desc }}</p>
            <van-button type="primary" size="small" @click="viewProduct(product)">查看详情</van-button>
          </div>
        </div>
      </div>
    </div>

    <div class="section stats-section">
      <van-grid :column-num="4" :border="false">
        <van-grid-item v-for="(stat, index) in state.stats" :key="index">
          <div class="stat-item">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="section contact-section" id="contact">
      <h2 class="section-title">联系我们</h2>
      <p class="section-desc">期待与您的合作，共创美好未来</p>
      <van-cell-group inset>
        <van-cell title="电话" :value="state.contact.phone" is-link @click="makeCall" />
        <van-cell title="邮箱" :value="state.contact.email" is-link @click="sendEmail" />
        <van-cell title="地址" :value="state.contact.address" />
      </van-cell-group>
      <div class="social-links">
        <van-button icon="chat-o" type="primary" plain round @click="openWechat">微信</van-button>
        <van-button icon="weibo" type="danger" plain round>微博</van-button>
        <van-button icon="link-o" type="success" plain round>官网</van-button>
      </div>
    </div>

    <div class="footer">
      <p>&copy; 2024 TechVision 科技有限公司 版权所有</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useProvider } from '@vtj/renderer';
import { NavBar, Button, Grid, GridItem, Cell, CellGroup, Sticky, Toast } from 'vant';
import { XIcon } from '@vtj/icons';
import { Cpu, TrendCharts, Shield, MagicStick, Star, Trophy, User, Box } from '@element-plus/icons-vue';
import { mock } from 'mockjs';

export default defineComponent({
  name: 'TechCompanyHome',
  components: {
    VanNavBar: NavBar,
    VanButton: Button,
    VanGrid: Grid,
    VanGridItem: GridItem,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanSticky: Sticky,
    XIcon
  },
  setup(props) {
    const provider = useProvider({ id: '1h2f2gpf', version: '' });
    const state = reactive({
      advantages: [
        { icon: TrendCharts, title: '技术创新', desc: '持续研发投入，保持技术领先', color: '#409EFF' },
        { icon: Shield, title: '安全可靠', desc: '企业级安全保障，数据无忧', color: '#67C23A' },
        { icon: MagicStick, title: '智能高效', desc: 'AI驱动，提升工作效率', color: '#E6A23C' },
        { icon: Star, title: '优质服务', desc: '7x24小时专业支持', color: '#F56C6C' }
      ],
      products: mock({
        'list|4': [{
          'name|+1': ['智能云平台', '大数据分析', 'AI解决方案', '物联网系统'],
          'desc|+1': [
            '一站式云计算服务，助力企业数字化转型',
            '深度数据挖掘，洞察商业价值',
            '人工智能赋能，开启智能时代',
            '万物互联，构建智慧生态'
          ]
        }]
      }).list.map((item, index) => ({
        ...item,
        image: \`https://picsum.photos/400/300?random=\${index + 1}\`
      })),
      stats: [
        { value: '500+', label: '企业客户' },
        { value: '100+', label: '技术专利' },
        { value: '50+', label: '合作伙伴' },
        { value: '10年', label: '行业经验' }
      ],
      contact: {
        phone: '400-888-8888',
        email: 'contact@techvision.com',
        address: '北京市海淀区科技园88号'
      }
    });
    return { state, props, provider, Cpu };
  },
  methods: {
    scrollToProducts() {
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    },
    scrollToAbout() {
      document.querySelector('.advantage-section').scrollIntoView({ behavior: 'smooth' });
    },
    scrollToContact() {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    },
    viewProduct(product) {
      Toast(\`查看\${product.name}详情\`);
    },
    makeCall() {
      window.location.href = \`tel:\${state.contact.phone}\`;
    },
    sendEmail() {
      window.location.href = \`mailto:\${state.contact.email}\`;
    },
    openWechat() {
      Toast('请扫描二维码关注我们');
    }
  }
});
</script>

<style lang="css" scoped>
.tech-home {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
  color: #ffffff;
  padding-bottom: 60px;
}

.hero-section {
  position: relative;
  padding: 100px 20px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(64, 158, 255, 0.1) 0%, transparent 70%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  background: linear-gradient(90deg, #409EFF, #67C23A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 32px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.section {
  padding: 40px 16px;
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
}

.section-desc {
  font-size: 14px;
  color: #a0a0a0;
  text-align: center;
  margin-bottom: 32px;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.advantage-card h3 {
  font-size: 16px;
  margin: 12px 0 8px;
}

.advantage-card p {
  font-size: 12px;
  color: #a0a0a0;
  line-height: 1.5;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.product-info h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.product-info p {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 12px;
  line-height: 1.5;
}

.stats-section {
  background: rgba(64, 158, 255, 0.1);
  margin: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #a0a0a0;
}

.contact-section {
  text-align: center;
}

.social-links {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.footer {
  text-align: center;
  padding: 24px;
  font-size: 12px;
  color: #666;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

`;
