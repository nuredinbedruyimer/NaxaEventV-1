<template>
    <Head>
        <Title>Email verification | Event Space</Title>
    </Head>
    <div class="h-full w-full flex justify-center items-center">
        <div v-if="loading">
            <Loading message="Verifying your email..." />
        </div>
        <div v-else-if="errorMessage" class="text-center flex flex-col gap-5 items-center">
            <h4 class="text-4xl text-error">
                {{ errorMessage }}
            </h4>
            <NuxtLink to="/" class="text-primary flex items-center gap-3 text-xl">
                <Icon icon="gg:arrow-left" />
                <span>Home</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SignupVerificationMutationVars, SignupVerificationMutationRes } from "~~/graphql/auth/signup-verification-mutation.types"
import { signupVerificationMutation } from "@/graphql/auth"
import { responses } from "@/graphql/commons"
import { Icon } from '@iconify/vue';

const route = useRoute()
const router = useRouter()

let errorMessage = ""

const { mutate, loading, error, onError, onDone } = useMutation<SignupVerificationMutationRes, SignupVerificationMutationVars>(
    signupVerificationMutation,
    {
        clientId: "anonymous",
        fetchPolicy: "no-cache"
    }
)

onError(error => {
    const message = error.message;
    if (message === responses.invalidToken) {
        errorMessage = "Invalid token!"
    } else if (message == responses.emailAlreadyExist) {
        errorMessage = "Sorry, Email already exist!"

    } else {
        errorMessage = "system error"
        console.error("signup verification onError", error)
    }
})

onDone(result => {
    if (result.data?.verifySignUp.message === responses.OK) {
        const accessToken = result.data.verifySignUp.userLogIn?.accessToken
        const refreshToken = result.data.verifySignUp.userLogIn?.refreshToken
        useUserLogin(accessToken!, refreshToken!)
        router.replace("/events")
    } else {
        errorMessage = "system error"
        console.error("signup verification onDone", result)
    }
})
onMounted(() => {
    mutate({ verificationToken: route.params.token as string })
})
</script>