<template>
    <div @scroll="handleScroll" ref="scrollingList" class="h-full overflow-auto p-5 pt-16 flex flex-col items-center">
        <div
            class="min-h-full w-[95%] sm:max-md:w-[550px] md:max-xl:max-w-[640px] max-2xl:max-w-[900px] max-w-[1240px] space-y-12 items-start justify-between">
            <div class="w-full">
                <h3 class="text-start w-full font-bold text-2xl mb-4">{{ title }}</h3>
                <div class="flex w-full gap-3 items-center max-w-[1000px]">
                    <div class="relative w-full h-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input v-model="searchText"
                            class="block w-full h-full p-4 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 outline-none shadow-md"
                            placeholder="Search Events...">
                    </div>
                    <div>
                        <div id="filterButton" data-dropdown-placement="bottom-end" data-dropdown-toggle="filterDropdown"
                            type="button"
                            class="relative w-full h-full justify-center gap-x-1.5 text-gray-500 border bg-gray-50 border-gray-200 rounded-md px-3 py-[9.5px] text-sm font-semibold shadow-md hover:bg-gray-100 cupo">
                            <Icon icon="mi:filter" class="text-3xl" />
                            <div v-show="filtersAdded"
                                class="absolute inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full -top-2 -right-2 shadow-2xl border-4 border-background">
                            </div>
                        </div>
                        <div id="filterDropdown"
                            class="z-10 hidden bg-background border-2 border-gray-300 rounded-lg shadow-lg">
                            <div class="py-1">
                                <div class="flex flex-col gap-4 p-5 ">
                                    <Menu as="div" class="relative inline-block text-left">
                                        <h5 class="field-label text-black">Sort By</h5>
                                        <div>
                                            <MenuButton
                                                class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                <SortByItem
                                                    :sortByItem="sortByItems[sortBy] ?? { name: 'Distance', icon: '' }" />
                                                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </MenuButton>
                                        </div>

                                        <transition enter-active-class="transition ease-out duration-100"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-75"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems
                                                class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div>
                                                    <MenuItem
                                                        class="px-3 py-2 hover:bg-gray-200 border-b border-b-gray-200 cupo">
                                                    <div @click="sortByLocation = true">
                                                        <SortByItem :sortByItem="{ name: 'Distance', icon: '' }" />
                                                    </div>
                                                    </MenuItem>
                                                    <MenuItem v-for="sortByItem in Object.entries(sortByItems)"
                                                        :key="sortByItem[0]"
                                                        class="px-3 py-2 hover:bg-gray-200 border-b border-b-gray-200 cupo">
                                                    <div @click="sortBy = `${sortByItem[0]}`">
                                                        <SortByItem :sortByItem="sortByItem[1]" />
                                                    </div>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                    <div class="flex flex-col">
                                        <h5 class="field-label text-black">Price range</h5>
                                        <div class="flex gap-5">
                                            <div class="w-40">
                                                <label for="min-price" class="text-sm">Min price</label>
                                                <input v-model="minPrice" type="number" name="min-price"
                                                    class="text-field-sm">
                                            </div>
                                            <div class="w-40">
                                                <label for="max-price" class="text-sm">Max price</label>
                                                <input v-model="maxPrice" type="number" name="max-price"
                                                    class="text-field-sm">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col">
                                        <h5 class="field-label text-black">Date Range</h5>
                                        <div class="flex gap-5">
                                            <div class="w-40">
                                                <label for="min-date" class="text-sm">Min date</label>
                                                <input v-model="minDate" type="date" name="min-date" class="text-field-sm">
                                            </div>
                                            <div class="w-40">
                                                <label for="max-date" class="text-sm">Max date</label>
                                                <input v-model="maxDate" type="date" name="max-date" class="text-field-sm">
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch"
                                            data-dropdown-placement="bottom"
                                            class="mt-2 font-medium flex items-center w-full border border-gray-300 p-3 py-2 rounded-md"
                                            type="button">Select cities<svg class="w-4 h-4 ml-2" aria-hidden="true"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                        <div id="dropdownSearch"
                                            class="z-10 hidden bg-white rounded-lg shadow-lg border border-gray-300 dark:bg-gray-700 w-[340px]">
                                            <div class="p-3">
                                                <label for="input-group-search" class="sr-only">Search</label>
                                                <div class="relative">
                                                    <div
                                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                            aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                                clip-rule="evenodd"></path>
                                                        </svg>
                                                    </div>
                                                    <input type="text" id="input-group-search" v-model="citySearchText"
                                                        class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Search city">
                                                </div>
                                            </div>
                                            <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdownSearchButton">
                                                <li v-for="(city, index) in getCitiesResult?.cities"
                                                    v-show="!citySearchText || searchedCities[index]" :key="city.id">
                                                    <div
                                                        class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                        <input :id="city.id" type="checkbox" :value="city.id"
                                                            v-model="selectedCities"
                                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded outline-none [accent-color:#A500CE]">
                                                        <label :for="city.id"
                                                            class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                                                                city.name }}</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-show="filtersAdded">
                                        <hr>
                                        <div class="py-1 text-center">
                                            <span class="font-bold text-primary cupo" @click="resetFilters">
                                                Reset Filters
                                            </span>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="min-h-full">
                <div v-if="loading && events.length === 0" class="flex justify-center pt-20 col-span-3">
                    <div class="w-fit">
                        <Loading message="Loading events..." />
                    </div>
                </div>
                <div v-else-if="events">
                    <div v-if="(events.length > 0)"
                        class="container grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-y-1 gap-x-12">
                        <EventCard v-for="event in events" class="mb-20 w-full" :key="event.id" :event="event"
                            :dropEvent="() => dropEvent(event.id)" />
                    </div>
                    <div v-else class="flex flex-col items-center pt-20">
                        <div
                            class="flex flex-col gap-4 items-center border border-gray-300 w-fit p-12 rounded-xl shadow-lg">
                            <span>
                                <Icon icon="material-symbols:celebration-rounded" class="text-5xl text-primary" />
                            </span>
                            <span class="text-lg">
                                {{ listKind === 'my' ? 'Your events' : listKind === 'saved' ? 'Saved events' : 'Events' }}
                                will appear
                                here
                            </span>
                            <span>
                                <NuxtLink v-if="listKind === 'my'" to="/events/create"
                                    class="text-primary font-bold flex items-center  gap-1">
                                    Create An Event
                                    <Icon icon="material-symbols:arrow-right-alt-rounded" />
                                </NuxtLink>
                                <NuxtLink v-if="listKind === 'saved'" to="/events"
                                    class="text-primary font-bold flex items-center  gap-1">
                                    See All Events
                                    <Icon icon="material-symbols:arrow-right-alt-rounded" />
                                </NuxtLink>
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-center" :class="{ invisible: !loading || (events.length === 0) }">
                        <Spinner />
                    </div>
                </div>
                <div v-else-if="error" class="flex justify-center pt-20 col-span-3">
                    <div class="w-fit">
                        <Error :retry="refetchEvents" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import { DocumentNode } from "graphql";
import { GetEventsVars, GetEventsRes, GetMyEventsRes, GetSavedEventsRes, GetEventsByLocationRes } from "~~/graphql/events/get-events.types";
import { getEventsQuery, getEventByLocationQuery, getMyEventsQuery, getSavedEventsQuery } from "~~/graphql/events"
import { EventPreview } from "~~/graphql/events/event-preview.type";
import { useFilterStore, useUserStore } from "~~/pinia-stores";
import { initDropdowns } from 'flowbite'
import { useGeolocation } from '@vueuse/core'
import { Icon } from '@iconify/vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

type listKindType = "all" | "my" | "saved" | "search" | "location"

const route = useRoute()
const filterStore = useFilterStore()
const userStore = useUserStore()
const props = defineProps<
    {
        listKind: listKindType,
        title: string
    }
>()
const { coords } = useGeolocation()


// sortBY
const sortBys = {
    "none": {},
    "dateAsc": { date: "ASC" },
    "dateDesc": { date: "DESC" },
    "priceAsc": { price: "ASC" },
    "priseDesc": { price: "DESC" },
}

const sortByItems = {
    "dateAsc": {
        name: "Date",
        icon: "mdi:arrow-up-thin"
    },
    "dateDesc": {
        name: "Date",
        icon: "mdi:arrow-down-thin"
    },
    "priceAsc": {
        name: "Price",
        icon: "mdi:arrow-up-thin"
    },
    "priseDesc": {
        name: "Price",
        icon: "mdi:arrow-down-thin"
    }
}
// vars
const paginationLimit: number = 8
const userId = userStore.id
let queryDocument = ref<DocumentNode>(getEventsQuery)
let queryVars = reactive<GetEventsVars>(
    {
        offset: 0,
        limit: paginationLimit,
        // @ts-ignore
        orderBy: sortBys[filterStore.orderBy],
        cityId: filterStore.cityId,
        date: filterStore.date,
        price: filterStore.price,
        userId: userId && props.listKind === "my" ? { _eq: userId } : {},
        bookmarks: {},
        search: "",
        lat: coords.value.latitude,
        long: coords.value.longitude,
    }
)

let events = ref<Array<EventPreview>>([])
let getEvents: (result: any) => Array<EventPreview>
let updateQuery: (previousResult: any, fetchMoreResult: any) => {}

// search
const searchText = ref(route.query.search?.toString() ?? filterStore.searchText)
watchEffect(() => {
    queryVars.search = `%${searchText.value}%`
    filterStore.searchText = searchText.value
})

// sort by location
watch(coords, () => {
    queryVars.lat = coords.value.latitude
    queryVars.long = coords.value.longitude
})
const sortByLocation = ref<boolean>(filterStore.orderBy === "none")
watch(sortByLocation, () => {
    if (sortByLocation.value) {
        queryVars.orderBy = {}
        sortBy.value = "none"
        setQueries("location")
    } else {
        setQueries(props.listKind)
    }
})

const sortBy = ref(filterStore.orderBy)
watch(sortBy, (newValue) => {
    if (newValue != "none") {
        sortByLocation.value = false
    }
    // @ts-ignore
    queryVars.orderBy = sortBys[newValue]
    filterStore.orderBy = newValue
})

// filter by price
const minPrice = ref<number | string | undefined>(filterStore.price._gte)
const maxPrice = ref<number | string | undefined>(filterStore.price._lte)
watch([minPrice, maxPrice], ([minP, maxP]) => {
    const range: { _gte?: number, _lte?: number } = {}
    if (typeof minP === "number") {
        range._gte = minP
    }
    if (typeof maxP === "number") {
        range._lte = maxP
    }
    queryVars.price = range
    filterStore.price = range
})

// filter by date
let lastMaxDate = filterStore.date._lte
if (lastMaxDate) {
    lastMaxDate = new Date(lastMaxDate)
    lastMaxDate = new Date(lastMaxDate.setDate(lastMaxDate.getDate() - 1))
    let month: number | string = lastMaxDate.getUTCMonth() + 1
    month = month < 10 ? `0${month}` : month
    let date: number | string = lastMaxDate.getDate()
    date = date < 10 ? `0${date}` : date
    lastMaxDate = `${lastMaxDate.getFullYear()}-${month}-${date}`
}
const minDate = ref<Date | undefined>(filterStore.date._gte!)
const maxDate = ref<Date | number | string | undefined>(lastMaxDate)
watch([minDate, maxDate], ([minD, maxD]) => {
    const range: { _gte?: Date, _lte?: Date | number | string } = {}
    if (minD) {
        range._gte = minD
    }
    if (maxD) {
        maxD = new Date(maxD)
        maxD = new Date(maxD.setDate(maxD.getDate() + 1))
        range._lte = maxD
    }
    queryVars.date = range
    filterStore.date = range
})

// filter by cities
const { result: getCitiesResult, onError: onGetCitiesError } = getCities()
onGetCitiesError(error => {
    console.error("onGetCitiesError:", error)
})
const selectedCities = ref<string[]>(filterStore.selectedCities)
watch(selectedCities, () => {
    if (selectedCities.value.length) {
        queryVars.cityId = { _in: selectedCities.value }
        filterStore.cityId = { _in: selectedCities.value }
    } else {
        queryVars.cityId = {}
        filterStore.cityId = {}
    }
    filterStore.selectedCities = selectedCities.value
})
const citySearchText = ref("")
const searchedCities = ref<Boolean[]>([])
watch(citySearchText, () => {
    if (getCitiesResult.value) {
        searchedCities.value = getCitiesResult.value?.cities.map(city => city.name.toLowerCase().includes(citySearchText.value.toLocaleLowerCase()))
    }
})
function setQueries(listKind: listKindType): void {
    switch (listKind) {
        case "all":
            queryDocument.value = getEventsQuery
            getEvents = (result: GetEventsRes) => {
                return result.events
            }
            updateQuery = (previousResult: GetEventsRes, fetchMoreResult: GetEventsRes) => (
                {
                    ...previousResult,
                    events: [
                        ...previousResult.events,
                        ...fetchMoreResult.events,
                    ],
                }
            )
            break
        case "my":
            queryDocument.value = getMyEventsQuery
            getEvents = (result: GetMyEventsRes) => {
                return result.me.events
            }
            updateQuery = (previousResult: GetMyEventsRes, fetchMoreResult: GetMyEventsRes) => (
                {
                    ...previousResult,
                    me: {
                        ...previousResult.me,
                        events: [
                            ...previousResult.me.events,
                            ...fetchMoreResult.me.events,
                        ]
                    },
                }
            )
            break
        case "saved":
            queryDocument.value = getSavedEventsQuery
            getEvents = (result: GetSavedEventsRes) => {
                return result.me.bookmarks.map(bookmark => bookmark.event)
            }
            updateQuery = (previousResult: GetSavedEventsRes, fetchMoreResult: GetSavedEventsRes) => {
                return {
                    ...previousResult,
                    me: {
                        ...previousResult.me,
                        bookmarks: [
                            // ...previousResult.me.bookmarks,
                            ...events.value.map(event => (
                                {
                                    __typename: "Bookmarks",
                                    event
                                }
                            )),
                            ...fetchMoreResult.me.bookmarks,
                        ]
                    },
                }
            }
            break
        case "location":
            if (props.listKind !== "all") return setQueries(props.listKind)
            queryDocument.value = getEventByLocationQuery
            getEvents = (result: GetEventsByLocationRes) => {
                return result.eventsByLocation
            }
            updateQuery = (previousResult: GetEventsByLocationRes, fetchMoreResult: GetEventsByLocationRes) => (
                {
                    ...previousResult,
                    eventsByLocation: [
                        ...previousResult.eventsByLocation,
                        ...fetchMoreResult.eventsByLocation,
                    ],
                }
            )
            break
    }
}
let initialQuery: listKindType = props.listKind
if (props.listKind === "all" && filterStore.orderBy === "none") {
    initialQuery = "location"
}
// setQueries(props.listKind === "saved" ? "saved" : filterStore.orderBy === "none" ? "location" : props.listKind)
setQueries(initialQuery)

const { loading, onResult, onError: onGetEventsError, error, fetchMore, refetch } = useQuery<any, GetEventsVars>(
    queryDocument,
    queryVars,
    {
        fetchPolicy: "cache-and-network"
    }
)
onResult((result) => {
    events.value = getEvents(result.data)
})

onGetEventsError(error => {
    console.error(" onGetEventsError:", error)
})
function refetchEvents() {
    refetch()
}

let filtersAdded = ref(false)
watchEffect(() => {
    if (
        searchText.value === "" &&
        sortByLocation.value &&
        (minPrice.value === undefined || minPrice.value === "") &&
        (maxPrice.value === undefined || maxPrice.value === "") &&
        (minDate.value === undefined || minDate.value.toString() === "") &&
        (maxDate.value === undefined || maxDate.value.toString() === "") &&
        selectedCities.value.length === 0
    ) {
        filtersAdded.value = false
    } else {
        filtersAdded.value = true
    }
})
function resetFilters() {
    searchText.value = ""
    sortByLocation.value = true
    minPrice.value = undefined
    maxPrice.value = undefined
    minDate.value = undefined
    maxDate.value = undefined
    selectedCities.value = []
}

function dropEvent(eventId: string) {
    if (props.listKind === "saved") {
        events.value = events.value.filter(event => event.id != eventId)
    }
}

// scrolling pagination
const scrollingList = ref<HTMLInputElement | null>(null)

function loadMore() {
    if (!loading.value) {
        fetchMore({
            variables: {
                offset: events.value.length,
                limit: paginationLimit
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult
                return updateQuery(previousResult, fetchMoreResult)
            }
        })
    }
}

let lastFetched = 0
let minTimeBeforeRefetch = 5 * 1000
function handleScroll() {
    const element = scrollingList.value
    if (element) {
        const scrollBottom = element.scrollHeight - element.clientHeight - element.scrollTop
        if (scrollBottom <= 100 && (Date.now() - lastFetched > minTimeBeforeRefetch)) {
            lastFetched = Date.now()
            loadMore()
        }
    }
}

onMounted(() => {
    initDropdowns()
})
</script>