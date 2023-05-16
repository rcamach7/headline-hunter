import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

import { InformationalModal } from '@/components/atoms';
import { useLoadingContext, useUserContext } from '@/context';

export default function ExternalArticleSummary() {
  const [open, setOpen] = React.useState(false);
  const [articleURL, setArticleURL] = React.useState<string>('');

  const { isRateLimited, recordRequest } = useUserContext();
  const { setIsPageLoading } = useLoadingContext();

  const [response, setResponse] = React.useState<{
    title: string;
    body: string;
  }>({
    title: '',
    body: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleURL(event.target.value);
  };

  const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
  const handleSummarizeClick = () => {
    if (isRateLimited) {
      setResponse({
        title: 'Personal Call Limit Reached',
        body: 'You have reached your individual hourly limit of 10 API requests. Please wait for the next hour before making additional requests. This limit helps ensure fair usage for all users. Thank you for your understanding and cooperation!',
      });
      return;
    } else if (URL_REGEX.test(articleURL)) {
      fetchArticleSmartSummary();
    } else {
      setResponse({
        title: 'Invalid URL',
        body: 'Please enter a valid URL.',
      });
    }
  };

  const fetchArticleSmartSummary = async () => {
    setIsPageLoading(true);
    try {
      const { data } = await axios.post('/api/smart-summary', {
        url: articleURL,
      });
      setResponse({ title: articleURL, body: data });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setResponse({
          title: 'Service limit reached',
          body: 'The app has reached its global daily limit for API calls. The quota will reset tomorrow, allowing the app to function normally again. Please check back tomorrow to continue using the app. We appreciate your understanding and patience!',
        });
      } else {
        setResponse({
          title: 'Error',
          body: 'An error occurred while fetching the article summary. Please try again later.',
        });
      }
      console.error(error);
    }
    setIsPageLoading(false);
    recordRequest();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Typography textAlign="center">Summarize External Article</Typography>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent sx={{ borderRadius: 1 }}>
          <DialogContentText color="secondary">
            To summarize an external article, please enter the URL below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            type="url"
            fullWidth
            color="secondary"
            value={articleURL}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSummarizeClick}>Summarize</Button>
        </DialogActions>
      </Dialog>
      {response.body && (
        <InformationalModal
          title={response.title}
          body={response.body}
          onClose={() => {
            setResponse({ title: '', body: '' });
            handleClose();
          }}
        />
      )}
    </>
  );
}
