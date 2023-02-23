import * as React from 'react';
import { Typography, MenuItem, Divider } from '@mui/material';
import { Preferences } from '@/context/UserContext.types';

interface Props {
  preferences: Preferences;
  handleCloseNavMenu: () => void;
}

const defaultCategories = [
  'business',
  'entertainment',
  'sports',
  'technology',
  'politics',
];

export default function CategoryMenuItems({
  handleCloseNavMenu,
  preferences,
}: Props) {
  return (
    <>
      {/* <MenuItem
        disabled={true}
        key={page}
        onClick={handleCloseNavMenu}
        sx={{ background: 'background.default' }}
      >
        <Typography textAlign="center">{page}</Typography>
      </MenuItem>
      <Divider /> */}
    </>
  );
}
