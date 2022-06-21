<template>
  <div>{{ title }}</div>
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
</script>

<style lang="css" scoped>
  #container {
    width: 1000px;
    height: 1000px;
    background-color: antiquewhite;
  }
</style>
