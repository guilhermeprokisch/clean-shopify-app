import { Shopify, ApiVersion } from "@shopify/shopify-api";
import RedisStore from "@services/redis";

const sessionStorage = new RedisStore(process.env.REDIS_URL);
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, HOST } = process.env;

let context = {
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: SCOPES,
  HOST_NAME: HOST.replace(/^https?:\/\//, ""),
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.April22,
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
