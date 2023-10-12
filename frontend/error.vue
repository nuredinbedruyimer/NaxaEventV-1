<template>
    <div class="h-screen w-screen flex justify-center items-center p-6">
        <div class="flex flex-col items-center gap-7 max-w-[500px]">
            <div class="flex flex-col items-center">
                <div class="text-9xl">
                    {{ error?.statusCode }}
                </div>
                <div class="text-2xl text-center">
                    {{ getErrorMessage() }}
                </div>
            </div>
            <div>
                <NuxtLink to="/">
                    <span class="text-primary flex items-center text-lg gap-1">
                        <Icon icon="gg:arrow-left" />
                        <span>Home</span>
                    </span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
const props = defineProps({
    error: Object
})

function getErrorMessage() {
    const error = props.error;
    switch (error?.statusCode) {
        case (404):
            return "Sorry, we couldn’t find the page you’re looking for."
        default:
            console.error("in error page:", props.error)
            return "Something went wrong, please try again later."
    }
}
</script>