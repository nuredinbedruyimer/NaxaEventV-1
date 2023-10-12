<template>
    <div>
        <div class="w-full p-2 pr-3 border-2 border-primary text-on-surface text-center font-medium rounded-md cupo"
            @click.stop="toggleFollow" :class="{ 'animate-pulse duration-75': adding || dropping }">
            <span v-if="thisEvent.followed_by_user">
                <span>Following</span>
            </span>
            <span v-else class="flex justify-center gap-2 items-center">
                <Icon icon="material-symbols:add-rounded" class="text-2xl" />
                <span>Follow</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Event } from '~~/graphql/events/event.type';
import { Icon } from '@iconify/vue';
import { useGeneralStore, useUserStore } from '~~/pinia-stores';

const props = defineProps<{
    event: Event,
    followersCountUpdater: (addCount: number) => void
}>()

const generalStore = useGeneralStore()
const userStore = useUserStore()
const router = useRouter()
const thisEvent = { ...props.event, user: { ...props.event.user } }
const { mutate: add, onDone: onAddDone, onError: onAddError, loading: adding } = addFollow()
const { mutate: drop, onDone: onDropDone, onError: onDropError, loading: dropping } = dropFollow()
onAddDone(result => {
    thisEvent.followed_by_user = result.data?.insertFollowsOne.id
    // thisEvent.user.followersCount++
    // props.followersCountUpdater(1)
})
onAddError(error => {
    props.followersCountUpdater(-1)
    generalStore.setErrorNotification("Couldn't follow the user, please try again!")
    console.error("onAddError:", error)
})
onDropDone(() => {
    // thisEvent.followed_by_user = undefined
    // thisEvent.user.followersCount--
    // props.followersCountUpdater(-1)
})
onDropError(error => {
    props.followersCountUpdater(1)
    generalStore.setErrorNotification("Couldn't un-follow the user, please try again!")
    console.error("onDropError:", error)
})

function toggleFollow() {
    if (!userStore.isAuthorized) {
        router.push("/signin")
    } else if (adding.value || dropping.value) {
        return
    } else if (thisEvent.followed_by_user) {
        drop({ id: thisEvent.followed_by_user })
        thisEvent.followed_by_user = undefined
        props.followersCountUpdater(-1)
    } else {
        props.followersCountUpdater(1)
        add({ followedId: thisEvent.user.id })
    }
}

</script>