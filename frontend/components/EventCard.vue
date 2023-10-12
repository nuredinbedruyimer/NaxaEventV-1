<template>
    <div @click="router.push(`/events/${event.id}`)"
        class="border-2 border-gray-300 hover:border-primary w-[100%] cupo bg-gray-100 rounded-xl overflow-hidden pb-5 xl:pb-2">
        <div class="h-52" :class="{ 'border-b': !event.images }">
            <img :src="createStaticServerLink(event.images ?? defaultEventImageUrl)" :alt="event.title"
                class="w-full h-full object-cover " />
        </div>
        <div class="flex flex-col h-[64%] justify-between gap-6 px-5 py-8">
            <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <h3 class="font-bold">
                        {{ event.title }}
                    </h3>
                    <p>
                        {{ description.length > descriptionPreviewLength ? description.substring(0,
                            descriptionPreviewLength) + `...` : description }}
                    </p>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex gap-2 items-center">
                        <Icon icon="material-symbols:date-range" class="text-primary text-2xl" />
                        <span>{{ getFullFormattedDate(event.date) }}</span>
                    </div>
                    <div class="flex gap-2 items-center" v-if="event.city?.name">
                        <Icon icon="mdi:map-marker" class="text-primary text-2xl" />
                        <span>{{ event.city.name }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between px-1">
                    <span class="font-bold text-xl">
                        {{
                            event.price ? `${event.price} ETB` : "FREE"
                        }}
                    </span>
                    <Bookmark :isPreview="true" :event="event" :dropEvent="dropEvent" />
                </div>
                <div v-if="(new Date(event.date) - new Date()) < 0" class="text-center border-t border-primary pt-2">
                    <!-- 86400000 is one day in milliseconds -->
                    This event happened {{ daysPassed }} day<span v-if="daysPassed !== 1">s</span> ago!
                </div>
                <BuyTicket v-else-if="event.price" :event="event" />
                <div v-else class="text-center border-t border-primary pt-2">
                    This is a free event!
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EventPreview } from "@/graphql/events/event-preview.type"
import { Icon } from '@iconify/vue';
import { createStaticServerLink, getFullFormattedDate } from "~~/commons/functions";
import { defaultEventImageUrl } from "~~/commons/variables";

const router = useRouter()
const descriptionPreviewLength: number = 90
const props = defineProps<{
    event: EventPreview
    dropEvent: () => void
}>()
const description = props.event.description ?? ""
const daysPassed = ref(-Math.floor((new Date(props.event.date) - new Date()) / (86400000)))
</script>