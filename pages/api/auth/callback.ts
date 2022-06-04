import Shopify from "@utils/shopify";

export default async function (req, res) {
  const shopSession = await Shopify.Auth.validateAuthCallback(
    req,
    res,
    req.query
  );
  res.writeHead(302, {
    Location: `https://${shopSession.shop}/admin/apps/clean-shop`,
  });
  res.end();
}
