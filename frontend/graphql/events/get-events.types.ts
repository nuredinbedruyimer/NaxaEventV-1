import { EventPreview } from "./event-preview.type"

export type GetEventsVars = {
    offset?: number
    limit?: number
    orderBy?: {
        date: orderBy
        price: orderBy
    } | {}
    cityId?: { _in: Array<string> } | {}
    date?: range<Date> | {}
    price?: range<number> | {}

    // get by search text
    search?: string

    // get by location
    lat?: number
    long?: number

    // both
    userId?: { _eq: string } | {}
    bookmarks?: { userId: { _eq: string } } | {}
}

export type GetEventsRes = {
    events: Array<EventPreview>
}

export type GetEventsByLocationRes = {
    eventsByLocation: Array<EventPreview>
}
export type SearchEventsRes = {
    searchEvents: Array<EventPreview>
}
export type GetMyEventsRes = {
    me: {
        events: Array<EventPreview>
    }
}
export type GetSavedEventsRes = {
    me: {
        bookmarks: Array<{
            event: EventPreview
        }>
    }
}

type orderBy = "ASC" | "DESC"
type range<T> = {
    _gte: T
    _lte: T
}