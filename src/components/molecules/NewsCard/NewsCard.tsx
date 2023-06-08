import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from '@mui/material';
import * as React from 'react';
import { Textfit } from 'react-textfit';
import Image from 'next/image';

import { Article } from '@/lib/types';
import { ArticleActionButtons } from '@/components/molecules';
import { removeNewsSource, shortenParagraph } from '@/lib/helpers';
import NewsMeta from './NewsMeta';

interface Props {
  article: Article;
  openSmartSummaryModal: (articleTitle: string, articleURL: string) => void;
}

export default function NewsCard({ article, openSmartSummaryModal }: Props) {
  const [imageUrl, setImageUrl] = React.useState(
    article.urlToImage === 'Unknown'
      ? '/images/fallback.jpeg'
      : `/api/image-proxy?url=${encodeURIComponent(article.urlToImage)}`
  );

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  const handleImageError = () => {
    setImageUrl('/images/fallback.jpeg');
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 345,
        maxHeight: 300,
      }}
    >
      <CardActionArea onClick={() => handleClick(article.url)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={imageUrl}
            onError={handleImageError}
            alt={article.title}
            width={250}
            height={100}
          />
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
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                {removeNewsSource(article.title)}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ textAlign: 'center' }}
                color="secondary.main"
              >
                {shortenParagraph(article.description, 50)}
              </Typography>
            </Textfit>
          </CardContent>
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
