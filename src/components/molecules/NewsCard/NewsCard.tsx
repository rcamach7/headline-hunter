import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from '@mui/material';
import * as React from 'react';
import { Textfit } from 'react-textfit';

import { Article } from '@/lib/types';
import { ArticleActionButtons } from '@/components/molecules';
import { removeNewsSource } from '@/lib/helpers';
import NewsMeta from './NewsMeta';

interface Props {
  article: Article;
  openSmartSummaryModal: (articleTitle: string, articleURL: string) => void;
}

export default function NewsCard({ article, openSmartSummaryModal }: Props) {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 345,
        maxHeight: 250,
      }}
    >
      <CardActionArea onClick={() => handleClick(article.url)}>
        <Box sx={{ display: 'flex', p: 1, justifyContent: 'space-between' }}>
          <CardContent
            sx={{
              maxHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 0,
            }}
          >
            <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ fontWeight: 'bold' }}
              >
                {removeNewsSource(article.title)}
              </Typography>
            </Textfit>
          </CardContent>

          <CardMedia
            component="img"
            sx={{ width: '100px', height: '80px' }}
            image={article.urlToImage}
            alt={`Article image: ${article.title}`}
            onError={(e: any) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/fallback.jpeg';
            }}
          />
        </Box>

        <NewsMeta
          sourceName={article.sourceName}
          publishedAt={article.publishedAt}
        />
      </CardActionArea>

      <Box sx={{ px: { xs: 1, md: 2 }, mt: 'auto' }}>
        <ArticleActionButtons
          type="full"
          articleId={article.id}
          articleTitle={article.title}
          articleURL={article.url}
          openSmartSummaryModal={openSmartSummaryModal}
        />
      </Box>
    </Card>
  );
}
