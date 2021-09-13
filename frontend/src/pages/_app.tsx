import { AppProps } from 'next/app'
import Head from 'next/head'

import { AuthProvider } from '../hooks/useAuth'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<AuthProvider>
			<Head>
				<title>Supreme Brakes</title>
			</Head>
			<Component {...pageProps} />
		</AuthProvider>
	)
}

export default MyApp