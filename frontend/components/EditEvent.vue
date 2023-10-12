<template>
    <Head>
        <Title>Editing | {{ result?.eventsByPk.title ?? '' }}</Title>
    </Head>
    <div class="h-full overflow-auto">
        <div v-if="result">
            <EventComposer title="Edit Event" :getId="getId" :submitter="submitter" :oldEvent="result.eventsByPk" />
        </div>
        <div v-else-if="loading" class="flex justify-center w-full pt-20">
            <div class="w-fit">
                <Loading />
            </div>
        </div>
        <div v-else class="flex justify-center w-full pt-20">
            <div class="w-fit">
                <Error :retry="refetchEvent" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { GetEventQueryRes, GetEventQueryVars } from '~~/graphql/events/get-event-query.types';
import { getEventQuery } from "~~/graphql/events"
import { ComposedEvent } from './types';
import { UseMutationReturn } from '@vue/apollo-composable';
import { UpdateEventMutationRes, UpdateEventMutationVars } from '~~/graphql/events/update-event.mutation.types';
import { updateEventMutation } from "~~/graphql/events"
import { FetchResult } from '@apollo/client';

const route = useRoute()
const { result, loading, onError, refetch } = useQuery<GetEventQueryRes, GetEventQueryVars>(
    getEventQuery,
    {
        id: route.params.id as string
    },
    {
        fetchPolicy: "network-only"
    }
)
onError(error => {
    console.error("getting event detail onError:", error)
})

function refetchEvent() {
    refetch()
}

function submitter(composedEvent: ComposedEvent): UseMutationReturn<UpdateEventMutationRes, UpdateEventMutationVars> {
    const newEvent: UpdateEventMutationVars = {
        id: route.params.id as string,
        ...composedEvent,
        title: composedEvent.title!,
        date: composedEvent.date!,
        location: [composedEvent.latitude!, composedEvent.longitude!]
    }
    return useMutation<UpdateEventMutationRes, UpdateEventMutationVars>(
        updateEventMutation,
        {
            variables: newEvent,
            fetchPolicy: "no-cache"
        }
    )
}

function getId(result: FetchResult) {
    return result.data?.updateEventsByPk.id
}
</script>