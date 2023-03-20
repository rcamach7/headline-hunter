import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';

interface Props {
  category: string;
}

export default function FavoriteCategoryButton({ category }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { preferences } = useUserContext();

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

  function triggerFavorite() {
    if (isFavorite) {
      // remove from favorites
    } else {
      // add to favorites
    }
  }

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
