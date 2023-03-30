import { IconButton, CircularProgress } from '@mui/material';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

import { useUserContext } from '@/context/UserContext';

interface Props {
  articleId: string;
}

export default function FavoriteArticle({ articleId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, refreshUser } = useUserContext();

  // async function toggleFavorite() {
  //   try {
  //     setIsLoading(true);
  //     await axios.post('/api/user/favoriteCategories/' + categoryId);
  //     refreshUser();
  //     setIsFavorite((prev) => !prev);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error toggling favorite category:', error);
  //   }
  // }

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

  if (isLoading) {
    return (
      <IconButton aria-label="loading" disabled>
        <CircularProgress size={24} />
      </IconButton>
    );
  } else {
    return (
      <IconButton color="secondary" sx={{ padding: 0, ml: 0.5 }}>
        {isFavorite ? (
          <FavoriteFullIcon sx={{ fontSize: 16 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 16 }} />
        )}
      </IconButton>
    );
  }
}
