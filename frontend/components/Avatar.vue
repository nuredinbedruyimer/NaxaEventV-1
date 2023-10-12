<template>
    <div class="w-full h-full">
        <div v-if="url" class="w-full h-full">
            <img :class="`w-full h-full rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-500`" :src="url"
                alt="Bordered avatar">
        </div>
        <div v-else class="w-full h-full">
            <div
                :class="`relative w-full h-full font-bold flex justify items-center justify-center overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600 ring-1 ring-gray-400`">
                {{ name?.[0]?.toUpperCase() }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<
    {
        url: string
        name: string,
    }
>()
</script>