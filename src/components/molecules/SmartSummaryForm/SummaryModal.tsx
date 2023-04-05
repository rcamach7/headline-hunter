import { Modal, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';

interface Props {
  summary: string;
}

export default function SummaryModal({ summary }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {summary && (
        <Button variant="contained" onClick={handleOpen}>
          View Summary
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>Hello World</Typography>
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
