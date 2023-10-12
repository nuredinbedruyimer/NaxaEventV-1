<template>
    <div class="py-8 px-10 text-md font-medium rounded-lg border-2 border-gray-300 w-fit flex flex-col items-centers gap-3">
        <div class="flex flex-col items-center gap-1">
            <span>
                <Icon icon="tabler:face-id-error" class="text-5xl text-error" />
            </span>
            <span>
                {{ message }}
            </span>
        </div>
        <div v-if="retry" class="text-center">
            <span @click="retry" class="cupo text-primary font-bold">Try again</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
withDefaults(defineProps<{
    message: string,
    retry?: () => any
}>(), {
    message: "Sorry, something went wrong!"
})
</script>