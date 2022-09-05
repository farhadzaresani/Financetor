import React, { useMemo, useRef } from "react";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

import { setContext } from "@apollo/client/link/context";
import Cookies from "universal-cookie";

const graphqlEndpoint = "http://localhost:80/graphql";

export default function CustomApolloProvider(props) {
  const cookie = new Cookies();

  // console.log(cookie.get("ut"));

  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        auth: `ut ${cookie.get("ut")}`,
      },
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {
          return console.error("message", message);
        });
      }

      if (networkError) {
        console.log(`networkerror: ${networkError}`);
      }
    });

    const httpLink = createUploadLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink]);
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client} {...props} />;
}
