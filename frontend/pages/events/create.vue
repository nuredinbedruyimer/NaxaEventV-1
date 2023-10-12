<template>
    <Head>
        <Title>New event | Event Space</Title>
    </Head>
    <CreateEvent v-if="userStore.isAuthorized" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia-stores';
const router = useRouter()
const userStore = useUserStore()
if (!userStore.isAuthorized) router.replace("/signin")
</script>