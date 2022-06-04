import { useEffect, useState } from 'react';
import SessionProvider from '@components/SessionProvider';

export default function EmbeddedApp({ children }) {
  const [host, setHost] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href)
    const host = url.searchParams.get('host');

    if (host) {
      setHost(host)
    } else {
      console.log("Shopify always provide Host in the url. If not present, then the page is loaded outside of App Bridge #hack. Proceed with OAuth");
      window.location.pathname = `/api/auth/shopify/login`;
    }
  }, [])

  return <>
    {host && <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>}
  </>
}
