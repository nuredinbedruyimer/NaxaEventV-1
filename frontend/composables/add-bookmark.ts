import { AddBookmarkRes, AddBookmarkVars } from "~~/graphql/bookmarks/bookmark.mutation.types"
import { addBookmarkMutation } from "../graphql/bookmarks"
export function addBookmark() {
    const { mutate, onDone, onError, loading } = useMutation<AddBookmarkRes, AddBookmarkVars>(
        addBookmarkMutation,
        {
            fetchPolicy: "no-cache"
        }
    )
    return { mutate, loading, onDone, onError }
}