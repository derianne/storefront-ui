import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "cross-fetch";
import "regenerator-runtime/runtime";
import runTests from "@commerce-ui/data-source-helpers/runTests";

import { getCollectionByHandle } from "../api/collectionByHandle";
import { getCollections } from "../api/collections";
import { getProducts } from "../api/products";
import { getProductByHandle } from "../api/productByHandle";

global.fetch = fetch;
global.APOLLO_CLIENT = new ApolloClient({
  connectToDevTools: process.browser,
  link: new HttpLink({
    uri: "http://localhost:4000" // Server URL (must be absolute)
  }),
  cache: new InMemoryCache(),
  clientState: { defaults: {}, resolvers: {} }
});

const dataSource = {
  getCollectionByHandle,
  getCollections,
  getProductByHandle,
  getProducts
};

const config = {
  existingCollectionHandle: "candy",
  existingProductHandle: "transparent-bottle1"
};

runTests(dataSource, config);
