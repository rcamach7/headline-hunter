import { Box, Button } from '@mui/material';

interface Props {
  loadMoreArticles: () => void;
}

export default function LoadMoreButton({ loadMoreArticles }: Props) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={loadMoreArticles}
      sx={{ color: 'black' }}
    >
      Load More
    </Button>
  );
}
