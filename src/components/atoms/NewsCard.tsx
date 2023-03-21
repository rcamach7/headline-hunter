import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Box,
} from '@mui/material';
import * as React from 'react';
import { Article } from '@/lib/types';
import { Textfit } from 'react-textfit';
import { removeNewsSource } from '@/lib/helpers';
import { formatDistance } from 'date-fns';

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 200 }}>
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
            alt="article image"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {article.sourceName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDistance(new Date(article.publishedAt), new Date(), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
