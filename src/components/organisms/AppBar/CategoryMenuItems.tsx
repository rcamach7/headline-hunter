import * as React from 'react';
import { Typography, MenuItem, Divider } from '@mui/material';
import { User } from '@/lib/types';
import Link from 'next/link';

interface Props {
  user: User;
  handleCloseNavMenu: () => void;
}

const defaultCategories = [
  'business',
  'entertainment',
  'sports',
  'technology',
  'politics',
];

export default function CategoryMenuItems({ handleCloseNavMenu, user }: Props) {
  return (
    <>
      {user?.savedCategories && (
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
          <Link href={`/news/${category}`} passHref>
            <Typography
              sx={{ color: 'text.primary', textDecoration: 'none' }}
              variant="body2"
            >
              {category}
            </Typography>
          </Link>
        </MenuItem>
      ))}
    </>
  );
}
