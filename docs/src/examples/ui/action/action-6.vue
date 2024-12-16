<template>
  <XAction
    ref="XActionRef"
    :icon="Rank"
    draggable
    @dragstart="onDragStart"></XAction>

  <XContainer flex gap>
    <XContainer
      width="200px"
      height="100px"
      class="seagreen empty"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDragDrop"></XContainer>

    <XContainer
      width="200px"
      height="100px"
      class="salmon empty"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDragDrop"></XContainer>

    <XContainer
      width="200px"
      height="100px"
      class="skyblue empty"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDragDrop"></XContainer>

    <XContainer
      width="200px"
      height="100px"
      class="slateblue empty"
      @dragover="onDragOver"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @drop="onDragDrop"></XContainer>
  </XContainer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { XAction, XContainer } from '@vtj/ui';
  import { Rank } from '@vtj/icons';

  const XActionRef = ref(null);

  const onDragStart = (e: any) => {
    console.log('onDragStart', e);
  };

  const onDragOver = (e: any) => {
    // console.log('onDragOver', e);
    e.preventDefault();
  };

  const onDragEnter = (e: any) => {
    console.log('onDragEnter', e);
    e.target.style.borderStyle = 'dashed';
    e.preventDefault();
  };

  const onDragLeave = (e: any) => {
    e.target.style.borderStyle = 'solid';
    console.log('onDragLeave', e);
    // this.className = 'empty';
  };

  const onDragDrop = (e: any) => {
    console.log('onDragDrop', e);
    e.target.style.borderStyle = 'solid';
    console.log('aa', XActionRef.value);

    // this.className = 'empty';
    // this.append(fill);
  };
</script>

<style scoped>
  .seagreen {
    background: seagreen;
  }

  .salmon {
    background: salmon;
  }

  .skyblue {
    background: skyblue;
  }

  .slateblue {
    background: slateblue;
  }

  .fill {
    background-image: url('https://source.unsplash.com/random/150x150');
    height: 145px;
    width: 145px;
    cursor: pointer;
  }

  .empty {
    height: 150px;
    width: 150px;
    margin: 10px;
    border: solid 3px black;
    background: white;
  }

  .hold {
    border: solid 5px #ccc;
  }

  .hovered {
    background-color: #333;
    border-color: white;
    border-style: dashed;
  }
</style>
