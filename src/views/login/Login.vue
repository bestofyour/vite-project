<template>
  <div id="p">{{ title }}</div>
</template>

<script lang="ts" setup>
  import { useScroll } from '@/hooks/add';
  import * as d3 from 'd3';
  const { title } = useScroll();
  console.log('title', title);
  d3.select('body')
    .select('div')
    .style('color', function () {
      return 'hsl(' + Math.random() * 360 + ',100%,50%)';
    })
    .data([4, 8, 15, 16, 23, 42])
    .style('font-size', function (d) {
      return d + 'px';
    });
</script>
