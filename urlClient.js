import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core";

const isServerSide = typeof window === "undefined";

// The `ssrExchange` must be initialized with `isClient` and `initialState`
const ssrCache = ssrExchange({
  isClient: !isServerSide,
});

const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrCache, // Add `ssr` in front of the `fetchExchange`
    fetchExchange,
  ],
});

export { client, ssrCache };
