export type UpdateUserMutationVars = {
    id: string
    avatarUrl?: string
    name?: string
    description?: string
}

export type UpdateUserMutationRes = {
    updateUsersByPk: {
        avatarUrl: string
        name: string
        description: string
    }
}