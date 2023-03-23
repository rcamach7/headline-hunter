import { User } from '@/lib/types';
import * as React from 'react';
import { Typography, MenuItem } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
      {router.pathname !== '/news' && (
        <MenuItem>
          <Typography textAlign="center">
            <Link href="/news">
              <a style={{ textDecoration: 'none', color: 'inherit' }}>News</a>
            </Link>
          </Typography>
        </MenuItem>
      )}
      <MenuItem>
        <Typography textAlign="center">
          <Link href="/account">
            <a style={{ textDecoration: 'none', color: 'inherit' }}>Account</a>
          </Link>
        </Typography>
      </MenuItem>
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
