<template>
    <Head>
        <Title>Sign In | Event Space</Title>
    </Head>
    <div class="h-full overflow-auto">
        <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 class="font-logo tracking-wider font-bold text-3xl text-center">
                    Event <span class="text-primary">Space</span>
                </h1>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">Sign in to your account</h2>
                <p class="mt-2 text-center text-sm ">
                    Or <NuxtLink to="/signup" class="text-primary font-medium">Create a new one</NuxtLink>
                </p>
            </div>
            <div class="mt-8 mx-auto w-full max-w-md">
                <div class="py-12 px-4 border sm:rounded-lg sm:px-10">
                    <Form v-slot="{ handleSubmit, isSubmitting }" :validation-schema="schema">
                        <form @submit="handleSubmit($event, onSubmit)" class="space-y-6" novalidate>
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div class="mt-2">
                                    <Field id="email" name="email" type="email" autocomplete="email"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div class="error-message">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <!-- <label for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <Field id="password" name="password" type="password"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div class="error-message">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <span class="text-sm text-primary font-bold self-end mt-1 mr-1 cupo">Forgot Password?</span> -->
                                <Field v-slot="{ field, errors }" name="password">
                                    <input id="password" v-bind="field" name="password" autocomplete="off"
                                        :type="showPassword ? 'text' : 'password'"
                                        class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                                    <div v-if="errors[0]" class="error-message">{{ errors[0] }}</div>
                                </Field>
                                <div class="flex justify-between mt-2">
                                    <div class="flex gap-2 mt-2 ml-1 text-sm">
                                        <input id="showPasswordCheckbox" type="checkbox" v-model="showPassword"
                                            class="cupo [accent-color:#A500CE]" />
                                        <label for="showPasswordCheckbox" class="cupo">show password</label>
                                    </div>
                                    <span class="text-sm text-primary font-bold self-end mt-1 mr-1 cupo">Forgot
                                        Password?</span>
                                </div>
                            </div>

                            <div>
                                <button type="submit" :disabled="isSubmitting || isLoading"
                                    class="flex w-full justify-center disabled:bg-disabled rounded-md bg-primary text-on-primary py-3 px-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                    {{ isSubmitting || isLoading ? 'Signing in...' : 'Sign In' }}
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate"
import { string, object } from "yup"
import { signinMutation } from "@/graphql/auth"
import { SigninMutationRes, SigninMutationVars } from "@/graphql/auth/signin-mutation.types"
import { useGeneralStore, useUserStore } from "@/pinia-stores";
import { responses } from "@/graphql/commons"

const generalStore = useGeneralStore()
const router = useRouter()
const userStore = useUserStore()
if (userStore.isAuthorized) router.replace("/events")

const schema = object({
    email: string().required().email().label("Email"),
    password: string().required().min(6).label("Password"),
})
const showPassword = ref(false)
const passwordField = ref<HTMLInputElement | null>(null)

const { mutate, loading: isLoading, onError, onDone } = useMutation<SigninMutationRes, SigninMutationVars>(
    signinMutation,
    {
        clientId: "anonymous",
        fetchPolicy: "no-cache"
    }
)
onError((error) => {
    if (error.message === responses.notFound) {
        generalStore.setErrorNotification("Wrong email or password!")
    } else {
        console.error("signin onError", error)
        generalStore.setSystemErrorNotification()
    }
})
onDone((result) => {
    if (result.data?.signIn.message === responses.OK) {
        const accessToken = result.data.signIn.userLogIn?.accessToken
        const refreshToken = result.data.signIn.userLogIn?.refreshToken
        useUserLogin(accessToken!, refreshToken!)
        // router.replace("/events")
        router.go(-1)
    } else {
        console.error("signin onDone", result)
        generalStore.setSystemErrorNotification()
    }
})
function onSubmit(values: any) {
    generalStore.clearNotification()
    const variables: SigninMutationVars = {
        email: values.email,
        password: values.password
    }
    mutate(variables)
}
</script>