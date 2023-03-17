import { Button } from '@mui/material';
import { useState } from 'react';
import { Preferences } from '@/lib/types';

export default function FavoriteCategoryButton({
  category: string,
  preferences: Preferences,
}) {
  return <Button>Favorite Category</Button>;
}
