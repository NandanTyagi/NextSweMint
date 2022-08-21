import React from "react";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

// import { AnimatePresence } from "framer-motion";

// The handler to smoothly scroll to the element into view
// const handExitComplete = () => {
//   if (typeof window !== "undefined") {
//     const hashId = window.location.hash;

//     console.log({ location: window.location, hashId });

//     if (hashId) {
//       const element = document.querySelector(hashId);
//       console.log({ element });

//       if (element) {
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//           inline: "nearest",
//         });
//       }
//     }
//   }
// };

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
