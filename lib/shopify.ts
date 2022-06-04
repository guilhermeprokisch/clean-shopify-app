import { Shopify } from "@shopify/shopify-api";
import RedisStore from "@lib/redis";

const sessionStorage = new RedisStore(process.env.REDIS_URL);

const {
  NEXT_PUBLIC_SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_API_SCOPES,
  HOST,
} = process.env;

let context = {
  API_KEY: NEXT_PUBLIC_SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: SHOPIFY_API_SCOPES,
  HOST_NAME: HOST,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback,
    sessionStorage.loadCallback,
    sessionStorage.deleteCallback
  ),
};

Shopify.Context.initialize(context);

Shopify.Context.update = function (overrides) {
  Shopify.Context.initialize({ ...context, ...overrides });
};

export default Shopify;
