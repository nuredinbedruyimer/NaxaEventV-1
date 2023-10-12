import { AddFollowRes, AddFollowVars } from "~~/graphql/follows/follow.mutation.types"
import { addFollowMutation } from "../graphql/follows"
export function addFollow() {
    const { mutate, onDone, onError, loading } = useMutation<AddFollowRes, AddFollowVars>(
        addFollowMutation,
        {
            fetchPolicy: "no-cache"
        }
    )
    return { mutate, loading, onDone, onError }
}