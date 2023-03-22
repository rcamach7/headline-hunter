import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, CircularProgress } from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
} from '@mui/icons-material';

import { useUserContext } from '@/context/UserContext';

interface Props {
  categoryId: string;
}

export default function FavoriteCategoryButton({ categoryId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useUserContext();

  async function toggleFavorite() {
    try {
      setIsLoading(true);
      await axios.post('/api/user/favoriteCategories/' + categoryId);
      refreshUser();
      setIsFavorite((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error toggling favorite category:', error);
    }
  }

  useEffect(() => {
    if (user) {
      if (user.savedCategories) {
        const isFavorited = user.savedCategories.some(
          (savedCategory) => savedCategory.id === categoryId
        );
        setIsFavorite(isFavorited);
      }
    }
  }, [user]);

  if (isLoading) {
    return (
      <IconButton aria-label="loading" disabled>
        <CircularProgress size={24} />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        aria-label={isFavorite ? 'un-save' : 'save'}
        onClick={toggleFavorite}
      >
        {isFavorite ? (
          <FavoriteFullIcon sx={{ color: 'text.primary' }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: 'text.primary' }} />
        )}
      </IconButton>
    );
  }
}
