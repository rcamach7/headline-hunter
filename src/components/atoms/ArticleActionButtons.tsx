import { Box, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function ArticleActionButtons() {
  return (
    <Box sx={{ display: 'inline' }}>
      <IconButton sx={{ padding: 0, ml: 0.5, color: '#B6B5B5' }}>
        <BookmarkBorderIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <IconButton sx={{ padding: 0, ml: 0.5, color: '#B6B5B5' }}>
        <SmartToyIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}
