import {
  Card,
  CardContent,
  Box,
  Button,
  Divider,
  CardActionArea,
} from '@mui/material';
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

      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: 345, md: 800 },
        }}
      >
        <Box>
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
          <PrimaryArticleMeta
            title={primaryArticle.title}
            publishedAt={primaryArticle.publishedAt}
            sourceName={primaryArticle.sourceName}
          />
        </Box>

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 1,
            pt: 0,
            pb: '8px !important',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: { md: 1 } }}>
            {articles.slice(1, 1 + visibleNewsItems).map((article, index) => {
              return (
                <React.Fragment key={article.id}>
                  {index === 0 && (
                    <Divider
                      sx={{
                        background: '#8b8b8b',
                        display: { sm: 'block', md: 'none' },
                      }}
                    />
                  )}

                  <NewsLine article={article} />
                  <Divider sx={{ background: '#8b8b8b' }} />
                </React.Fragment>
              );
            })}
          </Box>
          <CardActionArea
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 'auto',
            }}
          >
            <Button onClick={handleShowMore}>Show More</Button>
            {visibleNewsItems > 3 && (
              <Button onClick={() => setVisibleNewsItems(3)}>Collapse</Button>
            )}
          </CardActionArea>
        </CardContent>
      </Card>
    </Box>
  );
}
