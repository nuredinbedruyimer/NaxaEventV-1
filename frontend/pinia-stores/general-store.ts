import { defineStore } from "pinia";
import { SiteNotification } from "@/types/general"
export const useGeneralStore = defineStore("generalStore", {
    state: () => ({
        theme: {
            dark: false
        },
        notification: {
            type: "",
            message: ""
        } as SiteNotification
    }),
    getters: {
        isDark(state) {
            return state.theme.dark
        },
        hasNotification(state) {
            return state.notification.message != ""
        }
    },
    actions: {
        toggleDarkMode() {
            this.theme.dark = !this.theme.dark
        },
        setNotification(notification: SiteNotification) {
            this.notification = notification
        },
        setErrorNotification(message: string) {
            this.setNotification(
                {
                    type: "error",
                    message
                }
            )
        },
        setSystemErrorNotification() {
            this.setNotification(
                {
                    type: "error",
                    message: "Something Went Wrong, please try again!"
                }
            )
        },
        setWarningNotification(message: string) {
            this.setNotification(
                {
                    type: "warning",
                    message
                }
            )
        },
        setSuccessNotification(message: string) {
            this.setNotification(
                {
                    type: "success",
                    message
                }
            )
        },
        clearNotification() {
            this.notification = {
                type: "",
                message: ""
            }
        }
    },
    persist: {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
    },
}
)