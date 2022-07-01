<template>
  <div class="text-red-300 div bg-red-900 hover:bg-blue-900">111111</div>
  <Button type="dashed" class="text-pink-50 hover:text-red-900">11</Button>
</template>

<script lang="ts" setup>
  import { useScroll } from '@/hooks/add';
  import { Button } from 'ant-design-vue';
  import * as d3 from 'd3';
  const { title } = useScroll();
  console.log('title', title);
</script>

<style lang="less" scoped>
  .div {
    color-scheme: dark;
    font-display: auto;
    font-weight: bold;
  }
</style>
