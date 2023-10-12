export interface RefreshTokenMutationVars {
    refreshToken: string
}

export interface RefreshTokenMutationRes {
    refresh: {
        message: string
        userLogIn?: {
            accessToken: string
        }
    }
}