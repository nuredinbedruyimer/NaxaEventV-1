export type SelectedImage = {
    id: number
    content: string | ArrayBuffer
    isThumbnail: boolean,
    extension?: string,
    isB64: boolean
}

export type ComposedEvent = {
    title?: string
    description?: string
    tags?: Array<string>
    images?: Array<string>
    date?: string
    price?: number
    cityId?: string
    latitude?: number
    longitude?: number
    specificAddress?: string
}