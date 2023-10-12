export interface SignupVerificationMutationVars {
  verificationToken: string
}

export interface SignupVerificationMutationRes {
  verifySignUp: {
    message: string
    userLogIn?: {
      accessToken: string
      refreshToken: string
    }
  }
}