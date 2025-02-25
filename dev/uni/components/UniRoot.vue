<script lang="ts" setup>
  //@ts-ignore
  import { onLaunch, onShow } from '@dcloudio/uni-app';

  onLaunch(() => {
    console.log('App Launch');
  });

  onShow(() => {
    console.log('App Show');
  });
</script>
