import { Box, IconButton, Button } from '@mui/material';
import {
  SmartToy as SmartToyIcon,
  ThumbDownOffAlt as ThumbDownOffAltIcon,
} from '@mui/icons-material';

import FavoriteArticleButton from './FavoriteArticleButton';

interface Props {
  type: 'full' | 'condensed';
  articleId: string;
}

export default function ArticleActionButtons({ type, articleId }: Props) {
  if (type === 'condensed') {
    return (
      <Box
        sx={{
          display: 'inline',
        }}
      >
        <FavoriteArticleButton articleId={articleId} type="condensed" />
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

        <FavoriteArticleButton articleId={articleId} type="full" />
        <IconButton color="secondary" aria-label="dislike">
          <ThumbDownOffAltIcon />
        </IconButton>
      </Box>
    );
  }
}
