import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { Textfit } from 'react-textfit';
import { useState } from 'react';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

import CategoryTitle from './CategoryTitle';
import NewsLine from './NewsLine';
import { CategoryArticles, Article } from '@/lib/types';
import { removeNewsSource } from '@/lib/helpers';

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
          <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {removeNewsSource(primaryArticle.title)}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {primaryArticle.sourceName}
            </Typography>
          </Textfit>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {articles.slice(1, 1 + visibleNewsItems).map((article) => {
              return <NewsLine article={article} />;
            })}
          </Box>
          <Button onClick={handleShowMore}>Show More</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
