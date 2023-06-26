import { Box, Typography, Link } from '@mui/material';

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
        mb: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          pb: 0.5,
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
            <Link
              target="_blank"
              rel="noopener"
              href={article.url}
              sx={{ pl: 1 }}
            >
              {article.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
