import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        id: "",
        email: "",
        name: "",
        description: "",
        avatarUrl: "",
        memberSince: "",
        refreshToken: "",
        followersCount: 0,
        followingCount: 0
    }),
    getters: {
        isAuthorized(state) {
            return state.id !== ""
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
    },
})