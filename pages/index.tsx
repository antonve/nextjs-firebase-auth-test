import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useUser } from 'reactfire'
import 'firebase/auth'
import SignIn from '../src/SignIn'

const CurrentUser = () => {
  const { data: user } = useUser()

  if (!user) {
    return null
  }

  if (user.isAnonymous) {
    return <>Good evening anonymous user</>
  }

  return <>Hello, {user.displayName}</>
}

const Home: NextPage = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<>Loading...</>}>
        <CurrentUser />
        <SignIn />
      </Suspense>
    </ErrorBoundary>
  )
}

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert">
      <p>Error loading:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })
