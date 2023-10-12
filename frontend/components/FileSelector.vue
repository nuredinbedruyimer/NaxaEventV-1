<template>
    <div>

        <button type="button"
            class="h-12 w-full rounded-md bg-surface text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <label class="block py-2.5 px-3.5 cupo" for="fileSelector">Upload Images</label>
        </button>
        <input class="hidden h-0" type="file" id="fileSelector" :accept="accept" :multiple="multiple"
            @change="handleSelection">
    </div>
</template>

<script setup lang="ts">
import { fileToBase64, getFileExtension } from '~~/commons/functions';
import { SelectedImage } from './types';

const props = withDefaults(
    defineProps<{
        fieldName?: string
        accept?: string
        multiple?: boolean
        selectedFiles: globalThis.Ref<Array<SelectedImage>>
    }>(),
    {
        fieldName: "fileSelector",
        accept: "*/*",
        multiple: true,
    })
let idCounter = 100000
async function handleSelection(event: Event) {
    // @ts-ignore
    const fileList: FileList = event.target?.files
    // props.selectedFiles.value = []
    const wasEmpty = props.selectedFiles.value.length === 0
    for (let i = 0; i < fileList.length; i++) {
        const b64 = await fileToBase64(fileList[i])
        props.selectedFiles.value.push(
            {
                content: b64,
                id: idCounter++,
                isThumbnail: i === 0 && wasEmpty,
                extension: getFileExtension(fileList[i].name),
                isB64: true
            }
        )
    }
}
</script>