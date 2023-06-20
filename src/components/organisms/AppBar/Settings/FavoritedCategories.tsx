import { Box, Typography } from '@mui/material';

import { FavoriteCategoryButton } from '@/components/atoms';
import { User } from '@/lib/types';

interface Props {
  user: User;
}

export default function FavoritedCategories({ user }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          pb: 0.5,
          textDecoration: 'underline',
        }}
      >
        Favorited Categories
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {user.savedCategories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderRadius: 2,
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
