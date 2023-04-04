import { Box, Button, Typography, Modal } from '@mui/material';

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
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ style }}>
        <Typography>{articleTitle}</Typography>
        <Typography>{articleURL}</Typography>
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
