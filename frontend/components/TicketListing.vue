<template>
    <div class="min-h-full h-full overflow-auto flex flex-col items-center justify-between">
        <div class="p-9 max-w-[650px] xl:max-w-[1000px]">
            <div class="w-full">
                <h3 class="text-start w-full font-bold text-2xl mb-4 pl-1 ">Your Tickets</h3>
            </div>
            <div v-if="ticketsResult" class="flex flex-col gap-12 w-fit "
                :class="{ 'w-full': loadingTickets || (ticketsResult && ticketsResult.me.tickets.length > 0) }">
                <div v-if="(ticketsResult.me.tickets.length > 0)" v-for="ticket in ticketsResult.me.tickets"
                    :key="ticket.id">
                    <TicketCard :ticket="ticket" />
                </div>
                <div v-else class="flex flex-col items-center pt-20 w-full 2lg:w-[600px] 2xl:w-[800px]">
                    <div class="flex flex-col gap-4 items-center border border-gray-300 w-fit p-12 rounded-xl shadow-lg">
                        <span>
                            <Icon icon="heroicons:ticket-20-solid" class="text-5xl text-primary" />
                        </span>
                        <span class="text-lg">
                            Your tickets will appear here
                        </span>
                        <span>
                            <NuxtLink to="/events" class="text-primary font-bold flex items-center  gap-1">
                                Explore Events <span>
                                    <Icon icon="material-symbols:arrow-right-alt-rounded" />
                                </span>
                            </NuxtLink>
                        </span>
                    </div>
                </div>
            </div>
            <div v-else-if="loadingTickets" class="flex justify-center pt-20 col-span-3 w-full 2lg:w-[600px] 2xl:w-[800px]">
                <div class="w-fit">
                    <Loading message="Loading tickets..." />
                </div>
            </div>
            <div v-else-if="ticketsError" class="flex justify-center pt-20 col-span-3">
                <div class="w-fit">
                    <Error :retry="refetchTickets" />
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { EventPreview } from "~~/graphql/events/event-preview.type";
import { MyTicketsRes } from "~~/graphql/tickets/ticket.query.types";
import { myTicketsQuery } from "../graphql/tickets"
import { Ticket } from "../graphql/tickets/ticket.type"
import { Icon } from "@iconify/vue";

type organizedEvent = Array<{ event?: EventPreview, tickets?: Array<Ticket> }>

const { result: ticketsResult, loading: loadingTickets, onError: onTicketsError, error: ticketsError, refetch: refetchTickets } = useQuery<MyTicketsRes, {}>(
    myTicketsQuery,
    {},
    {
        fetchPolicy: "network-only"
    }
)
let ticketsByEvent: globalThis.Ref<organizedEvent> = ref([])
onTicketsError(error => {
    console.error("MyTicketsRes onError", error)
})
</script>