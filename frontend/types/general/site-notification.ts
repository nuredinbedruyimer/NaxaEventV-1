export default interface SiteNotification {
    type: "error" | "warning" | "success" | ""
    message: string
}