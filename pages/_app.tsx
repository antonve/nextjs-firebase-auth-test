import type { AppProps } from 'next/app'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '../src/firebase.config'
import useCreateAnonymouseUserOnLoad from '../src/useCreateAnonymouseUserOnLoad'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AnonymousUserProvider>
        <Component {...pageProps} />
      </AnonymousUserProvider>
    </FirebaseAppProvider>
  )
}

const AnonymousUserProvider: React.FC = ({ children }) => {
  useCreateAnonymouseUserOnLoad()

  return <>{children}</>
}

export default MyApp
