<template>
    <Head>
        <Title>Tickets | Event Space</Title>
    </Head>
    <TicketListing v-if="userStore.isAuthorized" />
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia-stores';
const router = useRouter()
const userStore = useUserStore()
if (!userStore.isAuthorized) router.replace("/signin")
</script>