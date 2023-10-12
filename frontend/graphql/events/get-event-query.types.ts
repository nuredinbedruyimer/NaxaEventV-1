import { User } from "~~/types/entities"

export interface GetEventQueryVars {
    id: string
}

export interface GetEventQueryRes {
    eventsByPk:
    {
        location: [number, number]
        bookmarks_count: number
        city: {
            name: string
            id: string
        }
        date: Date
        description: string
        id: string
        images: Array<string>
        price: number
        specificAddress: string
        tags: Array<string>
        title: string
        user: User
        ticketsAggregate: {
            aggregate: {
                count: number
            }
        }
    }
}