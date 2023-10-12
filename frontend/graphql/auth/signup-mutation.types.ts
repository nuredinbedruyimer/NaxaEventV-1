export interface SignupMutationVars {
  name: string
  email: string
  password: string
}
export interface SignupMutationRes {
  signUp: {
    message: string
  }
}