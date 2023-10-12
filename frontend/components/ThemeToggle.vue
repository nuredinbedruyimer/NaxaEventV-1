<template>
    <div @click="generalStore.toggleDarkMode" class="cupo text-3xl">
        <Icon v-if="generalStore.isDark" icon="line-md:moon-filled-to-sunny-filled-transition" />
        <Icon v-else icon="line-md:sunny-filled-loop-to-moon-filled-transition" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useGeneralStore } from '@/pinia-stores';
const generalStore = useGeneralStore()
</script>