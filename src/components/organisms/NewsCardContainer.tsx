import { Box, Button } from '@mui/material';

import { NewsCard } from '@/components/molecules';
import { Article } from '@/lib/types';

interface Props {
  articles: Article[];
  loadMoreArticles: () => void;
}

export default function NewsCardContainer({
  articles,
  loadMoreArticles,
}: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {articles.map((article) => (
          <NewsCard article={article} />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          pb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={loadMoreArticles}
          sx={{ color: 'black' }}
        >
          Load More
        </Button>
      </Box>
    </>
  );
}
