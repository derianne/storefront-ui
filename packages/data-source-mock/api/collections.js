import React from "react";

import {
  createApolloGetter,
  createApolloHook
} from "../../data-source-helpers/graphql/apolloClient";
import { gqlCollectionsQuery } from "../../data-source-helpers/graphql/collectionQuery";

export const getCollections = createApolloGetter(
  "collections",
  gqlCollectionsQuery
);
export const useCollections = createApolloHook(
  "collections",
  gqlCollectionsQuery
);
