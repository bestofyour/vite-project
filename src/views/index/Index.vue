<template>
  <div class="columns-4 to-yellow-500/50 bg-yellow-500">111</div>
  <div class="bg-yellow-500 columns-4 to-yellow-500/50 bg-clip-border" @click="click">
    {{ title }}</div
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
