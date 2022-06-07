## Shopify App + Next + Typescript = ❤️

This template works straightforward with Shopify CLI. 

### Install
```bash
shopify app connect
# and
shopify app serve
```

Some components need to expose enviroment  public variable needed for shopify. Next by default don't allow this behavior, for this reason it should be add on `.env` an extra `NEXT_PUBLIC_SHOPIFY_API_KEY` as same as `SHOPIFY_API_KEY`. See `.env.example`
