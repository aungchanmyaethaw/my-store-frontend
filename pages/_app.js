import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "urql";
import { client, ssrCache } from "../urlClient";
import { AppContextProvider } from "../contexts";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Backdrop from "../components/Backdrop";
import CartSidebar from "../components/CartSidebar";

export default function App({ Component, pageProps }) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <>
      <Head>
        <title>My Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <AppContextProvider>
          <Provider value={client}>
            <CartSidebar />
            <Backdrop />
            <Component {...pageProps} />;
          </Provider>
        </AppContextProvider>
      </UserProvider>
    </>
  );
}
