import Head from 'next/head';
import axios from 'axios';
import { AppBar } from '@/components/organisms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Article, Category } from '@/lib/types';
import { CategoryPageTitle, PageLoading } from '@/components/atoms';
import { NewsCard } from '@/components/molecules';
import { Box } from '@mui/material';

export default function CategoryPage() {
  const {
    query: { categoryId: cat },
  } = useRouter();
  const categoryId = cat as string;

  const [categoryArticles, setCategoryArticles] = useState<{
    category: Category;
    articles: Article[];
    isLoading: boolean;
  }>({ category: null, articles: [], isLoading: true });

  useEffect(() => {
    if (categoryId) {
      fetchCategoryArticles(categoryId).then((categoryArticles) => {
        setCategoryArticles({
          category: categoryArticles.category,
          articles: categoryArticles.articles,
          isLoading: false,
        });
      });
    } else {
      setCategoryArticles({
        category: null,
        articles: [],
        isLoading: false,
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

        <Box
          sx={{
            display: 'flex',
            p: 1,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {categoryArticles.articles.map((article) => (
            <NewsCard article={article} />
          ))}
        </Box>
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

async function fetchCategoryArticles(categoryId: string) {
  try {
    const articlesResponse = await axios.get('/api/articles/' + categoryId);
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
