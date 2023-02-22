import Head from 'next/head';
import { authOptions } from '@/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default function Account({ session }) {
  console.log('session', session);
  return (
    <>
      <Head>
        <title>HH: My Account</title>
      </Head>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
}
