import Head from 'next/head';
import { default_categories } from '@/lib/categories';
import { AppBar } from '@/components/organisms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Home() {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(false);

  useEffect(() => {
    setIsLoading(!query.category);
    if (query.category && typeof query.category === 'string') {
      setIsValidId(
        default_categories
          .map((category) => category.slug)
          .includes(query.category)
      );
    }
  }, [query]);

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
