import type { AppProps } from 'next/app'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '../src/firebase.config'
import { useAuth, useSigninCheck } from 'reactfire'
import { useEffect, useState } from 'react'

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
  const auth = useAuth()
  const { status, data: signInCheckResult } = useSigninCheck()
  const [didCreateAccount, setDidCreateAccount] = useState(false)

  useEffect(() => {
    if (
      status === 'success' &&
      signInCheckResult &&
      signInCheckResult.signedIn === false &&
      didCreateAccount === false
    ) {
      setDidCreateAccount(true)
      auth.signInAnonymously()
    }
  }, [status, auth, signInCheckResult, didCreateAccount])

  return <>{children}</>
}

export default MyApp
