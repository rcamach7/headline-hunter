import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

import SummaryModal from './SummaryModal';
import { useLoadingContext } from '@/context/LoadingContext';

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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setIsPageLoading(false);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Box>
          <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            Smart Summary
          </Typography>
          <Typography color="secondary.main" textAlign="center" gutterBottom>
            To create a smart summary, copy and paste the article content from
            the link below.
          </Typography>
          <Typography textAlign="center">
            <a
              style={{ color: 'inherit' }}
              href={articleURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {articleTitle}
            </a>
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-multiline-static"
            label="Article Content"
            multiline
            rows={4}
            variant="outlined"
            sx={{ width: '100%' }}
            value={articleContent}
            onChange={(e) => cleanArticleContent(e.target.value)}
            inputProps={{
              minLength: 100,
              maxLength: 4000,
            }}
            required
          />

          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ fontSize: 12, textAlign: 'right' }}
          >
            {articleContent.length}/4000 characters
          </Typography>

          <Button variant="outlined" type="submit" sx={{ mt: 1 }}>
            Generate Summary
          </Button>
          <SummaryModal summary={summary} />
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, pt: 1 }}>
          <Image src="/logos/chatgpt.webp" width={15} height={10} />
          <Typography sx={{ fontSize: 12 }}>Powered By ChatGPT 3.5</Typography>
        </Box>
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
