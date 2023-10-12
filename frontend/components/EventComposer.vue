<template>
    <div class="flex justify-center py-16">
        <Form v-slot="{ handleSubmit }" :validation-schema="schema" :initial-values="initialValues"
            class="w-full max-w-[640px] px-7">
            <h3 class="text-start w-full font-bold text-2xl mb-4">{{ title }}</h3>
            <form @submit.prevent="handleSubmit($event, onSubmit)" class="flex flex-col gap-5 max-full" novalidate>
                <div>
                    <label for="title" class="field-label">Title</label>
                    <div class="mt-2">
                        <Field type="text" name="title" autocomplete="title" class="text-field" />
                        <div class="error-message">
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="description" class="field-label">Description</label>
                    <div class="mt-2">
                        <Field v-slot="{ field, errors }" name="description">
                            <textarea v-bind="field" name="description" rows="4"
                                class="block w-full rounded-md border-0 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-gray-400 focus:ring-2 outline-none sm:py-1.5 px-1.5 sm:text-sm sm:leading-6" />
                            <div v-if="errors[0]" class="error-message">{{ errors[0] }}</div>
                        </Field>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">Write a few sentences about the event.</p>
                    <div class="error-message"></div>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="tags" class="field-label">
                        Tags <span class="text-sm">(put space between each tag)</span>
                    </label>
                    <div class="flex gap-3">
                        <div v-for="tag, index in tags" :key="tag + index" id="toast-default"
                            class="flex items-center w-fit p-2  rounded-lg border">
                            <div class="ml-3 text-sm font-normal">{{ tag }}</div>
                            <button type="button" @click="dropTag(index)"
                                class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800">
                                <span class="sr-only">drop</span>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <input type="text" name="tags" autocomplete="tags" v-model="tag" @input="addTag" @focusout="addTag"
                        class="text-field" />
                    <div class="error-message"></div>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="images" class="field-label">Images (Star an image to set it as
                        thumbnail)</label>
                    <div class="grid grid-cols-3 gap-6">
                        <EventImagePreview v-for="image, index in selectedImages" :imagesArray="selectedImages"
                            :index="index" :key="image.id" />
                    </div>
                    <div>
                        <FileSelector fieldName="images" accept="image/*" :selectedFiles="getSelectedImagesRef()" />
                    </div>
                    <div class="error-message">
                        <div v-if="imageError">{{ imageError }}</div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="date" class="field-label">
                        Date
                    </label>
                    <Field id="date" name="date" type="datetime-local" class="text-field" />
                    <div class="error-message">
                        <ErrorMessage name="date" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="city" class="field-label">
                        City
                    </label>
                    <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom"
                        class="h-12 bg-surface text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline-none font-bold rounded-lg text-sm px-4 py-2.5 text-center inline-flex justify-center items-center"
                        type="button">{{ selectedCityName ?? 'Select city' }}<svg class="w-4 h-4 ml-2" aria-hidden="true"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="dropdownSearch"
                        class="z-10 hidden bg-white rounded-lg border-2 w-[90%] max-w-[600px] md:max-w-[450px] 2lg:max-w-[600px] dark:bg-gray-700">
                        <div class="p-3">
                            <label for="input-group-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="text" id="input-group-search" v-model="citySearchText"
                                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 outline-none rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                    placeholder="Search city">
                            </div>
                        </div>
                        <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownSearchButton">
                            <li v-for="(city, index) in getCitiesResult?.cities"
                                v-show="!citySearchText || searchedCities[index]" :key="city.id">
                                <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input :id="city.id" type="radio" :value="city.id" v-model="selectedCity" name="city"
                                        class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded ">
                                    <label :for="city.id" data-dropdown-toggle="dropdownSearch" type="button"
                                        class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{{
                                            city.name }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="error-message"></div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="text-sm font-medium leading-6">
                        Map Coordinates
                    </div>
                    <div class="flex gap-4">
                        <div class="flex flex-col gap-2 text-sm max-w-[50%]">
                            <label for="latitude">
                                Latitude
                            </label>
                            <Field name="latitude" type="number" step="any" class="text-field" />
                            <div class="error-message">
                                <ErrorMessage name="latitude" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 text-sm max-w-[50%]">
                            <label for="longitude">
                                Longitude
                            </label>
                            <Field name="longitude" type="number" step="any" class="text-field" />
                            <div class="error-message">
                                <ErrorMessage name="longitude" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="specificAddress" class="field-label">
                        Specific Location
                    </label>
                    <Field name="specificAddress" class="text-field" />
                    <div class="error-message">
                        <ErrorMessage name="specificAddress" />
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="title">
                        Price
                    </label>
                    <Field name="price" type="number" class="text-field" />
                    <div class="error-message">
                        <ErrorMessage name="price" />
                    </div>
                </div>
                <button :disabled="isSubmitting"
                    class="btn h-12 bg-primary disabled:bg-disabled disabled:border-disabled text-on-primary font-medium">{{
                        isSubmitting ? 'Publishing...' : 'Publish' }}</button>
            </form>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { SelectedImage, ComposedEvent } from './types';
import { Form, Field, ErrorMessage } from "vee-validate"
import { string, object, number, date } from "yup"
import { initDropdowns } from "flowbite"
import { Event } from '~~/graphql/events/event.type';
import { getRandomString } from '~~/commons/functions';
import { UseMutationReturn } from '@vue/apollo-composable';
import { DocumentNode, FetchResult } from '@apollo/client';
import { useGeneralStore } from '~~/pinia-stores';

const generalStore = useGeneralStore()
const props = defineProps<
    {
        oldEvent?: Event
        submitter: (composedEvent: ComposedEvent) => UseMutationReturn<any, any>
        getId: (result: FetchResult) => string,
        title: string
    }
>()

// schema
const schema = object({
    title: string().required("Title is required").label("Title"),
    description: string().transform((value) => (typeof value === "string" ? value : "")).label("Description"),
    date: date().typeError("Date is required").required("Date is required").min(new Date(), "Date can't be set to past").label("Date"),
    latitude: number().transform((value) => (isNaN(value) ? 0 : value)).min(-90).max(90),
    longitude: number().transform((value) => (isNaN(value) ? 0 : value)).min(-180).max(180),
    specificAddress: string().transform((value) => (typeof value === "string" ? value : "")).label("Specific Location"),
    price: number().default(0).transform((value) => (isNaN(value) ? 0 : value)).min(0).label("Price"),
})

const oldEvent = props.oldEvent
// initial values
const tempInitialValues: ComposedEvent = {}
if (props.oldEvent) {
    tempInitialValues.title = oldEvent?.title
    tempInitialValues.description = oldEvent?.description
    tempInitialValues.date = oldEvent?.date.toString().substring(0, 16)
    tempInitialValues.latitude = oldEvent?.location[0]
    tempInitialValues.longitude = oldEvent?.location[1]
    tempInitialValues.specificAddress = oldEvent?.specificAddress
    tempInitialValues.price = oldEvent?.price
}
const initialValues = ref(
    tempInitialValues
)

// Cities
const { result: getCitiesResult, onError: onGetCitiesError } = getCities()
onGetCitiesError(error => {
    console.error("onGetCitiesError:", error)
})

const selectedCity = ref<string | undefined>(oldEvent?.city?.id ?? undefined)
const selectedCityName = ref<string | undefined>(oldEvent?.city?.name ?? undefined)
watch(selectedCity, () => {
    selectedCityName.value = getCitiesResult.value?.cities.find(city => city.id === selectedCity.value)?.name
})

const citySearchText = ref("")
const searchedCities = ref<Boolean[]>([])
watch(citySearchText, () => {
    if (getCitiesResult.value) {
        searchedCities.value = getCitiesResult.value?.cities.map(
            city => city.name.toLowerCase().includes(citySearchText.value.toLocaleLowerCase()
            )
        )
    }
})

// images
const imageError = ref("")
const convertedOldImages: SelectedImage[] = (props.oldEvent?.images ?? []).map(
    (image, index) => (
        {
            content: image,
            id: -1 * (index + 1),
            isThumbnail: index === 0,
            isB64: false
        }
    )
)
const selectedImages = ref<SelectedImage[]>([...convertedOldImages])
function getSelectedImagesRef(): globalThis.Ref<SelectedImage[]> {
    return selectedImages
}
watch(selectedImages, () => {
    if (selectedImages.value.length === 0) {
        imageError.value = "At least one image is required"
    } else {
        imageError.value = ""
    }
},
    { deep: true }
)
// tags
const tagDelimiter = " "
const tag = ref<string>("")
const tags = ref<string[]>(oldEvent?.tags ? [...oldEvent?.tags] : [])
// @ts-ignore
function addTag(event) {
    if (tag.value.includes(tagDelimiter) || event.type === "focusout") {
        tags.value = tags.value.concat(tag.value.split(tagDelimiter).filter(t => t !== "" && !tags.value.includes(t)))
        tag.value = ""
    }
}
function dropTag(index: number) {
    tags.value.splice(index, 1)
}

const isSubmitting = ref(false);

function onSubmit(composedEvent: ComposedEvent) {
    if (selectedImages.value.length === 0) {
        imageError.value = "At least one image is required"
        return
    }
    isSubmitting.value = true
    // modifications
    composedEvent.price = composedEvent.price ?? 0

    // upload images
    const selectedImagesLength = selectedImages.value.length
    let images: string[] = []
    for (let i = 0; i < selectedImagesLength; i++) {
        const thisImage = selectedImages.value[i]
        if (thisImage.isB64) break
        else images.push(thisImage.content as string)
    }
    if (selectedImagesLength > images.length) {
        const fileUploadMutationText = `mutation FileUploadMutation {${createMutationsFromImages(selectedImages.value)}}`
        const fileUploadMutationDoc: DocumentNode = gql(fileUploadMutationText)
        const { mutate: uploadImages, onDone: onUploadImagesDone, onError: onUploadImagesError, loading: uploading } = useMutation(
            fileUploadMutationDoc,
            {
                fetchPolicy: "no-cache"
            }
        )
        uploadImages()

        // save event
        onUploadImagesDone((result) => {
            images = images.concat(Object.values(result.data).map((image: any) => image.filePath))
            for (let i = 0; i < selectedImagesLength; i++) {
                const thisImage = selectedImages.value[i]
                if (thisImage.isThumbnail) {
                    images.unshift(images.splice(i, 1)[0])
                }
            }
            saveEvent(composedEvent, images)
        })
        onUploadImagesError(error => {
            console.error("uploadingEventImagesOnError:", error)
            generalStore.setSystemErrorNotification()
            isSubmitting.value = false
        })
    } else {
        for (let i = 0; i < selectedImagesLength; i++) {
            const thisImage = selectedImages.value[i]
            if (thisImage.isThumbnail) {
                images.unshift(images.splice(i, 1)[0])
            }
        }
        saveEvent(composedEvent, images)
    }
}

function saveEvent(composedEvent: ComposedEvent, images: string[]) {
    const { mutate, onDone, onError, loading } = props.submitter(
        {
            ...composedEvent,
            tags: tags.value,
            cityId: selectedCity.value,
            images
        }
    )
    mutate()
    onDone(result => {
        const id = props.getId(result)
        if (id) {
            useRouter().replace(`/events/${id}`)
        } else {
            console.error("savingEventOnDone:", result)
            generalStore.setSystemErrorNotification()
            isSubmitting.value = false

        }
    })
    onError(error => {
        console.error("savingEventOnError:", error)
        generalStore.setSystemErrorNotification()
        isSubmitting.value = false
    })
}

function createMutationsFromImages(images: SelectedImage[]): string {
    return images.reduce(
        (mutationText, image) => {
            const newMutationText = !image.isB64 ? "" : `M${getRandomString()}:uploadFile(
                arg:{
                    base64Str:"${image.content.toString().replace('data:', '').replace(/^.+,/, '')}",
                    category:"event-image",
                    extension:"${image.extension}",
                    fileName:"${getRandomString() + Date.now()}${image.extension}"
                }
                ){
                    filePath
                }\n`
            return mutationText + newMutationText
        }
        , ""
    )
}

onMounted(() => {
    initDropdowns()
})
</script>