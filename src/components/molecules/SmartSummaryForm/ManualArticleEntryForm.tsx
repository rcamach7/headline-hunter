import { Box, Button, Typography, TextField } from '@mui/material';
import Image from 'next/image';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  articleContent: string;
  cleanArticleContent: (content: string) => void;
  articleTitle: string;
  articleURL: string;
}

export default function ManualArticleEntryForm({
  handleSubmit,
  articleContent,
  cleanArticleContent,
  articleTitle,
  articleURL,
}: Props) {
  return (
    <Box sx={style}>
      <Box>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          Smart Summary
        </Typography>
        <Typography color="secondary.main" textAlign="center" gutterBottom>
          Unable to automatically generate summary. To create a smart summary,
          manually copy and paste the article content from the link below.
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
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5, pt: 1 }}>
        <Image
          src="/logos/chatgpt.webp"
          width={15}
          height={10}
          alt="ChatGPT Log"
        />
        <Typography sx={{ fontSize: 12 }} color="secondary.main">
          Powered By OpenAIs ChatGPT 3.5
        </Typography>
      </Box>
    </Box>
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
