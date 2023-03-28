import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { AppBar } from '@/components/organisms';
import { CategoryArticles } from '@/lib/types';

export default function Home() {
  const [categoryArticles, setCategoryArticles] = useState<CategoryArticles[]>(
    []
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('api/articles');
        setCategoryArticles(response.data.newsCategories);
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <Head>
        <title>Headline Hunter</title>
      </Head>
      <AppBar />

      <h3>News Page</h3>
    </>
  );
}
