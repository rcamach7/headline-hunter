import {
  Card,
  CardContent,
  Box,
  Button,
  Divider,
  CardActionArea,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import React, { useEffect } from 'react';

import CategoryTitle from './CategoryTitle';
import NewsLine from './NewsLine';
import PrimaryArticleMeta from './PrimaryArticleMeta';
import { CategoryArticles } from '@/lib/types';

interface Props {
  categoryArticle: CategoryArticles;
  openSmartSummaryModal: (articleTitle: string, articleURL: string) => void;
}

export default function CategoryCard({
  categoryArticle,
  openSmartSummaryModal,
}: Props) {
  const { articles } = categoryArticle;
  const primaryArticle = articles[0];
  const [visibleNewsItems, setVisibleNewsItems] = useState(3);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const [imageUrl, setImageUrl] = useState(
    primaryArticle.urlToImage === 'Unknown'
      ? '/images/fallback.jpeg'
      : `/api/image-proxy?url=${encodeURIComponent(primaryArticle.urlToImage)}`
  );

  const handleImageError = () => {
    setImageUrl('/images/fallback.jpeg');
  };

  const handleShowMore = () => {
    setVisibleNewsItems(visibleNewsItems + 2);
  };

  useEffect(() => {
    if (isMd) {
      setVisibleNewsItems(4);
    } else {
      setVisibleNewsItems(3);
    }
  }, [isMd]);

  return (
    <Box>
      <CategoryTitle
        title={categoryArticle.type}
        categoryId={categoryArticle.id}
      />

      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: 345, md: 800 },
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
          <Box
            sx={{
              position: 'relative',
              height: 175,
              width: '100%',
              minWidth: 345,
            }}
          >
            <Image
              src={imageUrl}
              onError={handleImageError}
              alt={primaryArticle.title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <PrimaryArticleMeta
            article={primaryArticle}
            openSmartSummaryModal={openSmartSummaryModal}
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

                  <NewsLine
                    article={article}
                    openSmartSummaryModal={openSmartSummaryModal}
                  />
                  <Divider sx={{ background: '#8b8b8b' }} />
                </React.Fragment>
              );
            })}
          </Box>
          <CardActionArea
            component="div"
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
