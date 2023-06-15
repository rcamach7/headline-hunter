import * as React from 'react';
import { Dialog, Typography, MenuItem } from '@mui/material';

import { User } from '@/lib/types';

interface Props {
  user: User | null;
}

export default function ExternalArticleSummary({ user }: Props) {
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
          <Typography textAlign="center">User Favorites</Typography>
        </MenuItem>
        <Dialog open={open} onClose={handleClose}>
          <p>User Favorite Modal</p>
        </Dialog>
      </>
    );
  }
}
