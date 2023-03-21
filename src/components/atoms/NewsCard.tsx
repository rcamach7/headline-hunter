import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from '@mui/material';
import * as React from 'react';
import { Article } from '@/lib/types';
import { Textfit } from 'react-textfit';

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  console.log(article);
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 200 }}>
      <CardActionArea sx={{ display: 'flex', p: 1 }}>
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
              {article.title}
            </Typography>
          </Textfit>
        </CardContent>

        <CardMedia
          component="img"
          sx={{ width: '100px', height: '100px' }}
          image={article.urlToImage}
          alt="article image"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
