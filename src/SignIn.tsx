import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useAuth, useSigninCheck } from 'reactfire'
import firebase from 'firebase'

function SignIn() {
  const auth = useAuth()

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    autoUpgradeAnonymousUsers: true,
    callbacks: {
      signInFailure: (error: any) => {
        if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
          return
        }
        const existingAccount = error.credential
        const anonymousAccount = auth.currentUser

        auth.signInWithCredential(existingAccount)
        anonymousAccount?.delete()
      },
    },
  }

  const { status, data: signInCheckResult } = useSigninCheck()
  const isSignedIn =
    signInCheckResult &&
    signInCheckResult.signedIn === true &&
    !signInCheckResult.user.isAnonymous

  if (status === 'loading') {
    return null
  }

  if (isSignedIn) {
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

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}

export default SignIn
