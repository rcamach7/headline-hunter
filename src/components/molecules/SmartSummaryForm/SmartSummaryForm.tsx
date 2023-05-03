import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

import SummaryModal from './SummaryModal';
import { useLoadingContext } from '@/context/LoadingContext';
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
  const { setIsPageLoading } = useLoadingContext();

  const [manualArticleEntry, setManualArticleEntry] = useState<boolean>(false);
  const [articleContent, setArticleContent] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  function cleanArticleContent(content: string) {
    const cleanedContent = content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .replace(/https?:\/\/[^\s]+/g, '');
    setArticleContent(cleanedContent);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPageLoading(true);
    try {
      const { data } = await axios.post('/api/smart-summary', {
        article: articleContent,
      });
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
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
        console.log(error);
        setManualArticleEntry(true);
      }
      setIsPageLoading(false);
    };

    fetchArticleSmartSummary();
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
        <SummaryModal summary={summary} articleTitle={articleTitle} />
      </Box>
    </Modal>
  );
}
