import Shopify from "@services/shopify";

export default async (req, res) => {
  // Provide HOST_NAME here just in case it was not provided by env variable
  // This might occur during the first deploy to Vercel when you don't yet know
  // what domain your app is being hosted on
  Shopify.Context.update({ HOST_NAME: req.headers.host });

  const session = await Shopify.Utils.loadCurrentSession(req, res, false);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  console.log(client);

  // Use `client.get` to request the specified Shopify GraphQL API endpoint, in this case `products`.
  const products = await client.query({
    data: `mutation {
  appPurchaseOneTimeCreate(
    name: "100 emails for $1 USD"
    price: { amount: 1.00, currencyCode: USD }
    test:true
    returnUrl: "http://${session.shop}/admin/apps/clean-shop/"
  ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appPurchaseOneTime {
        id
      }
  }
}`,
  });

  res.status(200).json(products);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
