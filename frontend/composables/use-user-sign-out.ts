import { signOutMutation } from "@/graphql/auth"
import { useUserStore } from "@/pinia-stores"
import { SignOutMutationRes, SignOutMutationVars } from "~~/graphql/auth/sign-out-mutation.types"

const userStore = useUserStore()

export function useUserSignOut() {
    const { onLogout } = useApollo()
    const router = useRouter()
    onLogout()
    const { mutate, onError, onDone } = useMutation<SignOutMutationRes, SignOutMutationVars>(
        signOutMutation,
        {
            clientId:"anonymous",
            fetchPolicy: "no-cache"
        }
    )
    mutate(
        {
            refreshToken: userStore.refreshToken
        }
    )
    onDone(() => {
        userStore.$reset()
        router.replace("/")
    })
    onError(error => {
        console.error("useUserSignOut onError", error)
        userStore.$reset()
    })
}