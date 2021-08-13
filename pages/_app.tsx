import type { AppProps } from 'next/app'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '../src/firebase.config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseAppProvider>
  )
}
export default MyApp
