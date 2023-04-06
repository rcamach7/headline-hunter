import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, CircularProgress } from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
} from '@mui/icons-material';

import { useUserContext } from '@/context/UserContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

interface Props {
  categoryId: string;
}

export default function FavoriteCategoryButton({ categoryId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useUserContext();
  const { addAlertMessage } = useFeedbackContext();

  async function handleClick() {
    if (user) {
      toggleFavorite();
    } else {
      addAlertMessage({
        severity: 'error',
        variant: 'filled',
        text: 'Please log in to save categories',
      });
    }
  }

  async function toggleFavorite() {
    try {
      setIsLoading(true);
      await axios.post('/api/user/favoriteCategories/' + categoryId);
      refreshUser();
      setIsFavorite((prev) => !prev);
      setIsLoading(false);
      addAlertMessage({
        severity: 'success',
        variant: 'filled',
        text: isFavorite
          ? 'Category removed from favorites'
          : 'Category added to favorites',
      });
    } catch (error) {
      setIsLoading(false);
      addAlertMessage({
        severity: 'error',
        variant: 'filled',
        text: 'Error toggling favorite category',
      });
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
  }, [user, categoryId]);

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
        onClick={handleClick}
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
