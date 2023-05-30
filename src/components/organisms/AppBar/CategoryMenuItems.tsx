import { Typography, MenuItem, Divider } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { User, Category } from '@/lib/types';
import { popularCategories } from '@/lib/data';

interface Props {
  user: User;
  handleCloseNavMenu: () => void;
  categories: Category[];
}

export default function CategoryMenuItems({
  handleCloseNavMenu,
  user,
  categories,
}: Props) {
  const [dynamicCategories, setDynamicCategories] = useState<Category[]>([]);

  return (
    <>
      {user?.savedCategories && (
        <>
          <MenuItem disabled={true} sx={{ py: 0 }} dense>
            <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
              Favorited
            </Typography>
          </MenuItem>
          {user.savedCategories.map((category) => (
            <MenuItem key={category.id} onClick={handleCloseNavMenu}>
              <Link href={`/category/${category.id}`} passHref>
                <Typography
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                  variant="body2"
                >
                  {category.type}
                </Typography>
              </Link>
            </MenuItem>
          ))}
          <Divider sx={{ background: '#7e736c' }} variant="middle" />
        </>
      )}

      <MenuItem disabled={true} sx={{ py: 0 }} dense>
        <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
          Popular
        </Typography>
      </MenuItem>
      {popularCategories.map((category) => (
        <MenuItem key={category.id} onClick={handleCloseNavMenu}>
          <Link href={`/category/${category.id}`} passHref>
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
