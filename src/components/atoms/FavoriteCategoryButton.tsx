import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import axios from 'axios';

interface Props {
  categoryId: string;
}

export default function FavoriteCategoryButton({ categoryId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUserContext();

  async function toggleFavorite() {
    try {
      await axios.post('/api/user/favoriteCategories/' + categoryId);
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
      <Button variant="contained" color="secondary" onClick={toggleFavorite}>
        Remove from Favorites
      </Button>
    );
  } else {
    return (
      <Button variant="contained" color="primary" onClick={toggleFavorite}>
        Add to Favorites
      </Button>
    );
  }
}
