export interface GetEventLocationVars {
  lat: number
  long: number
  offset?: number
  limit?: number
}

export interface GetEventLocationRes {
  eventsByLocation: Array<
    {
      id: string
      title: string
      description: string
      date: Date
      bookmarks_count: number
      images: string
      city: {
        name: string
      }
      price: number
    }
  >
}