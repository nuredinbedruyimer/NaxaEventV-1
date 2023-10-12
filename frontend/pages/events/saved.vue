<template>
    <Head>
        <Title>Saved events | Event Space</Title>
    </Head>
    <EventListing title="Saved events" v-if="userStore.isAuthorized" listKind="saved" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia-stores';
const router = useRouter()
const userStore = useUserStore()
if (!userStore.isAuthorized) router.replace("/signin")
</script>