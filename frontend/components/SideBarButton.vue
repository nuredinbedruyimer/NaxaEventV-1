<template>
    <div>
        <NuxtLink :to="link">
            <button class="sidebar-btn w-44 md:w-44 h-12 md:h-12 border-2 text-md md:text-sm font-semibold border-primary flex pl-5 md:pl-6 items-center gap-4 rounded-lg">
                <span v-if="icon" class="text-3xl">
                    <Icon :icon="icon.icon" :class="icon.class ?? ''" />
                </span>
                <span>
                    {{ text }}
                </span>
            </button>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    text: string
    link: string
    icon?: {
        icon: string
        class?: string
    }
}>()
</script>