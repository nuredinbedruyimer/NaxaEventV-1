import { RefreshTokenMutationRes, RefreshTokenMutationVars } from "@/graphql/auth/refresh-token-mutation.types"
import { refreshTokenMutation } from "@/graphql/auth"
import { useUserStore } from "@/pinia-stores"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('apollo:error', (error) => {
        console.error("apollo:error'")
        if (error.response?.errors?.[0].message === "Could not verify JWT: JWTExpired") {
            const { onLogin, onLogout } = useApollo()
            const userStore = useUserStore()
            const { mutate, onError, onDone } = useMutation<RefreshTokenMutationRes, RefreshTokenMutationVars>(
                refreshTokenMutation,
                {
                    clientId:"anonymous",
                    fetchPolicy: "no-cache"
                })
            mutate(
                {
                    refreshToken: userStore.refreshToken
                }
            )
            onDone(result => {
                onLogin(result.data?.refresh.userLogIn?.accessToken)
            })
            onError(error => {
                console.error("useUserLogin onError", error)
                onLogout()
                userStore.$reset()
            })
        }
    })
})