import { Modal, Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { removeNewsSource, shortenParagraph } from '@/lib/helpers';

interface Props {
  summary: string;
  articleTitle: string;
}

export default function SummaryModal({ summary, articleTitle }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (summary.length) {
      handleOpen();
    }
  }, [summary]);

  return (
    <>
      {summary.length ? (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ color: 'black', mt: 1 }}
        >
          View Summary
        </Button>
      ) : null}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{
              borderBottom: '1px solid gray',
              textAlign: 'center',
              mb: 1,
            }}
          >
            {shortenParagraph(removeNewsSource(articleTitle), 50)}
          </Typography>
          <Typography>{summary}</Typography>
          <Box sx={{ display: 'flex', gap: 0.5, pt: 2 }}>
            <Image src="/logos/chatgpt.webp" width={15} height={10} />
            <Typography sx={{ fontSize: 12 }} color="secondary.main">
              Powered By OpenAI's ChatGPT 3.5
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
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
