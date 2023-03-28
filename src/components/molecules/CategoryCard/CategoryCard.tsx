import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { Textfit } from 'react-textfit';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

import CategoryTitle from './CategoryTitle';
import { CategoryArticles, Article } from '@/lib/types';
import { removeNewsSource } from '@/lib/helpers';

interface Props {
  categoryArticle: CategoryArticles;
}

export default function CategoryCard({ categoryArticle }: Props) {
  const { articles } = categoryArticle;
  const primaryArticle = articles[0];

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
            {articles.slice(1).map((article) => {
              return <NewsLine article={article} />;
            })}
          </Box>
          <Button>Show More</Button>
        </CardContent>
      </Card>
    </Box>
  );
}

interface NLProps {
  article: Article;
}

function NewsLine({ article }: NLProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
        <Typography variant="body2" color="text.primary" gutterBottom>
          {removeNewsSource(article.title)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {removeNewsSource(article.sourceName)}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {formatDistance(new Date(article.publishedAt), new Date(), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
      </Textfit>
    </Box>
  );
}
