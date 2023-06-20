import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  MenuItem,
  Switch,
  Box,
} from '@mui/material';

import { User } from '@/lib/types';
import FavoritedCategories from './FavoritedCategories';
import FavoritedArticles from './FavoritedArticles';

interface Props {
  user: User | null;
  toggleWeatherWidget: () => void;
  userPreferences: {
    showWeatherWidget: boolean;
  };
}

export default function Settings({
  user,
  toggleWeatherWidget,
  userPreferences,
}: Props) {
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
            <FavoritedCategories savedCategories={user.savedCategories} />
            <FavoritedArticles savedArticles={user.savedArticles} />
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                Weather Widget
              </Typography>
              <Switch
                checked={userPreferences.showWeatherWidget}
                onChange={toggleWeatherWidget}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
