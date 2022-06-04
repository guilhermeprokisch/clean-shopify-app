import Shopify from "@lib/shopify";

export default async function (req, res) {
  const authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    "/api/auth/callback",
    false
  );
  console.log(authRoute);
  res.redirect(authRoute);
}
