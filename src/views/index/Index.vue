<template>
  <div class="columns-4 to-yellow-500/50 bg-yellow-500">111</div>
  <div class="bg-yellow-500 columns-4 to-yellow-500/50 bg-clip-border" @click="click">
    {{ title }}</div
  >

  <div>{{ user.$state.user }}</div>
  <input class="border-blue-500/50" @input="uploadFile" ref="file" types="file" />
  <img :src="src" alt="图片" />
</template>

<script lang="ts" setup>
  import { useScroll } from '@/hooks/add';
  import LogicFlow from '@logicflow/core';
  import type { Definition } from '@logicflow/core';
  import { ref, nextTick, unref, computed, defineComponent, watch, onMounted, reactive } from 'vue';
  import type { Ref } from 'vue';
  import '@logicflow/core/dist/style/index.css';
  import { Snapshot, BpmnElement, Menu, DndPanel, SelectionSelect } from '@logicflow/extension';
  // import { toLogicFlowData } from './adp'
  import FlowChartToolbar from './FlowChartToolbar.vue';
  import { userStore } from '@/store/modules/user';
  const title = useScroll();
  const user = userStore();
  const src = ref<string>();
  function click() {
    console.log(111111111);
  }
  function uploadFile(file: Event) {
    const target = file.target as HTMLInputElement;
    const [files] = target.files;
    const fr = new FileReader();
    fr.readAsArrayBuffer(files!.slice(0, 8));
    // fr.readAsDataURL(files);
    fr.addEventListener(
      'load',
      function () {
        console.log(fr.result);
        let buffer = new Uint8Array(fr.result as ArrayBufferLike);
        console.log('buffer', buffer);
      },
      false,
    );
  }
</script>

<style lang="css" scoped>
  #container {
    width: 1000px;
    height: 1000px;
    background-color: antiquewhite;
  }
</style>
