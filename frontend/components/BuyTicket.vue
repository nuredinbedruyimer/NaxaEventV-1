<template>
    <div>
        <div @click.stop="handleBuyClick"
            class="p-2 rounded-lg cupo bg-primary text-on-primary w-full text-center font-medium">
            Buy Ticket
        </div>
        <div @click.stop="() => { }">
            <TransitionRoot as="template" :show="isPopupOpen">
                <Dialog as="div" class="relative z-[60]" @close="isPopupOpen = false">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </TransitionChild>
                    <div class="fixed inset-0 z-[60] overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild as="template" enter="ease-out duration-300"
                                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                leave-from="opacity-100 translate-y-0 sm:scale-100"
                                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                <DialogPanel
                                    class="relative text-on-background max-w-[400px] transform overflow-hidden rounded-lg bg-surface p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div v-if="ticketAdded" class="flex flex-col text-center text-md p-4">
                                        <span class="font-bold text-3xl text-primary">Congratulations!</span>
                                        <span>You have successfully bought a ticket!</span>
                                        <span>The Tickets QR Code has been sent to your email.</span>
                                        <div class="mt-5 sm:mt-6">
                                            <button type="button" class="ticket-sell-dialog-btn cupo"
                                                @click="resetTicket">Okay</button>
                                        </div>
                                    </div>
                                    <div v-else-if="ticketError" class="p-4 text-center">
                                        <span class="text-error">Sorry,somethings went wrong and we couldn't process your
                                            request, please try again.</span>
                                        <div class="mt-5 sm:mt-6">
                                            <button type="button" class="ticket-sell-dialog-btn cupo"
                                                @click="resetTicket">Close</button>
                                        </div>
                                    </div>
                                    <div v-else class="">
                                        <img :src="createStaticServerLink(event.images)"
                                            class="h-[250px] w-full rounded-md object-cover mb-1" />
                                        <div class="ml-0.5">
                                            <h3 class="text-lg font-semibold">
                                                {{ event.title }}
                                            </h3>
                                            <div class="py-2">
                                                <div class="flex gap-2 items-center">
                                                    <Icon icon="material-symbols:date-range" class="text-primary text-xl" />
                                                    <span>{{ getFullFormattedDate(event.date) }}</span>
                                                </div>
                                                <div class="flex gap-2 items-center">
                                                    <Icon icon="mdi:map-marker" class="text-primary text-xl" />
                                                    <span>{{ event.city ? event.city.name : "City not specified!" }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-5 sm:mt-6">
                                            <button type="button" @click="buyTicket"
                                                class="ticket-sell-dialog-btn cupo outline-none"
                                                :class="{ 'disabled bg-indigo-500': adding }">
                                                Pay <span class="font-bold">{{ event.price }} ETB</span>
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EventPreview } from '~~/graphql/events/event-preview.type';
import { initModals } from 'flowbite'
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useUserStore } from '~~/pinia-stores';
import { createStaticServerLink, getFullFormattedDate } from '~~/commons/functions';
import { Icon } from '@iconify/vue';
const isPopupOpen = ref(false)
const props = defineProps<{
    event: EventPreview
}>()

const userStore = useUserStore()
const router = useRouter()
const ticketAdded = ref(false)
const { mutate: add, onDone: onAddDone, onError: onAddError, loading: adding, error: ticketError } = addTicket()
onAddDone(() => {
    ticketAdded.value = true
})
onAddError(error => {
    console.error("onAddError:Ticket", error)
})

function handleBuyClick() {
    if (!userStore.isAuthorized) {
        router.push("/signin")
    } else {
        isPopupOpen.value = true
    }

}
function buyTicket() {
    if (adding.value) return
    add({ eventId: props.event.id })
}
function resetTicket() {
    isPopupOpen.value = false
    setTimeout(() => {
        ticketAdded.value = false
        ticketError.value = null
    }, 1000)
}
onMounted(() => {
    initModals()
})
</script>

<style>
.ticket-sell-dialog-btn {
    @apply bg-primary text-on-primary border-2 p-3 rounded-lg w-full text-center
}
</style>