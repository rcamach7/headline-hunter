import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Article, Category } from '@/lib/types';
import { CategoryPageTitle, PageLoading } from '@/components/atoms';
import { AppBar, NewsCardContainer } from '@/components/organisms';
import { useLoadingContext } from '@/context/LoadingContext';

export default function CategoryPage() {
  const { isLoading } = useLoadingContext();
  const {
    query: { categoryId: cat },
  } = useRouter();
  const categoryId = cat as string;

  const [categoryArticles, setCategoryArticles] = useState<{
    category: Category;
    articles: Article[];
    isLoading: boolean;
    page: number;
  }>({ category: null, articles: [], isLoading: true, page: 1 });

  async function loadMoreArticles() {
    try {
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
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  }

  useEffect(() => {
    if (categoryId) {
      fetchCategoryArticles(categoryId, categoryArticles.page).then(
        (categoryArticles) => {
          setCategoryArticles({
            category: categoryArticles.category,
            articles: categoryArticles.articles,
            isLoading: false,
            page: 1,
          });
        }
      );
    } else {
      setCategoryArticles({
        category: null,
        articles: [],
        isLoading: false,
        page: 1,
      });
    }
  }, [categoryId]);

  if (categoryArticles.category) {
    return (
      <>
        <Head>
          <title>Headline Hunter</title>
        </Head>
        <AppBar />

        <CategoryPageTitle
          categoryId={categoryId}
          title={categoryArticles.category.type}
        />

        <NewsCardContainer
          articles={categoryArticles.articles}
          loadMoreArticles={loadMoreArticles}
          isLoading={categoryArticles.isLoading}
        />

        {isLoading && <PageLoading />}
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
