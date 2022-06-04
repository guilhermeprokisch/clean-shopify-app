import "../styles/globals.css";
import ShopifyEmbeddedApp from "@components/ShopifyEmbeddedApp";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopifyEmbeddedApp>
      <Component {...pageProps} />
    </ShopifyEmbeddedApp>
  );
}

export default MyApp;
