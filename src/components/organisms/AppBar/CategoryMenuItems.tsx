import * as React from 'react';
import { Typography, MenuItem, Divider } from '@mui/material';
import { User } from '@/lib/types';
import Link from 'next/link';

interface Props {
  user: User;
  handleCloseNavMenu: () => void;
}

const defaultCategories = [
  {
    id: '77d0b6a2-4685-4a5e-9d60-87e05fa5356e',
    type: 'Business',
  },
  {
    id: '2c6a96f2-25cc-4afd-b78a-eeeb54e58847',
    type: 'Entertainment',
  },
  {
    id: '928a68a2-7387-4305-b8a8-870ba0929df6',
    type: 'Sports',
  },
  {
    id: '44d25b34-6778-41cf-a09b-75f7fba28fec',
    type: 'Technology',
  },
  {
    id: 'b1dfe2c4-14e0-4a14-8ff4-ed8a7df49601',
    type: 'Politics',
  },
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
        <MenuItem key={category.id} onClick={handleCloseNavMenu}>
          <Link href={`/news/category/${category.id}`} passHref>
            <Typography
              sx={{ color: 'text.primary', textDecoration: 'none' }}
              variant="body2"
            >
              {category.type}
            </Typography>
          </Link>
        </MenuItem>
      ))}
    </>
  );
}
