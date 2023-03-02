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
        <>
          <MenuItem disabled={true} sx={{ py: 0 }} dense>
            <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
              Favorited
            </Typography>
          </MenuItem>
          <Divider sx={{ background: '#7e736c' }} variant="middle" />
        </>
      )}

      <MenuItem disabled={true} sx={{ py: 0 }} dense>
        <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
          Default
        </Typography>
      </MenuItem>
      {defaultCategories.map((category) => (
        <MenuItem key={category} onClick={handleCloseNavMenu}>
          {category}
        </MenuItem>
      ))}
    </>
  );
}
