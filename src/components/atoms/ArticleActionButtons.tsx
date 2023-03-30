import { Box, IconButton, Button } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SmartToyIcon from '@mui/icons-material/SmartToy';

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
        <IconButton sx={{ padding: 0, ml: 0.5, color: '#B6B5B5' }}>
          <BookmarkBorderIcon sx={{ fontSize: 16 }} />
        </IconButton>
        <IconButton sx={{ padding: 0, ml: 0.5, color: '#B6B5B5' }}>
          <SmartToyIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    );
  } else {
    return (
      <Box>
        <Button variant="outlined" startIcon={<BookmarkBorderIcon />}>
          Bookmark
        </Button>
        <Button variant="outlined" startIcon={<SmartToyIcon />}>
          Smart Summary
        </Button>
      </Box>
    );
  }
}
