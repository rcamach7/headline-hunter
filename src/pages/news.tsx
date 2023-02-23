import Head from 'next/head';
import { AppBar } from '@/components/organisms';

export default function News() {
  return (
    <>
      <Head>
        <title>HH: News</title>
      </Head>
      <AppBar />

      <h1>News Page</h1>
    </>
  );
}
