import { useAuth } from 'reactfire'
import firebase from 'firebase'

function useFirebaseUIConfig() {
  const auth = useAuth()

  return {
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
}

export default useFirebaseUIConfig
