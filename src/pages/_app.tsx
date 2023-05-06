import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/store/store";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({Component, pageProps}: AppPropsWithLayout) => {

  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}

export default App