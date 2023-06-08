import { Modal, Box, Typography } from '@mui/material';
import Image from 'next/image';

import { removeNewsSource, shortenParagraph } from '@/lib/helpers';

interface Props {
  title?: string;
  body: string;
  showGPT?: boolean;
  onClose: () => void;
}

export default function InformationalModal({
  title,
  body,
  showGPT = false,
  onClose,
}: Props) {
  return (
    <>
      <Modal open={true} onClose={onClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{
              borderBottom: '1px solid gray',
              textAlign: 'center',
              mb: 1,
              overflow: 'hidden',
            }}
          >
            {title
              ? shortenParagraph(removeNewsSource(title), 50)
              : 'Generated Summary:'}
          </Typography>
          <Typography color="secondary.main">{body}</Typography>
          {showGPT && (
            <Box sx={{ display: 'flex', gap: 0.5, pt: 2 }}>
              <Image
                src="/logos/chatgpt.webp"
                alt="ChatGPT Logo"
                width={15}
                height={10}
              />
              <Typography sx={{ fontSize: 12 }} color="secondary.main">
                Powered By OpenAIs ChatGPT 3.5
              </Typography>
            </Box>
          )}
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
  pt: 1,
  borderRadius: 1,
  border: 1,
  borderColor: 'secondary.main',
};
