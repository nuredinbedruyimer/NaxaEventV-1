<template>
    <div class="rounded-lg border overflow-hidden">
        <img class="h-[150px] w-full object-cover" :src="imgSrc">
        <div class="p-3 flex justify-between items-center cupo border-t">
                <span @click="toggleThumbnail" class="text-2xl" :class="{ 'text-primary': image.isThumbnail }">
                    <Icon icon="material-symbols:star-rounded" />
                </span>
            <span @click="deleteImage" class="text-red-600 text-xl cupo">
                <Icon icon="ph:trash-simple" />
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { SelectedImage } from './types';
import { staticServerBaseUrl } from "~~/commons/variables"
const props = defineProps<{
    imagesArray: Array<SelectedImage>,
    index: number
}>()
const image = props.imagesArray[props.index]
const imgSrc = (image.isB64 ? "" : staticServerBaseUrl) + image.content
function deleteImage() {
    props.imagesArray.splice(props.index, 1)
    if (image.isThumbnail && props.imagesArray.length > 0) {
        props.imagesArray[0].isThumbnail = true
    }
}
function toggleThumbnail() {
    props.imagesArray.forEach((image, index) => {
        image.isThumbnail = index === props.index ? true : false
    })
}
</script>