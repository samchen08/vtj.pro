<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  onLaunch(() => {
    console.log('App Launch22');
  });
  onShow(() => {
    console.log('App Show2');
  });
  onHide(() => {
    console.log('App Hide');
  })
</script>
<style>
  body {
    background-color: #fff;
  }
</style>
