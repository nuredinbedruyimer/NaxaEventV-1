import { EventPreview } from "../events/event-preview.type"
import { Ticket } from "./ticket.type"

export type MyTicketsRes = {
    me: {
        tickets: Array<Ticket>
    }
}

