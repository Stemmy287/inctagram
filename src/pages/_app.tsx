import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	console.log('check')
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<Provider store={store}>
			<GoogleOAuthProvider clientId={'553777753445-0vp2nacg4s0h2464gjlbhq2rchi0be3b.apps.googleusercontent.com'}>
				{getLayout(<Component {...pageProps} />)}
			</GoogleOAuthProvider>
		</Provider>
	)
}

export default App