import { Box, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import InformationalMOdal from './InformationalModel';
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
          <InformationalMOdal
            onClose={onClose}
            title={articleTitle}
            body={summary}
            showGPT={true}
          />
        )}
        {isRateLimited && (
          <InformationalMOdal
            onClose={onClose}
            title="Personal Call Limit Reached"
            body="You have reached your individual hourly limit of 10 API requests. Please wait for the next hour before making additional requests. This limit helps ensure fair usage for all users. Thank you for your understanding and cooperation!"
          />
        )}
        {dailyLimitReached && (
          <InformationalMOdal
            onClose={onClose}
            title="Service limit reached"
            body="The app has reached its global daily limit for API calls. The quota will reset tomorrow, allowing the app to function normally again. Please check back tomorrow to continue using the app. We appreciate your understanding and patience!"
          />
        )}
      </Box>
    </Modal>
  );
}
