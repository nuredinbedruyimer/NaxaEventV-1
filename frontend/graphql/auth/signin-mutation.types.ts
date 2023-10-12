export interface SigninMutationVars {
  email: string
  password: string
}
export interface SigninMutationRes {
  signIn: {
    message: string
    userLogIn?: {
      accessToken: string
      refreshToken: string
    }
  }
}