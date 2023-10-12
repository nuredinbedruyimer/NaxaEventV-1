<template>
    <div>
        <div v-if="isPreview" class="flex gap-0 items-center" :class="{ 'animate-pulse': adding || dropping }">
            <div class="text-3xl" @click.stop="toggleBookmark">
                <span v-if="thisEvent.bookmarked_by_user">
                    <Icon icon="material-symbols:bookmark-rounded" />
                </span>
                <span v-else>
                    <Icon icon="material-symbols:bookmark-outline-rounded" />
                </span>
            </div>
            <span class="text-2xl w-5 text-end ">{{ thisEvent.bookmarks_count }}</span>
        </div>
        <div v-else :class="{ 'animate-pulse': adding || dropping }" class="w-full">
            <p><span class="font-bold">{{ thisEvent.bookmarks_count }}</span> Bookmarks</p>
            <div class="flex gap-4 justify-center items-center border-2 w-full p-1 pr-3 border-primary rounded-md font-medium cupo"
                @click.stop="toggleBookmark" :class="{ 'border-disabled': adding || dropping }">
                <div class="text-3xl text-primary">
                    <span v-if="thisEvent.bookmarked_by_user">
                        <Icon icon="material-symbols:bookmark-rounded" />
                    </span>
                    <span v-else>
                        <Icon icon="material-symbols:bookmark-outline-rounded" />
                    </span>
                </div>
                {{ thisEvent.bookmarked_by_user ? "Bookmarked" : "Bookmark" }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EventPreview } from '~~/graphql/events/event-preview.type';
import { Icon } from '@iconify/vue';
import { useGeneralStore, useUserStore } from '~~/pinia-stores';

const props = defineProps<{
    isPreview: boolean
    event: EventPreview
    dropEvent: () => void
}>()

const generalStore = useGeneralStore()
const userStore = useUserStore()
const router = useRouter()
const thisEvent = { ...props.event }
const { mutate: add, onDone: onAddDone, onError: onAddError, loading: adding } = addBookmark()
const { mutate: drop, onDone: onDropDone, onError: onDropError, loading: dropping } = dropBookmark()

onAddDone(result => {
    thisEvent.bookmarked_by_user = result.data?.insertBookmarksOne.id
})
onAddError(error => {
    thisEvent.bookmarks_count--
    generalStore.setErrorNotification("Couldn't bookmark the event, please try again!")
    console.error("onAddError:", error)
})

onDropDone(() => {
    thisEvent.bookmarked_by_user = undefined
})
onDropError(error => {
    thisEvent.bookmarks_count++
    generalStore.setErrorNotification("Couldn't un-bookmark the event, please try again!")
    console.error("onDropError:", error)
})

function toggleBookmark() {
    if (!userStore.isAuthorized) {
        router.push("/signin")
    } else if (adding.value || dropping.value) {
        return
    } else if (thisEvent.bookmarked_by_user) {
        thisEvent.bookmarks_count--
        props.dropEvent()
        drop({ id: thisEvent.bookmarked_by_user })
    } else {
        thisEvent.bookmarks_count++
        add({ eventId: thisEvent.id })
    }
}

</script>