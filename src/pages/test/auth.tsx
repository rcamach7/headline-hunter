import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const userSession = useSession();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {userSession.status === 'loading' ? (
        <div>Loading...</div>
      ) : userSession.status === 'unauthenticated' ? (
        <button onClick={() => signIn()}>Sign in</button>
      ) : (
        <div>
          <div>Authenticated</div>
          <div>{userSession.data.user.email}</div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
}
