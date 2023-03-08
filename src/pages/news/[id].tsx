import Head from 'next/head';
import { AppBar } from '@/components/organisms';
import { useRouter } from 'next/router';

export default function Home() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Headline Hunter</title>
      </Head>
      <AppBar />

      <h3>{query.id} Category Page</h3>
    </>
  );
}
