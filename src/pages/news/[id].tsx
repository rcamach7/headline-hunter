import Head from 'next/head';
import { AppBar } from '@/components/organisms';

export default function Home() {
  return (
    <>
      <Head>
        <title>Headline Hunter</title>
      </Head>
      <AppBar />

      <h3>Unique Category Page</h3>
    </>
  );
}
