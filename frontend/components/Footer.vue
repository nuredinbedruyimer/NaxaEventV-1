<template>
    <footer class="border-t-2 text-gray-400 w-full mt-24 max-md:pt-3">
        <div class="mx-auto max-w-7xl py-6 md:py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div class="md:hidden flex justify-center gap-12">
                <NuxtLink v-for="social in socials" :key="social.icon" :to="social.link">
                    <Icon :icon="social.icon" class="text-2xl" />
                </NuxtLink>
            </div>
            <div class="mt-8 md:mt-0">
                <p class="text-center text-sm leading-5">&copy; {{ new Date().getFullYear() }} <NuxtLink to="/" class="font-logo text-lg font-bold text-on-background">Event <span class="text-primary">Space</span></NuxtLink>, Inc. All rights reserved.
                </p>
            </div>
            <div class="max-md:hidden flex justify-center gap-12">
                <NuxtLink v-for="social in socials" :key="social.icon" :to="social.link">
                    <Icon :icon="social.icon" class="text-2xl " />
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>
  
<script setup>
import { Icon } from '@iconify/vue';

const socials = [
    {
        icon: "ic:outline-facebook",
        link: "#",
    },
    {
        icon: "ri:instagram-fill",
        link: "#",
    },
    {
        icon: "bi:youtube",
        link: "#",
    },
    {
        icon: "mdi:twitter",
        link: "#",
    }
]
</script>