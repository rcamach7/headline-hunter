import { Box, IconButton, Button } from '@mui/material';
import {
  BookmarkBorder as BookmarkBorderIcon,
  SmartToy as SmartToyIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteFullIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
} from '@mui/icons-material';

interface Props {
  type: 'full' | 'condensed';
}

export default function ArticleActionButtons({ type }: Props) {
  if (type === 'condensed') {
    return (
      <Box
        sx={{
          display: 'inline',
        }}
      >
        <IconButton color="secondary" sx={{ padding: 0, ml: 0.5 }}>
          <FavoriteBorderIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton color="secondary" sx={{ padding: 0, ml: 0.5 }}>
          <SmartToyIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SmartToyIcon />}
        >
          Smart Summary
        </Button>

        <IconButton
          color="secondary"
          aria-label="save"
          sx={{ marginLeft: 'auto !important' }}
        >
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="dislike">
          <ThumbDownOffAltIcon />
        </IconButton>
      </Box>
    );
  }
}
