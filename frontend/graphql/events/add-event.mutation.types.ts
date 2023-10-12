export type AddEventMutationVars = {
    title: string
    description?: string
    images?: Array<string>
    tags?: Array<string>
    date: string
    price?: number
    cityId?: string
    location?: Array<number>
    specificAddress?: string
}

export type AddEventMutationRes = {
    insertEventsOne: { id: string }
}