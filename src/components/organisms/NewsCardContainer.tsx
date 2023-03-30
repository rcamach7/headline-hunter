import { Box, Button } from '@mui/material';

import { NewsCard } from '@/components/molecules';
import { LoadMoreButton } from '@/components/atoms';
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
          <NewsCard article={article} key={article.id} />
        ))}
      </Box>
      <LoadMoreButton loadMore={loadMoreArticles} />
    </>
  );
}
