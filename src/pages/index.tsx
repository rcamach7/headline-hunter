import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

import { WeatherWidget } from '@/components/organisms';
import { CategoryCard, SmartSummaryForm } from '@/components/molecules';
import { LoadMoreButton } from '@/components/atoms';
import { CategoryArticles } from '@/lib/types';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

export default function Home() {
  const { isPageLoading, setIsPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();
  const [pageData, setPageData] = useState<{
    categoryArticles: CategoryArticles[];
    initialRequest: boolean;
  }>({ categoryArticles: [], initialRequest: true });

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
      setIsPageLoading(true);
      try {
        const response = await axios.get(
          `api/articles?initialRequest=${pageData.initialRequest}`
        );
        setPageData({
          categoryArticles: response.data.newsCategories,
          initialRequest: false,
        });
      } catch (error) {
        addAlertMessage({
          severity: 'error',
          text: 'Failed to fetch news articles',
          variant: 'filled',
        });
        console.error('Failed to fetch news articles:', error);
      }
      setIsPageLoading(false);
    };
    fetchNews();
  }, []);

  const loadMoreCategoryArticles = async () => {
    try {
      setIsPageLoading(true);
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
        categoryArticles: [
          ...prevState.categoryArticles,
          ...response.data.newsCategories,
        ],
      }));
      addAlertMessage({
        severity: 'success',
        text: 'More categories loaded',
        variant: 'filled',
      });
    } catch (error) {
      addAlertMessage({
        severity: 'error',
        text: 'Error loading more categories',
        variant: 'filled',
      });
      console.error('Error loading more articles:', error);
    }
    setIsPageLoading(false);
  };

  return (
    <>
      <Head>
        <title>Headline Hunter</title>
      </Head>
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
            loading={isPageLoading}
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
          {pageData.categoryArticles.length > 0 && <WeatherWidget />}
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
