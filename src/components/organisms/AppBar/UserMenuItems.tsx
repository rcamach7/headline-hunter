import { Typography, MenuItem } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';

import { User } from '@/lib/types';
import ExternalArticleSummary from './ExternalArticleSummary';
import Settings from './Settings';

interface Props {
  user: User | null;
}

export default function UserMenuItems({ user }: Props) {
  return (
    <>
      <ExternalArticleSummary />
      <Settings user={user} />
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
