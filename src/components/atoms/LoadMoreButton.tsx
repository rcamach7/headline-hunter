import { Box, Button, CircularProgress } from '@mui/material';

interface Props {
  loadMore: () => void;
  loading: boolean;
}

export default function LoadMoreButton({ loadMore, loading }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        pb: 3,
      }}
    >
      {loading ? (
        <Button variant="contained" disabled>
          <CircularProgress />
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={loadMore}>
          Load More
        </Button>
      )}
    </Box>
  );
}
