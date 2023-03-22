import { Box, Typography } from '@mui/material';
import FavoriteCategoryButton from './FavoriteCategoryButton';

interface Props {
  title: string;
  categoryId: string;
}

export default function CategoryPageTitle({ title, categoryId }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography
        sx={{
          fontSize: 24,
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'roboto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {title.toUpperCase()}
      </Typography>
      <FavoriteCategoryButton categoryId={categoryId} />
    </Box>
  );
}
