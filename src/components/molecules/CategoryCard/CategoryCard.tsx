import { Card, CardContent, Box, Button, Divider } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';

import CategoryTitle from './CategoryTitle';
import NewsLine from './NewsLine';
import PrimaryArticleMeta from './PrimaryArticleMeta';
import { CategoryArticles } from '@/lib/types';

interface Props {
  categoryArticle: CategoryArticles;
}

export default function CategoryCard({ categoryArticle }: Props) {
  const { articles } = categoryArticle;
  const primaryArticle = articles[0];
  const [visibleNewsItems, setVisibleNewsItems] = useState(3);

  const handleShowMore = () => {
    setVisibleNewsItems(visibleNewsItems + 3);
  };

  return (
    <Box>
      <CategoryTitle title={categoryArticle.type} />

      <Card sx={{ width: 345 }}>
        <Box sx={{ position: 'relative', height: 175, width: '100%' }}>
          <Image
            src={`/api/image-proxy?url=${encodeURIComponent(
              primaryArticle.urlToImage
            )}`}
            alt={primaryArticle.title}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </Box>
        <CardContent sx={{ px: 1, py: '8px !important' }}>
          <PrimaryArticleMeta
            title={primaryArticle.title}
            publishedAt={primaryArticle.publishedAt}
            sourceName={primaryArticle.sourceName}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {articles.slice(1, 1 + visibleNewsItems).map((article, index) => {
              return (
                <React.Fragment key={article.id}>
                  {index === 0 && (
                    <Divider
                      sx={{ background: '#8b8b8b', borderBottomWidth: '2px' }}
                    />
                  )}

                  <NewsLine article={article} />
                  <Divider
                    sx={{ background: '#8b8b8b', borderBottomWidth: '2px' }}
                  />
                </React.Fragment>
              );
            })}
          </Box>
          <Button onClick={handleShowMore}>Show More</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
