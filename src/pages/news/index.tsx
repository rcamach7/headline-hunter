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
    console.log(categoryArticles);
  }, [categoryArticles]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const categoryArticles = await axios.get('api/articles');
        setCategoryArticles(categoryArticles.data.newsCategories);
      } catch (error) {
        console.log(error);
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
