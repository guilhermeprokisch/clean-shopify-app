import Shopify from "@utils/shopify";
import registerMyWebhooks from "../webhooks/webhooks-registration";

export default async function (req, res) {
  const shopSession = await Shopify.Auth.validateAuthCallback(
    req,
    res,
    req.query
  );

  await registerMyWebhooks(shopSession.shop, shopSession.accessToken);

  res.writeHead(302, {
    Location: `https://${shopSession.shop}/admin/apps/clean-shop`,
  });
  res.end();
}
