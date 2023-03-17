import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Preferences } from '@/lib/types';

interface Props {
  category: string;
  preferences: Preferences;
}

export default function FavoriteCategoryButton({
  category,
  preferences,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (preferences) {
      const { savedCategories } = preferences;
      if (savedCategories) {
        const isFavorite = savedCategories.some(
          (savedCategory) => savedCategory.type === category
        );
        setIsFavorite(isFavorite);
      }
    }
  }, [preferences]);

  if (!preferences) return null;
  if (isFavorite) {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setIsFavorite(false);
        }}
      >
        Remove from Favorites
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsFavorite(true);
        }}
      >
        Add to Favorites
      </Button>
    );
  }
}
