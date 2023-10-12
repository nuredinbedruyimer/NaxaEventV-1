import { User } from "~~/types/entities"

export type Event = {
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
    bookmarked_by_user?: string
    followed_by_user?: string
    ticketsAggregate: {
        aggregate: {
            count: number
        }
    }
}