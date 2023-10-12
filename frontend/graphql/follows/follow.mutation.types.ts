export type AddFollowVars = {
    followedId: string
}

export type DropFollowVars = {
    id: string
}

export type AddFollowRes = {
    insertFollowsOne: { id: string }
}

export type DropFollowRes = {
    deleteFollowsByPk: { id: string }
}