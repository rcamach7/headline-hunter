import { useState } from 'react';
import { Typography, MenuItem } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { User } from '@/lib/types';
import ExternalArticleSummary from './ExternalArticleSummary';
import UserFavoritesModal from './UserFavoritesModal';

interface Props {
  user: User | null;
}

export default function UserMenuItems({ user }: Props) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== '/' && (
        <MenuItem>
          <Typography textAlign="center">
            <Link href="/">
              <a style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            </Link>
          </Typography>
        </MenuItem>
      )}
      {user ? (
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => signIn()}>
          <Typography textAlign="center">Sign In</Typography>
        </MenuItem>
      )}
      <ExternalArticleSummary />
      <UserFavoritesModal user={user} />
    </>
  );
}
