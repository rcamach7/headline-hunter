import { Box, Button } from '@mui/material';

interface Props {
  loadMore: () => void;
}

export default function LoadMoreButton({ loadMore }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        pb: 2,
      }}
    >
      <Button variant="outlined" color="secondary" onClick={loadMore}>
        Load More
      </Button>
    </Box>
  );
}
