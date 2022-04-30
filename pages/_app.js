import { Provider } from "react-redux";
import { UserAuthContextProvider } from "../src/context/UserAuthContext";
import { store, persistor } from "../src/store";
import "../styles/globals.css";
import {PersistGate} from "redux-persist/integration/react";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import 'react-toastify/dist/ReactToastify.css';
import { StyledEngineProvider } from "@mui/material";
import Head from "next/head";

function MyApp({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    })
  }, [])

  return (
    <>
    <Head>
        <title>Anna Purna.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/faviconmain.ico" />
      </Head>
    <UserAuthContextProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <StyledEngineProvider injectFirst>
        <LoadingBar
        color='#F43F5E'
        height={4}

        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime = {600}
      />
          <Component {...pageProps} />
        </StyledEngineProvider>
        </PersistGate>
      </Provider>
    </UserAuthContextProvider>
    </>
  );
}

export default MyApp;
