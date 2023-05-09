import { Box, Modal, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import SummaryModal from './SummaryModal';
import { useLoadingContext, useUserContext } from '@/context';
import ManualArticleEntryForm from './ManualArticleEntryForm';

interface Props {
  articleTitle: string;
  articleURL: string;
  onClose: () => void;
}

export default function SmartSummaryForm({
  articleTitle,
  articleURL,
  onClose,
}: Props) {
  const { isRateLimited, recordRequest } = useUserContext();
  const { setIsPageLoading } = useLoadingContext();

  const [manualArticleEntry, setManualArticleEntry] = useState<boolean>(false);
  const [articleContent, setArticleContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [dailyLimitReached, setDailyLimitReached] = useState<boolean>(false);

  function cleanArticleContent(content: string) {
    const cleanedContent = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/https?:\/\/[^\s]+/g, '');
    setArticleContent(cleanedContent);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (isRateLimited) {
      return;
    }

    e.preventDefault();
    setIsPageLoading(true);
    try {
      const { data } = await axios.post('/api/smart-summary', {
        article: articleContent,
      });
      setSummary(data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setDailyLimitReached(true);
      } else {
        setManualArticleEntry(true);
      }
      console.error(error);
    }
    recordRequest();
    setIsPageLoading(false);
  };

  useEffect(() => {
    const fetchArticleSmartSummary = async () => {
      setIsPageLoading(true);
      try {
        const { data } = await axios.post('/api/smart-summary', {
          url: articleURL,
        });
        setSummary(data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setDailyLimitReached(true);
        } else {
          setManualArticleEntry(true);
        }
        console.error(error);
      }
      setIsPageLoading(false);
      recordRequest();
    };

    if (!isRateLimited) {
      fetchArticleSmartSummary();
    }
  }, []);

  return (
    <Modal open={true} onClose={onClose}>
      <Box>
        {manualArticleEntry && (
          <ManualArticleEntryForm
            handleSubmit={handleSubmit}
            articleContent={articleContent}
            cleanArticleContent={cleanArticleContent}
            articleTitle={articleTitle}
            articleURL={articleURL}
          />
        )}
        {summary && (
          <SummaryModal
            summary={summary}
            articleTitle={articleTitle}
            onClose={onClose}
          />
        )}
        {isRateLimited && (
          <Box sx={style}>
            <Typography>
              You have reached your hourly limit, please try again later
            </Typography>
          </Box>
        )}
        {dailyLimitReached && (
          <Box sx={style}>
            <Typography>
              Service has reached its daily limit, please try again tomorrow.
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 90vw, 500px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 5,
  border: 1,
  borderColor: 'secondary.main',
};
