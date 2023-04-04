import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

import { AppBar, WeatherWidget } from '@/components/organisms';
import { CategoryCard, SmartSummaryForm } from '@/components/molecules';
import { LoadMoreButton } from '@/components/atoms';
import { CategoryArticles } from '@/lib/types';

export default function Home() {
  const [pageData, setPageData] = useState<{
    categoryArticles: CategoryArticles[];
    initialRequest: boolean;
    loading: boolean;
  }>({ categoryArticles: [], initialRequest: true, loading: true });

  const [smartSummaryModal, setSmartSummaryModal] = useState<{
    open: boolean;
    articleTitle: string;
    articleURL: string;
  }>({ open: false, articleTitle: '', articleURL: '' });

  const openSmartSummaryModal = (articleTitle: string, articleURL: string) => {
    setSmartSummaryModal({
      open: true,
      articleTitle,
      articleURL,
    });
  };

  const closeSmartSummaryModal = () => {
    setSmartSummaryModal({ open: false, articleTitle: '', articleURL: '' });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `api/articles?initialRequest=${pageData.initialRequest}`
        );
        setPageData({
          categoryArticles: response.data.newsCategories,
          initialRequest: false,
          loading: false,
        });
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      }
    };
    fetchNews();
  }, []);

  const loadMoreCategoryArticles = async () => {
    try {
      setPageData((prevState) => ({ ...prevState, loading: true }));
      const currentIds = pageData.categoryArticles.map(
        (categoryArticle) => categoryArticle.id
      );
      const response = await axios.get(
        `api/articles?initialRequest=${
          pageData.initialRequest
        }&current=${currentIds.join(',')}`
      );
      setPageData((prevState) => ({
        ...prevState,
        loading: false,
        categoryArticles: [
          ...prevState.categoryArticles,
          ...response.data.newsCategories,
        ],
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
          justifyContent: 'center',
          gap: { ml: 2, lg: 3, xl: 4 },
          p: 1,
        }}
      >
        <Box sx={{ overflowY: 'auto', minHeight: '100vh' }}>
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
                openSmartSummaryModal={openSmartSummaryModal}
              />
            ))}
          </Box>
          <LoadMoreButton
            loadMore={loadMoreCategoryArticles}
            loading={pageData.loading}
          />
        </Box>

        <Box
          sx={{
            display: { xs: 'none', ml: 'flex' },
            maxWidth: 225,
            justifyContent: 'center',
            pt: 4,
            flexGrow: 0.75,
          }}
        >
          <WeatherWidget />
        </Box>
      </Box>

      {smartSummaryModal.open && (
        <SmartSummaryForm
          articleTitle={smartSummaryModal.articleTitle}
          articleURL={smartSummaryModal.articleURL}
          onClose={closeSmartSummaryModal}
        />
      )}
    </>
  );
}
