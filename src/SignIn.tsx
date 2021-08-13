import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, useSigninCheck } from 'reactfire'
import firebase from 'firebase'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

function SignIn() {
  const auth = useAuth()
  const { status, data: signInCheckResult } = useSigninCheck()
  const isSignedIn =
    signInCheckResult &&
    signInCheckResult.signedIn === true &&
    !signInCheckResult.user.isAnonymous

  if (status === 'loading' || isSignedIn) {
    return null
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}

export default SignIn
