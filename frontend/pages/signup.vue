<template>
    <Head>
        <Title>Sign Up | Event Space</Title>
    </Head>
    <div class="min-h-full h-full overflow-auto flex flex-col justify-between">
        <div v-if="!verificationSent" class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 class="font-logo tracking-wider font-bold text-3xl text-center">
                    Event <span class="text-primary">Space</span>
                </h1>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">Create a new account</h2>
                <p class="mt-2 text-center text-sm ">
                    Or <NuxtLink to="/signin" class="text-primary font-medium">Sign in</NuxtLink>
                </p>
            </div>
            <div class="mt-8 mx-auto w-full max-w-md">
                <div class="py-12 px-4 border sm:rounded-lg sm:px-10">
                    <Form v-slot="{ handleSubmit, isSubmitting }" :validation-schema="schema">
                        <form @submit="handleSubmit($event, onSubmit)" class="space-y-6" novalidate>
                            <div>
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div class="mt-2">
                                    <Field id="name" name="name" type="name" autocomplete="name"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div class="error-message">
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div class="mt-2">
                                    <Field id="email" name="email" type="email" aria-autocomplete="off"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div class="error-message">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <!-- <Field id="password" name="password" ref="passwordField" type="password"
                                        aria-autocomplete="off"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div class="error-message">
                                        <ErrorMessage name="password" />
                                    </div> -->
                                    <Field v-slot="{ field, errors }" name="password">
                                        <input id="password" v-bind="field" name="password" autocomplete="off"
                                            :type="showPassword ? 'text' : 'password'"
                                            class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                        <div v-if="errors[0]" class="error-message">{{ errors[0] }}</div>
                                    </Field>
                                    <div class="flex gap-2 mt-2 ml-1 text-sm">
                                        <input id="showPasswordCheckbox" type="checkbox" v-model="showPassword"
                                            class="cupo [accent-color:#A500CE]" />
                                        <label for="showPasswordCheckbox" class="cupo">show password</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" :disabled="isSubmitting || isLoading"
                                    class="flex w-full justify-center disabled:bg-disabled disabled:text-gray-600 rounded-md bg-primary text-on-primary py-3 px-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    {{ isSubmitting || isLoading ? 'Signing up...' : 'Sign Up' }}
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col items-center pt-20">
            <div class="w-fit flex flex-col items-center border-2 rounded-lg border-gray-300 shadow-md py-10 px-7 gap-2">
                <h3 class="font-bold text-2xl text-primary">
                    SUCCESS!
                </h3>
                <p>
                    We have sent a verification link to your email!
                </p>
                <p class="text-primary font-medium">{{ email }}</p>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate"
import { string, object } from "yup"
import { signupMutation } from "@/graphql/auth"
import { SignupMutationRes, SignupMutationVars } from "@/graphql/auth/signup-mutation.types"
import { useGeneralStore, useUserStore } from "@/pinia-stores";
import { responses } from "@/graphql/commons"

const router = useRouter()
const generalStore = useGeneralStore()
const verificationSent = ref<boolean>(false)
const userStore = useUserStore()
if (userStore.isAuthorized) router.replace("/events")

const email = ref<string>("")
const schema = object({
    name: string().required().label("Name"),
    email: string().required().email().label("Email"),
    password: string().required().min(6).label("Password"),
})
const showPassword = ref(false)
const passwordField = ref<HTMLInputElement | null>(null)
// watch(showPassword, () => {
//     if (passwordField.value) {
//         passwordField.value.type = showPassword.value ? "text" : "password"
//     }
// })

const { mutate, loading: isLoading, onError, onDone } = useMutation<SignupMutationRes, SignupMutationVars>(
    signupMutation,
    {
        clientId: "anonymous",
        fetchPolicy: "no-cache"
    }
)
onError((error) => {
    if (error.message === responses.emailAlreadyExist) {
        generalStore.setErrorNotification("Email already exist, Please use another email or Sing in.")
    } else {
        console.error("signup onError", error)
        generalStore.setSystemErrorNotification()
    }
})
onDone((result) => {
    if (result.data?.signUp.message === responses.OK) {
        verificationSent.value = true
        // generalStore.setSuccessNotification("SUCCESS! We have sent a verification link to your email!")
    } else {
        console.error("signup onDone", result)
        generalStore.setSystemErrorNotification()
    }
})
function onSubmit(values: any) {
    email.value = values.email
    generalStore.clearNotification()
    const variables: SignupMutationVars = {
        name: values.name,
        email: values.email,
        password: values.password
    }
    mutate(variables)
}
</script>