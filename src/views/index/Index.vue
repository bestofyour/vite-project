<template>
  <div
    class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600"
    @click="click"
    >{{ title }}</div
  >
</template>

<script lang="ts" setup>
  import { useScroll } from '@/hooks/add';
  import LogicFlow from '@logicflow/core';
  import type { Definition } from '@logicflow/core';
  import { ref, nextTick, unref, computed, defineComponent, watch, onMounted } from 'vue';
  import type { Ref } from 'vue';
  import '@logicflow/core/dist/style/index.css';
  import { Snapshot, BpmnElement, Menu, DndPanel, SelectionSelect } from '@logicflow/extension';
  // import { toLogicFlowData } from './adp'
  import FlowChartToolbar from './FlowChartToolbar.vue';
  const title = useScroll();

  function click() {
    console.log(111111111);
  }
</script>

<style lang="css" scoped>
  #container {
    width: 1000px;
    height: 1000px;
    background-color: antiquewhite;
  }
</style>
