import { Box, Typography, Button } from '@mui/material';
import { ArrowCircleRight as ArrowCircleRightIcon } from '@mui/icons-material/';

interface Props {
  title: string;
}

export default function CategoryTitle({ title }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold', pl: 1 }}
      >
        {title.toUpperCase()}
      </Typography>

      <Button variant="text" startIcon={<ArrowCircleRightIcon />}>
        View More
      </Button>
    </Box>
  );
}
