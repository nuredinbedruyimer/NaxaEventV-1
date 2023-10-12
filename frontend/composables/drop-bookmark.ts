import { DropBookmarkRes, DropBookmarkVars } from "~~/graphql/bookmarks/bookmark.mutation.types"
import { dropBookmarkMutation } from "../graphql/bookmarks"
export function dropBookmark() {
    const { mutate, onDone, onError, loading } = useMutation<DropBookmarkRes, DropBookmarkVars>(
        dropBookmarkMutation,
        {
            fetchPolicy: "no-cache"
        }
    )
    return { mutate, loading, onDone, onError }
}