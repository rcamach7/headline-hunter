import { Box, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';
import { formatDistance } from 'date-fns';

import { removeNewsSource } from '@/lib/helpers';
import { Article } from '@/lib/types';

interface Props {
  article: Article;
}

export default function NewsLine({ article }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Textfit mode="multi" max={40} min={1} style={{ width: '100%' }}>
        <Typography variant="body2" color="text.primary" gutterBottom>
          {removeNewsSource(article.title)}
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
