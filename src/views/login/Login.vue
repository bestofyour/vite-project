<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
import { useScroll } from '@/hooks/add'
const { title } = useScroll()
console.log('title', title)
</script>
