<template>
    <div class="z-50 bg-white border-2 space-y-4 border-gray-300 p-7 divide-gray-100 rounded-lg shadow max-w-[400px] lg:max-w-[650px] dark:bg-gray-700 dark:divide-gray-600 overflow-hidden"
        :class="{ 'pb-3': editable }">
        <div class="flex flex-col lg:flex-row gap-2 justify-around">
            <div class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <div class="w-24 h-24 text-5xl absolute">
                    <Avatar :url="user.avatarUrl ? createStaticServerLink(user.avatarUrl) : ''" :name="user.name"
                        id="avatar" :class="{ 'animate-pulse': uploadingAvatarUrl || deletingAvatarUrl }" />
                    <div v-if="editable"
                        class="flex justify-center items-end absolute w-full overflow-hidden h-full bottom-0 rounded-full">
                        <div data-dropdown-toggle="dropdown"
                            class="bg-gray-300 bg-opacity-90 w-full flex justify-center py-0.5 pl-0.5 bg-gradient-to-b cupo">
                            <Icon :icon="editOutline" class="text-xl text-primary" />
                        </div>
                    </div>
                </div>
                <div id="dropdown"
                    class="z-10 hidden overflow-hidden border bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatar">
                        <li>
                            <label for="avatar-selector"
                                class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cupo">
                                Upload Image</label>
                        </li>
                        <li v-if="user.avatarUrl">
                            <div @click="deleteAvatarUrl"
                                class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-500 cupo">
                                Delete</div>
                        </li>
                    </ul>
                </div>
                <input class="invisible" type="file" id="avatar-selector" accept="image/*" @change="uploadAvatar"
                    :disabled="uploadingAvatarUrl || deletingAvatarUrl" />
            </div>
            <div class="flex flex-col gap-2 pl-2 lg:pl-4">
                <div class="flex flex-col">
                    <form @submit.prevent="saveName">
                        <div v-show="editingName" class="w-full">
                            <div class="flex gap-2 border-b-2 mb-2">
                                <input type="text" ref="nameInputField" v-model="name" @focusout="resetName"
                                    class="outline-none w-full font-bold">
                                <Icon icon="ic:round-done" class="text-3xl text-primary cupo"
                                    :class="{ 'text-disabled': updatingName }" @click="saveName" />
                            </div>
                        </div>
                        <p v-if="!editingName" class="font-bold">
                            {{ user.name }}
                            <Icon v-if="editable" :icon="editOutline"
                                class="ml-2 text-xl text-primary mb-2 inline-flex cupo" @click="startNameEdit" />
                        </p>
                    </form>
                    <form @submit.prevent="saveDescription">
                        <div v-show="editingDescription">
                            <div class="flex flex-col">
                                <textarea ref="descriptionInputField" rows="5" v-model="description"
                                    @focusout="resetDescription"
                                    class="outline-none border-y-2 w-[340px] lg:w-[470px]"></textarea>
                            </div>
                            <Icon icon="ic:round-done" class="text-3xl text-primary cupo"
                                :class="{ 'text-disabled': updatingDescription }" @click="saveDescription" />
                        </div>
                        <div v-if="!editingDescription">
                            <p>
                                <span v-if="user.description">
                                    {{ user.description }}
                                </span>
                                <span v-else class="font-light">
                                    No description
                                </span>
                                <Icon v-if="editable && !editingDescription" :icon="editOutline"
                                    class="ml-2 text-xl text-primary mb-2 inline-flex cupo" @click="startDescriptionEdit" />
                            </p>
                        </div>
                    </form>
                </div>
                <div>
                    <b>Email: </b>
                    <a :href="`mailto:${user.email}`" class="text-primary font-bold">
                        {{ user.email }}
                    </a>
                </div>
            </div>
        </div>
        <div class="bg-gray-200 h-0.5 rounded-full"></div>
        <div class="grid grid-cols-2 pl-2 lg:pl-5">
            <div class="flex flex-col">
                <b>
                    {{ user.followersCount }}
                </b>
                <h2>
                    Followers
                </h2>
            </div>
            <div>
                <b>
                    {{ user.followingCount }}
                </b>
                <h2>
                    Following
                </h2>
            </div>
        </div>
        <div class="bg-gray-200 h-0.5 rounded-full"></div>
        <div v-if="editable">
            <div @click="useUserSignOut" class="cupo text-center lg:pr-14 font-bold text-primary">
                Log Out
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '~~/types/entities';
import { UpdateUserMutationVars, UpdateUserMutationRes } from "~~/graphql/user/update-user.mutation.types"
import { updateUserMutation } from "~~/graphql/user"
import { useGeneralStore } from '~~/pinia-stores';
import { initDropdowns } from 'flowbite';
import { fileToBase64, getFileExtension, createStaticServerLink } from '~~/commons/functions';
import { UploadFileMutationRes, UploadFileMutationVars } from '~~/graphql/files/upload-file.mutation.types';
import { uploadFileMutation } from '~~/graphql/files';
import { Icon } from '@iconify/vue';
import editOutline from '@iconify-icons/material-symbols/edit-outline';

const generalStore = useGeneralStore()
const props = withDefaults(defineProps<
    {
        user: User,
        editable?: boolean
    }
>(),
    {
        editable: true
    }
)

// editing name
const nameInputField = ref<HTMLInputElement | null>(null)
const name = ref(props.user.name)
const editingName = ref(false)
const updatingName = ref(false)
function startNameEdit() {
    editingName.value = true
    setTimeout(() => {
        nameInputField.value?.focus()
        const temp = nameInputField.value!.value
        nameInputField.value!.value = ""
        nameInputField.value!.value = temp
    }, 0)
}
function resetName() {
    setTimeout(() => {
        if (!updatingName.value) {
            name.value = props.user.name
            editingName.value = false
        }
    }, 500)
}
function finishUpdatingName() {
    editingName.value = false
    updatingName.value = false
}
function saveName() {
    if (updatingName.value) return
    const newName = name.value.trim();
    if (newName !== "" && newName !== props.user.name) {
        updatingName.value = true
        const oldName = props.user.name
        props.user.name = newName
        finishUpdatingName()
        const { mutate: updateName, onDone: onUpdateNameDone, onError: onUpdateNameError } = useMutation<UpdateUserMutationRes, UpdateUserMutationVars>(
            updateUserMutation,
            {
                variables: {
                    id: props.user.id,
                    name: newName,
                    description: props.user.description,
                    avatarUrl: props.user.avatarUrl,
                },
                fetchPolicy: "network-only"
            }
        )
        updateName()
        onUpdateNameDone(result => {
            const updatedName = result.data?.updateUsersByPk.name
            if (updatedName) {
                props.user.name = updatedName
                finishUpdatingName()
            } else {
                name.value = oldName
                finishUpdatingName()
                generalStore.setSystemErrorNotification()
                console.error("onUpdateNameDone:", result)
            }
        })
        onUpdateNameError(error => {
            name.value = oldName
            finishUpdatingName()
            generalStore.setSystemErrorNotification()
            console.error("onUpdateNameError:", error)
        })
    } else {
        name.value = props.user.name
        editingName.value = false
    }
}


// editing description
const descriptionInputField = ref<HTMLInputElement | null>(null)
const description = ref(props.user.description)
const editingDescription = ref(false)
const updatingDescription = ref(false)
function startDescriptionEdit() {
    editingDescription.value = true
    setTimeout(() => {
        descriptionInputField.value?.focus()
        const temp = descriptionInputField.value!.value
        descriptionInputField.value!.value = ""
        descriptionInputField.value!.value = temp
    }, 0)
}
function resetDescription() {
    setTimeout(() => {
        if (!updatingDescription.value) {
            description.value = props.user.description
            editingDescription.value = false
        }
    }, 500)
}

function finishUpdatingDescription() {
    editingDescription.value = false
    updatingDescription.value = false
}
function saveDescription() {
    if (updatingDescription.value) return
    const newDescription = description.value.trim();
    if (newDescription !== props.user.description) {
        updatingDescription.value = true
        const oldDescription = props.user.description
        props.user.description = newDescription
        finishUpdatingDescription()
        const { mutate: updateDescription, onDone: onUpdateDescriptionDone, onError: onUpdateDescriptionError } = useMutation<UpdateUserMutationRes, UpdateUserMutationVars>(
            updateUserMutation,
            {
                variables: {
                    id: props.user.id,
                    description: newDescription,
                    name: props.user.name,
                    avatarUrl: props.user.avatarUrl,
                },
                fetchPolicy: "network-only"
            }
        )
        updateDescription()
        onUpdateDescriptionDone(result => {
            const updatedDescription = result.data?.updateUsersByPk.description
            if (typeof updatedDescription === "string") {
                props.user.description = updatedDescription
                finishUpdatingDescription()
            } else {
                description.value = oldDescription
                finishUpdatingDescription()
                generalStore.setSystemErrorNotification()
                console.error("onUpdateDescriptionDone:", result)
            }
        })
        onUpdateDescriptionError(error => {
            description.value = oldDescription
            finishUpdatingDescription()
            generalStore.setSystemErrorNotification()
            console.error("onUpdateDescriptionError:", error)
        })
    } else {
        description.value = props.user.description
        editingDescription.value = false
    }
}

// avatar image
const uploadingAvatarUrl = ref(false)
const deletingAvatarUrl = ref(false)

// Avatar Upload
function finishUploadingAvatar() {
    uploadingAvatarUrl.value = false
}
async function uploadAvatar(event: Event) {
    // @ts-ignore
    if (uploadingAvatarUrl.value || deletingAvatarUrl.value || !event.target?.files[0]) return
    uploadingAvatarUrl.value = true
    // @ts-ignore
    const uploadedImage: File = event.target?.files[0]
    const b64 = await fileToBase64(uploadedImage)
    const fileExtension = getFileExtension(uploadedImage.name)
    const { mutate: uploadFile, onDone: onUploadFileDone, onError: onUploadFileError } = useMutation<UploadFileMutationRes, UploadFileMutationVars>(
        uploadFileMutation,
        {
            variables: {
                base64Str: b64.toString().replace('data:', '').replace(/^.+,/, ''),
                fileName: props.user.id + fileExtension,
                category: "avatar-image",
                extension: fileExtension
            },
            fetchPolicy: "no-cache"
        }
    )
    uploadFile()
    onUploadFileDone(result => {
        const filePath = result.data?.uploadFile.filePath
        if (typeof filePath !== "string") {
            console.error("onUploadFileDone:", result)
        } else {
            const { mutate: updateAvatarUrl, onDone: onUpdateAvatarUrlDone, onError: onUpdateAvatarUrlError } = useMutation<UpdateUserMutationRes, UpdateUserMutationVars>(
                updateUserMutation,
                {
                    variables: {
                        id: props.user.id,
                        description: props.user.description,
                        name: props.user.name,
                        avatarUrl: filePath,
                    },
                    fetchPolicy: "network-only"
                }
            )
            updateAvatarUrl()
            onUpdateAvatarUrlDone(result => {
                const updatedAvatarUrl = result.data?.updateUsersByPk.avatarUrl
                if (typeof updatedAvatarUrl === "string") {
                    props.user.avatarUrl = updatedAvatarUrl + `?${Date.now()}`
                    finishUploadingAvatar()
                } else {
                    finishUploadingAvatar()
                    console.error("onUpdateAvatarUrlDone:", result)
                }
            })
            onUpdateAvatarUrlError(error => {
                finishUploadingAvatar()
                generalStore.setSystemErrorNotification()
                console.error("onUpdateAvatarUrlError:", error)
            })
        }
    })
    onUploadFileError(error => {
        finishUploadingAvatar()
        generalStore.setSystemErrorNotification()
        console.error("onUploadFileError:", error)
    })
}

// delete avatar
function finishDeletingAvatarImage() {
    deletingAvatarUrl.value = false
}
function deleteAvatarUrl() {
    if (uploadingAvatarUrl.value || deletingAvatarUrl.value) return
    deletingAvatarUrl.value = true
    const { mutate: deleteAvatarUrl, onDone: onDeleteAvatarUrlDone, onError: onDeleteAvatarUrlError } = useMutation<UpdateUserMutationRes, UpdateUserMutationVars>(
        updateUserMutation,
        {
            variables: {
                id: props.user.id,
                description: props.user.description,
                name: props.user.name,
                avatarUrl: "",
            },
            fetchPolicy: "network-only"
        }
    )
    deleteAvatarUrl()
    onDeleteAvatarUrlDone(result => {
        const deletedAvatarUrl = result.data?.updateUsersByPk.avatarUrl
        if (deletedAvatarUrl === "") {
            props.user.avatarUrl = deletedAvatarUrl
            finishDeletingAvatarImage()
        } else {
            finishDeletingAvatarImage()
            console.error("onDeleteAvatarUrlDone:", result)
        }
    })
    onDeleteAvatarUrlError(error => {
        finishDeletingAvatarImage()
        generalStore.setSystemErrorNotification()
        console.error("onDeleteAvatarUrlError:", error)
    })
}

onMounted(() => {
    initDropdowns()
})

</script>