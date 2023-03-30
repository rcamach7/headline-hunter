import { Box, IconButton, Button } from '@mui/material';
import {
  BookmarkBorder as BookmarkBorderIcon,
  SmartToy as SmartToyIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
} from '@mui/icons-material';

interface Props {
  articleId: string;
}

export default function FavoriteArticle({ articleId }: Props) {
  return (
    <IconButton color="secondary" sx={{ padding: 0, ml: 0.5 }}>
      <FavoriteBorderIcon sx={{ fontSize: 16 }} />
    </IconButton>
  );
}
