export type AddBookmarkVars = {
    eventId: string
}

export type DropBookmarkVars = {
    id: string
}

export type AddBookmarkRes = {
    insertBookmarksOne: { id: string }
}

export type DropBookmarkRes = {
    deleteBookmarksByPk: { id: string }
}