import { Box, Typography, Button } from '@mui/material';
import { ArrowCircleRight as ArrowCircleRightIcon } from '@mui/icons-material/';

import { FavoriteCategoryButton } from '@/components/atoms';

interface Props {
  title: string;
  categoryId: string;
}

export default function CategoryTitle({ title, categoryId }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            pl: 1,
            color: '#cecece',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <FavoriteCategoryButton categoryId={categoryId} />
      </Box>

      <Button
        variant="text"
        startIcon={<ArrowCircleRightIcon sx={{ color: '#b6b5b5' }} />}
        sx={{ color: '#b6b5b5' }}
      >
        View More
      </Button>
    </Box>
  );
}
