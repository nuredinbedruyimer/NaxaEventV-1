import { AddTicketRes, AddTicketVars } from "~~/graphql/tickets/ticket.mutation.types"
import { addTicketMutation } from "../graphql/tickets"
export function addTicket() {
    const { mutate, onDone, onError, loading, error } = useMutation<AddTicketRes, AddTicketVars>(
        addTicketMutation,
        {
            fetchPolicy: "no-cache"
        }
    )
    return { mutate, loading, onDone, onError, error }
}