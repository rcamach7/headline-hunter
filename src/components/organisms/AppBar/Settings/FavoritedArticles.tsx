import { Box, Typography } from '@mui/material';

import { User } from '@/lib/types';
import { FavoriteArticleButton } from '@/components/atoms';

interface Props {
  savedArticles: User['savedArticles'];
}

export default function FavoritedArticles({ savedArticles }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          pb: 0.5,
          textDecoration: 'underline',
        }}
      >
        Favorited Articles
      </Typography>
      <Box
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', overflow: 'scroll' }}
      >
        {savedArticles.map((article) => (
          <Box
            key={article.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteArticleButton articleId={article.id} type="condensed" />
            <Typography>{article.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
