<template>
    <Head>
        <Title>Home | Event Space</Title>
    </Head>
    <div class="h-full overflow-auto flex flex-col items-center">
        <div class="relative bg-white">
            <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div class="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-48 lg:pb-56 xl:col-span-6">
                    <div class="mx-auto max-w-2xl lg:mx-0">
                        <h1 class="font-logo tracking-wider font-bold text-4xl lg:text-6xl">
                            Event <span class="text-primary">Space</span>
                        </h1>
                        <div class="mt-10 sm:flex lg:mt-10">
                            <div
                                class="relative rounded-full text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 w-[80%]">
                            </div>
                        </div>
                        <h1 class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">Events you
                            don't wanna miss</h1>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Welcome to our event sharing website, where you can
                            discover and share the latest events happening in your city and beyond!</p>
                        <div class="mt-10 flex items-center gap-x-6">
                            <NuxtLink href="/signup"
                                class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                                Register Now</NuxtLink>
                            <NuxtLink href="/events" class="text-sm font-semibold leading-6 text-gray-900">Explore events
                                <span aria-hidden="true">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <img class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        src="@/assets/images/landing.jpg" alt="" />
                </div>
            </div>
        </div>
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Events For <span class="text-primary">You</span>
                </h2>
                <p class="mt-2 text-lg leading-8 ">Here are events around your location
                </p>
            </div>
            <div v-if="result"
                class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <article v-for="event in result.eventsByLocation" :key="event.id"
                    class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                    <img :src="createStaticServerLink(event.images ?? defaultEventImageUrl)" :alt="event.title"
                        class="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                    <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                    <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        <span :datetime="new Date(event.date)" class="mr-8">{{ new Date(event.date).toLocaleString([], {
                            year: 'numeric', month: 'numeric', day: 'numeric'
                        }) }}</span>
                        <div class="-ml-4 flex items-center gap-x-4">
                            <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            <div v-if="event.city" class="flex gap-x-2.5">
                                <Icon icon="mdi:map-marker" class="text-2xl text-primary" />
                                <span>{{ event.city.name }}</span>
                            </div>
                        </div>
                    </div>
                    <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
                        <NuxtLink :to="`events/${event.id}`">
                            <span class="absolute inset-0" />
                            {{ event.title }}
                        </NuxtLink>
                    </h3>
                </article>
            </div>
            <div class="mt-32 overflow-hidden sm:mt-40">
                <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                    <div
                        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                        <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Event <span
                                    class="text-primary">Space</span>?</h2>
                            <p class="mt-6 text-md leading-6 ">We understand the importance of connecting people with the
                                events and experiences that matter to them, which is why we've created a platform that makes
                                it easy to explore a wide range of activities and share them with friends, family, and
                                fellow enthusiasts.</p>
                            <p class="mt-6 text-md leading-6">Whether you're looking for music festivals, art exhibitions,
                                sports games, or educational workshops, our website has something for everyone. With a
                                user-friendly interface and comprehensive search tools, you can quickly find the events that
                                interest you and plan your schedule accordingly.</p>
                        </div>
                        <div class=" flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                            <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                <img src="@/assets/images/about_us_1.jpg" alt=""
                                    class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                            </div>
                            <div
                                class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                    <img src="@/assets/images/about_us_2.jpg" alt=""
                                        class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                                <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                    <img src="@/assets/images/about_us_3.jpg" alt=""
                                        class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                    <img src="@/assets/images/about_us_4.jpg" alt=""
                                        class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto max-w-7xl py-24 sm:py-32 w-full">
                            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Ready to <span class="text-primary">join us?</span>
                                <br />
                                Or start by exploring events?
                            </h2>
                            <div class="mt-10 flex items-center gap-x-6">
                                <NuxtLink href="/signup"
                                    class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                                    Register Now</NuxtLink>
                                <NuxtLink href="/events" class="text-sm font-semibold leading-6 text-gray-900">Explore
                                    events
                                    <span aria-hidden="true">→</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-[85%]">
            <Footer />
        </div>
    </div>
    <!-- src="https://panda-events.com/wp-content/uploads/2018/06/events-panda.jpg" -->
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia-stores';
import { initCarousels } from 'flowbite';
import { Icon } from '@iconify/vue';
import { createStaticServerLink } from '~~/commons/functions';
import { defaultEventImageUrl } from "~~/commons/variables"

const router = useRouter()
const userStore = useUserStore()
if (userStore.isAuthorized) {
    router.replace("/events")
}
const { result, onError } = useEventsByLocation(0, 3)
onError(error => {
    console.error("useEventsByLocation-Index onError", error)
})

onMounted(() => {
    initCarousels()
})

</script>