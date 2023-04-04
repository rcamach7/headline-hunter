import { Box, IconButton, Button } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';

import FavoriteArticleButton from './FavoriteArticleButton';

interface Props {
  type: 'full' | 'condensed';
  articleId: string;
  articleTitle: string;
  articleURL: string;
  openSmartSummaryModal: (articleTitle: string, articleURL: string) => void;
}

export default function ArticleActionButtons({
  type,
  articleId,
  articleTitle,
  articleURL,
  openSmartSummaryModal,
}: Props) {
  if (type === 'condensed') {
    return (
      <Box
        component="span"
        sx={{
          display: 'inline',
        }}
      >
        <FavoriteArticleButton articleId={articleId} type="condensed" />
        <IconButton
          onClick={() => openSmartSummaryModal(articleTitle, articleURL)}
          color="secondary"
          sx={{ padding: 0, ml: 0.5 }}
        >
          <SmartToyIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    );
  } else {
    return (
      <Box
        component="span"
        sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}
      >
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SmartToyIcon />}
          onClick={() => openSmartSummaryModal(articleTitle, articleURL)}
        >
          Smart Summary
        </Button>

        <FavoriteArticleButton articleId={articleId} type="full" />
      </Box>
    );
  }
}
