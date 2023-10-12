import { DropFollowRes, DropFollowVars } from "~~/graphql/follows/follow.mutation.types"
import { dropFollowMutation } from "../graphql/follows"
export function dropFollow() {
    const { mutate, onDone, onError, loading } = useMutation<DropFollowRes, DropFollowVars>(
        dropFollowMutation,
        {
            fetchPolicy: "no-cache"
        }
    )
    return { mutate, loading, onDone, onError }
}