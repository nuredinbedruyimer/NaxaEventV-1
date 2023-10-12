import { GetCitiesQueryRes } from "~~/graphql/cities/get-city.query.types";
import { getCitesQuery } from "~~/graphql/cities";

export function getCities() {
    return useQuery<GetCitiesQueryRes, {}>(
        getCitesQuery,
        {},
        {
            fetchPolicy: "cache-and-network"
        }
    )
}