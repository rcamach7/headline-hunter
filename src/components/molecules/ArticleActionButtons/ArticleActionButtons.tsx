import { Box, IconButton, Button } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';

import FavoriteArticleButton from './FavoriteArticleButton';
import { useUserContext } from '@/context/UserContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

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
  const { user, refreshUser } = useUserContext();
  const { addAlertMessage } = useFeedbackContext();

  const handleOpenSmartSummaryModal = () => {
    if (user) {
      openSmartSummaryModal(articleTitle, articleURL);
    } else {
      addAlertMessage({
        severity: 'error',
        text: 'Please sign in to use this feature',
        variant: 'filled',
      });
    }
  };

  if (type === 'condensed') {
    return (
      <Box
        component="span"
        sx={{
          display: 'inline',
        }}
      >
        <FavoriteArticleButton
          user={user}
          addAlertMessage={addAlertMessage}
          articleId={articleId}
          type="condensed"
          refreshUser={refreshUser}
        />
        <IconButton
          onClick={handleOpenSmartSummaryModal}
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
          onClick={handleOpenSmartSummaryModal}
        >
          Smart Summary
        </Button>

        <FavoriteArticleButton
          user={user}
          addAlertMessage={addAlertMessage}
          articleId={articleId}
          type="condensed"
          refreshUser={refreshUser}
        />
      </Box>
    );
  }
}
