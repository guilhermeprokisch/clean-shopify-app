import { useEffect } from 'react';
import axios from "axios";

export default function SessionProvider({ children }) {

  useEffect(() => {

    const url = new URL(window.location.href);
    let shop = url.searchParams.get("shop");

    const myAxios = axios.create();
    myAxios
      .post(`/api/auth/checkSession?shop=${shop}`)
      .then(function(response) {
        if (response.data.status === "error") {
          console.log("response status is error, going to redirect to install screen");
          window.top.location.href = `/api/auth/shopify/login?shop=${shop}`;
        } else {
          console.log("response status is not error. Do not redirect to install screen");
        }
      })
      .catch(function(error) {
        console.log("error: ", error);
      });

  }, []);

  return <>{children}</>;
}
