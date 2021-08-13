import { useAuth, useSigninCheck } from 'reactfire'
import { useEffect, useState } from 'react'

const useCreateAnonymouseUserOnLoad = () => {
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
}

export default useCreateAnonymouseUserOnLoad
