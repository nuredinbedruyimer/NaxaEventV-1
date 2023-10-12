<template>
    <div class="flex items-center gap-1 font-normal">
        <span>{{ sortByItem.name }}</span>
        <Icon :icon="sortByItem.icon" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    sortByItem: {
        name: string,
        icon: string
    }
}>()
</script>