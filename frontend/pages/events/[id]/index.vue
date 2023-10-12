<template>
    <Head v-if="result">
        <Title>{{ result.eventsByPk.title }}</Title>
        <Meta name="description" :content="result.eventsByPk.description" />
    </Head>
    <div class="min-h-full flex flex-col h-full overflow-auto pt-10 justify-between">
        <div v-if="result?.eventsByPk" class="mx-auto w-fit max-w-[1090px]">
            <div class="px-7 max-xl:2lg:px-28">
                <h3 class="text-xl font-bold mb-6">{{ result.eventsByPk.title }}</h3>
            </div>
            <div class="xl:grid grid-cols-5 gap-20 min-h-screen px-7 max-xl:2lg:px-28">
                <div class=" flex flex-col gap-10 col-span-3">
                    <div>
                        <div>
                            <div class="mb-4">
                                <img :src="createStaticServerLink(result.eventsByPk.images[0])"
                                    class="mb-4 rounded-md w-full h-72 object-cover" />
                                <p>{{ result.eventsByPk.description ?? "" }}</p>
                                <span class="text-primary">
                                    <span v-for="tag in result.eventsByPk.tags" class="mr-3">
                                        <NuxtLink :to="`/events?search=${tag}`">
                                            <span class="font-bold">#</span>{{ tag }}
                                        </NuxtLink>
                                    </span>
                                </span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-2 items-center">
                                    <Icon icon="material-symbols:date-range" class="text-primary text-2xl" />
                                    <span>{{ getFullFormattedDate(result.eventsByPk.date.toString()) }}</span>
                                </div>
                                <div class="flex gap-2 items-center" v-if="result.eventsByPk.city?.name">
                                    <Icon icon="mdi:map-marker" class="text-primary text-2xl" />
                                    <span>{{ result.eventsByPk.city.name }} {{ result.eventsByPk.specificAddress ? `,
                                                                            ${result.eventsByPk.specificAddress}` : "" }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-surface px-5 py-7 xl:hidden">
                        <div class="flex gap-10 w-full mb-7">
                            <div class="w-full">
                                <h3 class="font-bold"> {{ result.eventsByPk.price ? `${result.eventsByPk.price} ETB` :
                                    "FREE" }}</h3>
                                <div v-if="(new Date(result.eventsByPk.date) - new Date()) < 0"
                                    class="text-center border-t border-primary pt-2">
                                    <!-- 86400000 is one day in milliseconds -->
                                    This event happened {{ -Math.floor((new Date(result.eventsByPk.date) - new Date()) /
                                        (86400000)) }} days
                                    ago!
                                </div>
                                <BuyTicket v-else-if="result.eventsByPk.price" :event="result.eventsByPk" />
                                <div v-else class="text-center border-t border-primary pt-2">
                                    This is a free event!
                                </div>
                            </div>
                            <div class="w-full">
                                <Bookmark :isPreview="false" :event="result.eventsByPk" />
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold">Organized BY</p>
                            <div class="flex justify-between items-end mb-2">
                                <div>
                                    <div :user="userStore" id="userDropdownInEvent" class="z-10 hidden">
                                        <ProfileCard :editable="false" :user="result.eventsByPk.user" />
                                    </div>
                                    <p class="font-semibold text-primary" data-dropdown-toggle="userDropdownInEvent"
                                        data-dropdown-placement="bottom-start">
                                        <snap class="cupo">{{ result.eventsByPk.user.name }}</snap>
                                    </p>
                                </div>
                                <p class="whitespace-nowrap"><span class="font-bold">{{
                                    followersCount
                                }}</span> Followers </p>
                            </div>
                            <Follow :followersCountUpdater="updateFollowersCount" :event="result.eventsByPk" />
                        </div>
                    </div>
                    <div>
                        <h3 class="mb-1">Location In map</h3>
                        <iframe v-if="result.eventsByPk.location?.[0] && result.eventsByPk.location?.[1]"
                            class="w-full h-96 border border-gray-300 rounded-md"
                            :src="`https://maps.google.com/maps?q=${result.eventsByPk.location?.[0]},${result.eventsByPk.location?.[1]}&z=15&output=embed`"></iframe>
                        <div v-else class="flex gap-2 border-2 px-5 py-10 rounded-md" v-if="result.eventsByPk.city?.name">
                            <Icon icon="mdi:map-marker" class="text-primary text-2xl" />
                            <span>Coordinates not provided</span>
                        </div>
                    </div>
                    <div>
                        <h4 class="mb-1">More images</h4>
                        <div class="grid grid-cols-3 gap-3">
                            <img v-for="imageUrl in result.eventsByPk.images" :key="imageUrl"
                                @click="openFullImage(createStaticServerLink(imageUrl))"
                                :src="createStaticServerLink(imageUrl)"
                                class="h-40 object-cover border-2 border-gray-300 rounded-md text-center w-full" />
                        </div>
                        <TransitionRoot as="template" :show="isFullImageShowing">
                            <Dialog as="div" class="relative z-50" @close="isFullImageShowing = false">
                                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                    leave-to="opacity-0">
                                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </TransitionChild>

                                <div class="fixed inset-0 z-50 overflow-y-auto h-screen flex items-center justify-center">
                                    <div class="flex justify-center p-4 text-center items-center">
                                        <TransitionChild as="template" enter="ease-out duration-300 h-full"
                                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                            <DialogPanel
                                                class="relative transform overflow-hidden  p-4 transition-all h-full">
                                                <div class="flex justify-center h-full">
                                                    <img :src="showingImageUrl"
                                                        class="rounded-md w-[85%] h-full object-contain" />
                                                </div>
                                            </DialogPanel>
                                        </TransitionChild>
                                    </div>
                                    <div class="absolute top-10 right-10">
                                        <Icon icon="material-symbols:close-rounded" @click="isFullImageShowing = false"
                                            class="text-white cupo text-4xl" />
                                    </div>
                                </div>
                            </Dialog>
                        </TransitionRoot>
                    </div>
                    <div v-if="userStore.id === result.eventsByPk.user.id">
                        <hr class="pt-6 mt-4" />
                        <div class="text-primary">
                            <span class="font-bold">
                                {{ result.eventsByPk.ticketsAggregate.aggregate.count }}
                            </span>
                            <span>
                                Tickets sold so far.
                            </span>
                        </div>
                        <hr class="pt-6 mt-4" />
                        <h4 class="font-bold mb-1">Actions</h4>
                        <div class="pl-4">
                            <div class="flex items-center gap-2 mb-1">
                                <Icon icon="material-symbols:edit-outline" class="text-lg" />
                                <NuxtLink :to="'/events/' + result.eventsByPk.id + '/edit'"><button>Edit</button>
                                </NuxtLink>
                            </div>
                            <div class="flex items-center gap-2 text-error cupo">
                                <Icon icon="ph:trash-simple" class="text-lg" />
                                <div @click="isDeleteConfirmPopupOpen = true">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-surface px-6 py-10 h-fit max-xl:hidden col-span-2 flex flex-col gap-7">
                    <div class="w-full">
                        <h3 class="font-bold"> {{ result.eventsByPk.price ? `${result.eventsByPk.price} ETB` : "FREE" }}
                        </h3>
                        <div v-if="(new Date(result.eventsByPk.date) - new Date()) < 0"
                            class="text-center border-t border-primary pt-2">
                            <!-- 86400000 is one day in milliseconds -->
                            This event happened {{ -Math.floor((new Date(result.eventsByPk.date) - new Date()) /
                                (86400000)) }} days
                            ago!
                        </div>
                        <BuyTicket v-else-if="result.eventsByPk.price" :event="result.eventsByPk" />
                        <div v-else class="text-center border-t border-primary pt-2">
                            This is a free event!
                        </div>
                    </div>
                    <div class="w-full">
                        <Bookmark :isPreview="false" :event="result.eventsByPk" />
                    </div>
                    <div>
                        <p class="font-semibold">Organized BY</p>
                        <div class="flex justify-between items-end mb-2">
                            <div>
                                <div :user="userStore" id="userDropdownInEvent2" class="z-10 hidden">
                                    <ProfileCard :editable="false" :user="result.eventsByPk.user" />
                                </div>
                                <p class="font-semibold text-primary" data-dropdown-toggle="userDropdownInEvent2"
                                    data-dropdown-placement="bottom-start">
                                    <snap class="cupo">{{ result.eventsByPk.user.name }}</snap>
                                </p>
                            </div>
                            <p class="whitespace-nowrap"><span class="font-bold">{{
                                followersCount
                            }}</span> Followers </p>
                        </div>
                        <Follow :followersCountUpdater="updateFollowersCount" :event="result.eventsByPk" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="error" class="flex justify-center pt-20 col-span-3">
            <div class="w-fit">
                <Error :retry="refetchEvent" />
            </div>
        </div>
        <div v-else class="flex justify-center pt-20 col-span-3">
            <div class="w-fit">
                <Loading message="Loading event details..." />
            </div>
        </div>
        <Footer />

        <!-- Delete confirmation pop -->
        <TransitionRoot :show="isDeleteConfirmPopupOpen">
            <Dialog as="div" class="relative z-50" @close="closeDeleteConfirmPopup">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                    leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-50 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-background px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                    <button type="button"
                                        class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        @click="closeDeleteConfirmPopup">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                            Deleting an event</DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">Are you sure you want to delete this event?</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        @click="deleteEvent">Delete</button>
                                    <button type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        @click="closeDeleteConfirmPopup">Cancel</button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import { GetEventQueryRes, GetEventQueryVars } from '~~/graphql/events/get-event-query.types';
import { getEventQuery } from "~~/graphql/events"
import { useUserStore } from '~~/pinia-stores';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { deleteEventMutation } from '~~/graphql/events'
import { DeleteEventRes, DeleteEventVars } from '~~/graphql/events/delete-event.mutation.types'
import { createStaticServerLink, getFullFormattedDate } from '~~/commons/functions';
import { Icon } from '@iconify/vue';
import { ref } from 'vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const followersCount = ref<number>()
const { result, onResult: onEventResult, error, onError: onQueryDetailsError, refetch } = useQuery<GetEventQueryRes, GetEventQueryVars>(
    getEventQuery,
    {
        id: route.params.id as string
    },
    {
        fetchPolicy: "network-only"
    }
)
onEventResult(() => {
    followersCount.value = result.value?.eventsByPk.user.followersCount
})
onQueryDetailsError(error => {
    console.error("getting event detail onError:", error)
})

function refetchEvent() {
    refetch()
}

const { mutate, onError, onDone, loading: deleting } = useMutation<DeleteEventRes, DeleteEventVars>(
    deleteEventMutation,
    {
        fetchPolicy: "network-only"
    }
)
onDone(() => {
    router.replace("/events")
})
onError(error => {
    console.error("deleting event onError:", error)
})
function deleteEvent() {
    if (result.value) {
        mutate({ id: result.value.eventsByPk.id })
    }
}
function updateFollowersCount(addCount: number): void {
    if (followersCount.value) {
        followersCount.value += addCount
    }
}
// full image
const showingImageUrl = ref<string>("")
const isFullImageShowing = ref(false)
function openFullImage(url: string) {
    showingImageUrl.value = url
    isFullImageShowing.value = true
}
// deleting dialog
const isDeleteConfirmPopupOpen = ref(false)
function closeDeleteConfirmPopup() {
    if (!deleting.value) isDeleteConfirmPopupOpen.value = false
}
</script>