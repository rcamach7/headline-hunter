import * as React from 'react';
import { Typography, MenuItem, Divider } from '@mui/material';
import { Preferences } from '@/context/UserContext.types';

interface Props {
  preferences: Preferences | null;
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
      {preferences?.savedCategories && (
        <MenuItem disabled={true} sx={{ py: 0, height: 10 }}>
          <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
            Favorite Categories
          </Typography>
        </MenuItem>
      )}

      <MenuItem disabled={true} sx={{ py: 0, height: 10 }}>
        <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
          Default Categories
        </Typography>
      </MenuItem>
      {defaultCategories.map((category) => (
        <MenuItem key={category} onClick={handleCloseNavMenu} sx={{ py: 0 }}>
          {category}
        </MenuItem>
      ))}
    </>
  );
}
