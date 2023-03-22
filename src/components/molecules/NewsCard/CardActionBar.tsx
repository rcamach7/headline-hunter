import { Button, CardActions, IconButton } from '@mui/material';
import * as React from 'react';
import {
  FavoriteBorder as FavoriteIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
} from '@mui/icons-material';

export default function CardActionBar() {
  return (
    <CardActions sx={{ display: 'flex' }}>
      <Button variant="outlined">Smart Summary</Button>

      <IconButton aria-label="save" sx={{ marginLeft: 'auto !important' }}>
        <FavoriteIcon sx={{ color: 'text.primary' }} />
      </IconButton>
      <IconButton aria-label="dislike">
        <ThumbDownOffAltIcon sx={{ color: 'text.primary' }} />
      </IconButton>
    </CardActions>
  );
}
