<template>
    <div :class="{ dark: generalStore.isDark }">
        <div
            class="bg-background dark:bg-[#444343] text-on-background dark:text-dark-on-background font-default tracking-wider leading-relaxed min-h-screen">
            <div v-show="generalStore.hasNotification"
                class="fixed w-screen text-gray-200 font-bold  dark:bg-gray-300 flex justify-between items-center px-6 h-12 z-50 "
                :class="{
                    'bg-[#df0303]': generalStore.notification.type === 'error',
                    'bg-warning': generalStore.notification.type === 'warning',
                    'bg-[#A500CE]': generalStore.notification.type === 'success',
                }">
                {{ generalStore.notification.message }}
                <span @click="generalStore.clearNotification">
                    <Icon icon="material-symbols:close-rounded" class="cupo text-2xl" />
                </span>
            </div>
            <div v-if="!userStore.isAuthorized" class="max-h-screen overflow-hidden">
                <div id="top-nav-bar" class="fixed h-20 bg-surface transition-transform -translate-y-20">

                </div>

                <nav class="py-5 px-5 md:px-6 md:py-7 lg:px-20 border-b">
                    <div class=" flex flex-wrap items-center justify-between">
                        <Logo />
                        <button data-collapse-toggle="navbar-solid-bg" aria-controls="navbar-solid-bg" type="button"
                            class="inline-flex items-center p-2 ml-3 text-gray-500 rounded-lg md:hidden"
                            aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                                </path>
                            </svg>
                        </button>
                        <div class="hidden w-full md:block max-md:mt-6 md:w-[70%] pl-1 text-lg font-medium max-md:border-t"
                            id="navbar-solid-bg">
                            <ul
                                class="flex flex-col w-full gap-4 max-md:mt-4 rounded-lg md:flex-row md:justify-end md:items-center md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <div class="flex gap-3 flex-col md:flex-row">
                                    <li>
                                        <NuxtLink to="/" data-collapse-toggle="navbar-solid-bg"
                                            aria-controls="navbar-solid-bg" aria-expanded="false"
                                            class="flex items-center navbar-link">
                                            <Icon icon="material-symbols:chevron-right-rounded md:hidden"
                                                class="text-2xl" />
                                            Home
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink to="/events" data-collapse-toggle="navbar-solid-bg"
                                            aria-controls="navbar-solid-bg" aria-expanded="false"
                                            class="flex items-center navbar-link">
                                            <Icon icon="material-symbols:chevron-right-rounded md:hidden"
                                                class="text-2xl" />
                                            Events
                                        </NuxtLink>
                                    </li>
                                </div>
                                <div class="flex justify-between gap-10 w-full md:max-w-[300px]">
                                    <NuxtLink to="/signin" data-collapse-toggle="navbar-solid-bg"
                                        aria-controls="navbar-solid-bg" aria-expanded="false" class="btn p-0">Sign In
                                    </NuxtLink>
                                    <NuxtLink to="/signup" data-collapse-toggle="navbar-solid-bg"
                                        aria-controls="navbar-solid-bg" aria-expanded="false"
                                        class="btn p-0 bg-primary text-on-primary">
                                        Sign Up
                                    </NuxtLink>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div class="h-[90vh]">
                    <slot />
                </div>
            </div>
            <div v-else class="max-h-screen">
                <aside id="default-sidebar"
                    class="fixed top-0 left-0 z-40 w-64 lg:w-72 bg-surface dark:bg-dark-surface h-screen transition-transform -translate-x-full md:translate-x-0"
                    aria-label="Sidebar">
                    <div
                        class="h-full pb-12 overflow-hidden bg-surface dark:bg-dark-surface flex flex-col justify-between items-center">
                        <div class="flex flex-col gap-14">
                            <div class="h-24 flex justify-center items-end">
                                <Logo />
                            </div>
                            <ul class="flex flex-col gap-9 items-center">
                                <li v-for="sideBarLink in sideBarLinks" :key="sideBarLink.text"
                                    data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar">
                                    <SideBarButton :text="sideBarLink.text" :link="sideBarLink.link"
                                        :icon="sideBarLink.icon" />
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <SideBarButton :text="sideBarLinkForCreate.text" :link="sideBarLinkForCreate.link"
                                        :icon="sideBarLinkForCreate.icon" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
                <div class="max-h-screen overflow-hidden pb-20 md:ml-64 lg:ml-72">
                    <div class="h-24 flex justify-between md:justify-endd items-center px-6 md:px-12 xl:px-32 border-b">
                        <div class="flex gap-6 md:hidden">
                            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
                                aria-controls="default-sidebar" type="button"
                                class="inline-flex items-center text-xl md:hidden  outline-none">
                                <span class="sr-only">Open sidebar</span>
                                <svg class="w-9 h-9" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                                    </path>
                                </svg>
                            </button>
                            <Logo />
                        </div>
                        <div v-if="userStore.name" class="max-md:hidden">
                            <div class="text-xl flex items-center font-medium">
                                <span>{{ greeting }}</span>
                                <span class="text-primary font-bold mr-2">, </span>
                                <span class="mr-2"> {{ userStore.name.substring(0, userStore.name.indexOf(" ")) }}</span>
                                <span class="mb-0.5 -ml-1 text-lg">👋</span>
                            </div>
                            <div class="text-xs">
                                You are signed in as <span class="text-primary">{{ userStore.name }}</span>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <Profile />
                        </div>
                    </div>
                    <div class="h-[90vh]">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGeneralStore, useUserStore } from '@/pinia-stores';
import { meQueryResponse } from '@/graphql/user/me-query.types';
import { meQuery } from '@/graphql/user';
import { initDrawers, initDropdowns, initCollapses } from 'flowbite';
import { Icon } from '@iconify/vue';

const generalStore = useGeneralStore()
const userStore = useUserStore()
const { getToken } = useApollo()

let greeting = "Good "
var now = (new Date()).getHours();
switch (true) {
    case now < 13:
        greeting += "Morning"
        break;
    case now <= 14:
        greeting += "Noon"
        break;
    case now < 18:
        greeting += "Afternoon"
        break;
    case now < 21:
        greeting += "Evening"
        break;
    case now < 24:
        greeting += "Night"
        break;
}

onMounted(() => {
    generalStore.clearNotification()
    initDropdowns()
    initDrawers()
    initCollapses()
    getToken().then(token => {
        if (token) {
            const { onResult } = useQuery<meQueryResponse>(meQuery, null, {
                pollInterval: 2 * 60 * 1000,
                fetchPolicy: "cache-and-network"
            })
            onResult(result => {
                userStore.$state = { ...result.data.me, refreshToken: userStore.refreshToken }
            })
        } else {
            userStore.$reset()
        }
    }).catch(error => {
        console.error("default layout getToken", error)
    })
})

// Data
const sideBarLinks = [
    {
        link: "/events",
        text: "Events",
        icon: {
            icon: "material-symbols:celebration-rounded"
        }
    },
    {
        link: "/events/my",
        text: "My Events",
        icon: {
            icon: "mdi:wizard-hat"
        }
    },
    {
        link: "/events/saved",
        text: "Saved",
        icon: {
            icon: "material-symbols:bookmark-rounded"
        },

    },
    {
        link: "/tickets",
        text: "Tickets",
        icon: {
            icon: "heroicons:ticket-20-solid"
        }
    }
]

const sideBarLinkForCreate = {
    link: "/events/create",
    text: "Create",
    icon: {
        icon: "material-symbols:add-rounded"
    }
}
</script>