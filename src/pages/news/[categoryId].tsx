import Head from 'next/head';
import axios from 'axios';
import { default_categories } from '@/lib/categories';
import { AppBar } from '@/components/organisms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Article } from '@/lib/types';
import { FavoriteCategoryButton } from '@/components/atoms';
import { Category } from '@/lib/types';

export default function CategoryPage() {
  const {
    query: { category: cat },
  } = useRouter();
  const categoryId = cat as string;
  const [isLoading, setIsLoading] = useState(true);

  const [categoryArticles, setCategoryArticles] = useState<{
    category: Category;
    articles: Article[];
  }>({ category: null, articles: [] });

  // useEffect(() => {
  //   if (category) {
  //     setIsLoading(false);
  //     if (existsInDefaultCategories(category)) {
  //       setIsValidCategory(true);
  //       fetchCategoryArticles(category).then((articles) => {
  //         setArticles(articles);
  //       });
  //     } else {
  //       setIsValidCategory(false);
  //     }
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [category]);

  if (!categoryArticles.category || isLoading) {
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

        <h3>{category} Category Page</h3>

        <FavoriteCategoryButton category={category} />
      </>
    );
  }
}

async function fetchCategoryArticles(category: string) {
  try {
    const response = await axios.get('/api/articles/' + category);
    return response.data.articles as Article[];
  } catch (err) {
    console.log(err);
  }
  return [];
}

function existsInDefaultCategories(category: string) {
  return default_categories.map((cat) => cat.slug).includes(category);
}
