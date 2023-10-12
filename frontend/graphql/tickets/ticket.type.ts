import { EventPreview } from "../events/event-preview.type"

export type Ticket = {
    event: EventPreview
    id: string
    createdAt: string
    isValid: boolean
}