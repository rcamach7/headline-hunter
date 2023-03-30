import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

import { AppBar } from '@/components/organisms';
import { CategoryCard } from '@/components/molecules';
import { CategoryArticles } from '@/lib/types';

export default function Home() {
  const [pageData, setPageData] = useState<{
    categoryArticles: CategoryArticles[];
    page: number;
  }>({ categoryArticles: [], page: 1 });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('api/articles');
        setPageData({
          categoryArticles: response.data.newsCategories,
          page: 1,
        });
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      }
    };
    fetchNews();
  }, []);

  const loadMoreCategoryArticles = async () => {
    try {
      const page = pageData.page + 1;
      const response = await axios.get(`api/articles?page=${page}`);
      setPageData((prevState) => ({
        categoryArticles: [
          ...prevState.categoryArticles,
          ...response.data.newsCategories,
        ],
        page,
      }));
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Headline Hunter</title>
      </Head>
      <AppBar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: 2,
          gap: 1,
        }}
      >
        {pageData.categoryArticles.map((categoryArticle) => (
          <CategoryCard
            key={categoryArticle.id}
            categoryArticle={categoryArticle}
          />
        ))}
      </Box>
    </>
  );
}
