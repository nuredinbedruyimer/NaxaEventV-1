import { useGeolocation } from '@vueuse/core'
import { getEventByLocationQuery } from '~~/graphql/events';
import { GetEventsVars, GetEventsByLocationRes } from '~~/graphql/events/get-events.types';

export function useEventsByLocation(offset: number, limit: number) {
    const { coords } = useGeolocation()
    const queryReturn = useQuery<GetEventsByLocationRes, GetEventsVars>(
        getEventByLocationQuery,
        {
            lat: coords.value.latitude,
            long: coords.value.longitude,
            offset,
            limit,
            orderBy: {},
            date: {},
            price: {},
            cityId: {},
            search: "%%"
        },
        {
            fetchPolicy: "cache-and-network"
        }
    )
    let hasFetched = false;
    watch(coords, () => {
        const lat = coords.value.latitude;
        const long = coords.value.longitude;
        if (!hasFetched && typeof lat === "number" && lat !== Infinity && typeof long === "number" && long !== Infinity) {
            queryReturn.refetch(
                {
                    lat,
                    long
                }
            )
            hasFetched = true;
        }
    })
    return queryReturn
}