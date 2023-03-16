import Head from 'next/head';
import { default_categories } from '@/lib/categories';
import { AppBar } from '@/components/organisms';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidCategory, setIsValidCategory] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (query.category && typeof query.category === 'string') {
      setIsLoading(false);
      if (existsInDefaultCategories(query.category)) {
        setIsValidCategory(true);
      } else {
        setIsValidCategory(false);
        fetchCategoryArticles(query.category).then((articles) => {
          setArticles(articles);
        });
      }
    } else {
      setIsLoading(true);
    }
  }, [query]);

  if (!isValidCategory || isLoading) {
    return (
      <>
        <Head>
          <title>Headline Hunter</title>
        </Head>
        <AppBar />
        {isLoading ? <h3>Loading...</h3> : <h3>Invalid Category</h3>}
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Headline Hunter</title>
        </Head>
        <AppBar />

        <h3>{query.category} Category Page</h3>
      </>
    );
  }
}

async function fetchCategoryArticles(category: string) {
  return [];
}

function existsInDefaultCategories(category: string) {
  return default_categories.map((cat) => cat.slug).includes(category);
}
