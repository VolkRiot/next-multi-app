import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { NextPageContext } from 'next';

export default function createApolloClient(
  initialState: {},
  ctx: NextPageContext
): ApolloClient<any> {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: !!ctx,
    link: new HttpLink({
      uri: 'https://api.github.com/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers: {
        authorization: `Bearer ${process.env.GITHUB_GRAPH_API_TOKEN}`,
      },
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
