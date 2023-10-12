import { GetEventsVars } from "~~/graphql/events/get-events.types";

export function createEventsQueryVars(vars: GetEventsVars): GetEventsVars {
    return {
        ...vars,
        orderBy: vars.orderBy ?? {},
        cityId: vars.cityId ?? {},
        date: vars.date ?? {},
        price: vars.price ?? {},
        userId: vars.userId ?? {}
    }
}