import { meQuery } from "@/graphql/user"
import { meQueryResponse } from "@/graphql/user/me-query.types"
import { useUserStore } from "@/pinia-stores"

const userStore = useUserStore()

export function useUserLogin(accessToken: string, refreshToken: string) {
    const { onLogin, onLogout } = useApollo()
    onLogin(accessToken)
    const { onResult, onError } = useQuery<meQueryResponse>(meQuery, null, {
        fetchPolicy: "cache-and-network"
    })
    onResult(result => {
        userStore.$state = { ...result.data.me, refreshToken }
    })
    onError(error => {
        console.error("useUserLogin onError", error)
        onLogout()
        userStore.$reset()
    })
}