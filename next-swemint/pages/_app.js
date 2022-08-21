import React from "react";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
        api_key={process.env.NEXT_PUBLIC_API_KEY}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </React.StrictMode> 
  );
}
export default MyApp;
