import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { IconButton } from '@mui/material';
import axios from 'axios';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
} from '@mui/icons-material';

interface Props {
  categoryId: string;
}

export default function FavoriteCategoryButton({ categoryId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, refreshUser } = useUserContext();

  async function toggleFavorite() {
    try {
      await axios.post('/api/user/favoriteCategories/' + categoryId);
      refreshUser();
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error(error);
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

  if (isFavorite) {
    return (
      <IconButton aria-label="save" onClick={toggleFavorite}>
        <FavoriteFullIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    );
  } else {
    return (
      <IconButton aria-label="un-save" onClick={toggleFavorite}>
        <FavoriteBorderIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    );
  }
}
