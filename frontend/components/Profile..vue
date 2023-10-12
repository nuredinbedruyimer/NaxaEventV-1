<template>
    <div>
        <div class="h-9 w-9 lg:w-11 lg:h-11 text-xl cupo">
            <Avatar :url="userStore.avatarUrl ? createStaticServerLink(userStore.avatarUrl) : ''" :name="userStore.name"
                id="avatarButton" type="button" data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start" />
        </div>
        <div :user="userStore" id="userDropdown" class="z-10 hidden">
            <ProfileCard :user="userStore" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { initDropdowns } from 'flowbite';
import { createStaticServerLink } from '~~/commons/functions';
import { useUserStore } from '~~/pinia-stores';

const userStore = useUserStore()
onMounted(() => {
    initDropdowns()
})
</script>