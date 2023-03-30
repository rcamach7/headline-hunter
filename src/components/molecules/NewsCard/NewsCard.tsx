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
import { ArticleActionButtons } from '@/components/atoms';
import { removeNewsSource } from '@/lib/helpers';
import NewsMeta from './NewsMeta';

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  return (
    <Card sx={{ width: 345, maxHeight: 200 }}>
      <CardActionArea>
        <Box sx={{ display: 'flex', p: 1 }}>
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
            sx={{ width: '100px', height: '100px' }}
            image={article.urlToImage}
            alt={`Article image: ${article.title}`}
          />
        </Box>

        <NewsMeta
          sourceName={article.sourceName}
          publishedAt={article.publishedAt}
        />
      </CardActionArea>

      <ArticleActionButtons type="full" />
    </Card>
  );
}
