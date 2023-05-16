import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';

export default function ExternalArticleSummary() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Typography textAlign="center">Summarize External Article</Typography>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To summarize an external article, please enter the URL below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL"
            type="url"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Summarize</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
