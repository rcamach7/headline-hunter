import { Box, Typography, Button } from '@mui/material';
import { ArrowCircleRight as ArrowCircleRightIcon } from '@mui/icons-material/';

interface Props {
  title: string;
}

export default function CategoryTitle({ title }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold', pl: 1, color: '#cecece' }}
      >
        {title.toUpperCase()}
      </Typography>

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
