import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, useSigninCheck } from 'reactfire'
import useFirebaseUIConfig from './useFirebaseUIConfig'

function SignIn() {
  const auth = useAuth()
  const uiConfig = useFirebaseUIConfig()

  const { status, data: signInCheckResult } = useSigninCheck()
  const isSignedIn =
    signInCheckResult &&
    signInCheckResult.signedIn === true &&
    !signInCheckResult.user.isAnonymous

  if (status === 'loading') {
    return null
  }

  if (isSignedIn) {
    return <LogOutButton />
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}

function LogOutButton() {
  const auth = useAuth()

  return (
    <div>
      <button
        onClick={() => {
          auth.signOut()
          auth.signInAnonymously()
        }}
      >
        Log out
      </button>
    </div>
  )
}

export default SignIn
