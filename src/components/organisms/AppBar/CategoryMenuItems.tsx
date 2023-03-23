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
    id: '4c57b69b-c496-4c79-be6d-966b9094a630',
    type: 'Business',
  },
  {
    id: '546eeaad-af67-45b7-ba7b-ba6cd04c9ba6',
    type: 'Entertainment',
  },
  {
    id: '169e2a7a-e726-4533-9512-8d8a4c8e435c',
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
