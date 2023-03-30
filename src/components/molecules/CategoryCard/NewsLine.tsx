import { Box, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';
import { formatDistance } from 'date-fns';

import { removeNewsSource } from '@/lib/helpers';
import { Article } from '@/lib/types';
import { ArticleActionButtons } from '@/components/molecules';

interface Props {
  article: Article;
}

export default function NewsLine({ article }: Props) {
  return (
    <Box sx={{ display: 'flex', pt: 0.5 }}>
      <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
        <Typography variant="body2" color="text.primary">
          <a
            style={{ color: 'inherit', textDecoration: 'none' }}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {removeNewsSource(article.title)}
          </a>
          <ArticleActionButtons type="condensed" />
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '.3em' }}
          >
            {article.sourceName}
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
