import { useState } from 'react';
import { Typography, MenuItem } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { User } from '@/lib/types';
import ExternalArticleSummary from './ExternalArticleSummary';
import { Settings } from './Settings';

interface Props {
  user: User | null;
  toggleWeatherWidget: () => void;
  userPreferences: {
    showWeatherWidget: boolean;
  };
}

export default function UserMenuItems({
  user,
  toggleWeatherWidget,
  userPreferences,
}: Props) {
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
      <ExternalArticleSummary />
      <Settings
        user={user}
        toggleWeatherWidget={toggleWeatherWidget}
        userPreferences={userPreferences}
      />
      {user ? (
        <MenuItem onClick={() => signOut()}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={() => signIn()}>
          <Typography textAlign="center">Sign In</Typography>
        </MenuItem>
      )}
    </>
  );
}
