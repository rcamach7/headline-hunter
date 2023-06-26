import { Box, Typography } from '@mui/material';

import { FavoriteCategoryButton } from '@/components/atoms';
import { User } from '@/lib/types';

interface Props {
  savedCategories: User['savedCategories'];
}

export default function FavoritedCategories({ savedCategories }: Props) {
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
        Favorited Categories
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {savedCategories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderRadius: 1,
              pr: 1,
            }}
          >
            <FavoriteCategoryButton
              key={category.id}
              categoryId={category.id}
            />
            <Typography>{category.type}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
