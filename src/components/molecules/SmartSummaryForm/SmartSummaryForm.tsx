import { Box, Button, Typography, Modal, TextField } from '@mui/material';

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
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Article Content"
            multiline
            rows={4}
            variant="outlined"
            sx={{ width: '100%' }}
            inputProps={{
              minLength: 100,
              maxLength: 1000,
            }}
            required
          />

          <Button variant="outlined" type="submit">
            Generate Summary
          </Button>
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
