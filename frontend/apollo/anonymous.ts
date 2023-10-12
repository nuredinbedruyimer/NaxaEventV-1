import { defineApolloClient } from "@nuxtjs/apollo";

export default defineApolloClient({
  httpEndpoint: "https://ruling-krill-83.hasura.app/v1/graphql",
  connectToDevTools: false,
});
