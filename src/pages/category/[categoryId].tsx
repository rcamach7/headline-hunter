import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Article, Category } from '@/lib/types';
import { CategoryPageTitle, PageLoading } from '@/components/atoms';
import { AppBar, NewsCardContainer } from '@/components/organisms';
import { SmartSummaryForm } from '@/components/molecules';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

export default function CategoryPage() {
  const { setIsPageLoading, isPageLoading } = useLoadingContext();
  const { addAlertMessage } = useFeedbackContext();
  const {
    query: { categoryId: cat },
  } = useRouter();
  const categoryId = cat as string;

  const [categoryArticles, setCategoryArticles] = useState<{
    category: Category;
    articles: Article[];
    page: number;
  }>({ category: null, articles: [], page: 1 });

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

  async function loadMoreArticles() {
    try {
      setIsPageLoading(true);
      const page = categoryArticles.page + 1;
      const articlesResponse = await axios.get(
        `/api/articles/${categoryId}?page=${page}`
      );
      setCategoryArticles((prevState) => ({
        category: prevState.category,
        articles: [...prevState.articles, ...articlesResponse.data.articles],
        isLoading: false,
        page,
      }));
      addAlertMessage({
        severity: 'success',
        text: 'Loaded more articles',
        variant: 'filled',
      });
    } catch (error) {
      addAlertMessage({
        severity: 'error',
        text: 'Failed to load more articles',
        variant: 'filled',
      });
      console.error('Error loading more articles:', error);
    }
    setIsPageLoading(false);
  }

  useEffect(() => {
    if (categoryId) {
      setIsPageLoading(true);
      fetchCategoryArticles(categoryId, categoryArticles.page).then(
        (categoryArticles) => {
          setCategoryArticles({
            category: categoryArticles.category,
            articles: categoryArticles.articles,
            page: 1,
          });
        }
      );
    } else {
      setCategoryArticles({
        category: null,
        articles: [],
        page: 1,
      });
    }
    setIsPageLoading(false);
  }, [categoryId]);

  if (categoryArticles.category) {
    return (
      <>
        <Head>
          <title>Headline Hunter</title>
        </Head>

        <CategoryPageTitle
          categoryId={categoryId}
          title={categoryArticles.category.type}
        />

        <NewsCardContainer
          articles={categoryArticles.articles}
          loadMoreArticles={loadMoreArticles}
          isLoading={isPageLoading}
          openSmartSummaryModal={openSmartSummaryModal}
        />

        {smartSummaryModal.open && (
          <SmartSummaryForm
            articleTitle={smartSummaryModal.articleTitle}
            articleURL={smartSummaryModal.articleURL}
            onClose={closeSmartSummaryModal}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Headline Hunter</title>
        </Head>
        <AppBar />
        <PageLoading />
      </>
    );
  }
}

async function fetchCategoryArticles(categoryId: string, page: number) {
  try {
    const articlesResponse = await axios.get(
      `/api/articles/${categoryId}?page=${page}`
    );
    const categoryResponse = await axios.get('/api/category/' + categoryId);

    return {
      category: categoryResponse.data.category as Category,
      articles: articlesResponse.data.articles as Article[],
    };
  } catch (err) {
    console.log(err);
  }
  return {
    category: null,
    articles: [],
  };
}
