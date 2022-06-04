import "../styles/globals.css";
import EmbeddedApp from "@components/EmbeddedApp";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EmbeddedApp>
      <Component {...pageProps} />
    </EmbeddedApp>
  );
}

export default MyApp;
