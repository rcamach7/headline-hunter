import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';

import { CategoryArticles } from '@/lib/types';
import { removeNewsSource } from '@/lib/helpers';

interface Props {
  categoryArticle: CategoryArticles;
}

export default function CategoryCard({ categoryArticle }: Props) {
  const { articles } = categoryArticle;
  const primaryArticle = articles[0];

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={primaryArticle.urlToImage}
        title="green iguana"
      />
      <CardContent>
        <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {removeNewsSource(primaryArticle.title)}
          </Typography>
        </Textfit>
      </CardContent>
    </Card>
  );
}
