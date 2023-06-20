import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  MenuItem,
} from '@mui/material';

import { User } from '@/lib/types';
import FavoritedCategories from './FavoritedCategories';

interface Props {
  user: User | null;
}

export default function Settings({ user }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!user) {
    return null;
  } else {
    return (
      <>
        <MenuItem onClick={handleClickOpen}>
          <Typography textAlign="center">Settings</Typography>
        </MenuItem>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title" textAlign="center">
            Settings
          </DialogTitle>
          <DialogContent>
            <FavoritedCategories user={user} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
