import { IconButton, CircularProgress } from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useUserContext } from '@/context/UserContext';

interface Props {
  articleId: string;
  type: 'full' | 'condensed';
}

export default function FavoriteArticle({ articleId, type }: Props) {
  const { user, refreshUser } = useUserContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const iconSize = type === 'full' ? 'medium' : 'small';

  const getStyles = (type: 'full' | 'condensed') => {
    if (type === 'full') {
      return { marginLeft: 'auto !important' };
    } else {
      return {
        padding: 0,
        ml: 0.5,
      };
    }
  };

  async function toggleFavorite() {
    try {
      setIsLoading(true);
      await axios.post('/api/user/favoriteArticles/' + articleId);
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
      if (user.savedArticles) {
        const isFavorited = user.savedArticles.some(
          (savedArticle) => savedArticle.id === articleId
        );
        setIsFavorite(isFavorited);
      }
    }
  }, [user]);

  if (!isLoading) {
    return (
      <IconButton
        onClick={toggleFavorite}
        color="secondary"
        sx={getStyles(type)}
      >
        {isFavorite ? (
          <FavoriteFullIcon fontSize={iconSize} />
        ) : (
          <FavoriteBorderIcon fontSize={iconSize} />
        )}
      </IconButton>
    );
  } else {
    return (
      <IconButton aria-label="loading" disabled sx={getStyles(type)}>
        <CircularProgress size={type == 'full' ? 24 : 16} />
      </IconButton>
    );
  }
}
