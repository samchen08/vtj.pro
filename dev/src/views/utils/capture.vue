<template>
  <div>
    <button @click="captureScreen">Capture</button>
  </div>
</template>
<script lang="ts" setup>
  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        // 将视频帧绘制到Canvas
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        // 停止共享
        stream.getTracks().forEach((track) => track.stop());
        // 保存图片
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = canvas.toDataURL();
        link.click();
      };
    } catch (err) {
      console.error('截图失败:', err);
    }
  };
</script>
