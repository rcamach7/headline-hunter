import { Typography, MenuItem, Divider } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (user?.savedArticles) {
      const dynamicCategories = categories
        .filter(
          (category) =>
            !user.savedCategories.some(
              (savedCategory) => savedCategory.id === category.id
            )
        )
        .sort(() => Math.random() - Math.random())
        .slice(0, 7);

      setDynamicCategories(dynamicCategories);
    } else {
      const dynamicCategories = categories
        .sort(() => Math.random() - Math.random())
        .slice(0, 7);
      setDynamicCategories(dynamicCategories);
    }
  }, [user, categories]);

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
        </>
      )}

      <MenuItem disabled={true} sx={{ py: 0 }} dense>
        <Typography textAlign="center" fontSize={12} sx={{ p: 0 }}>
          Explore
        </Typography>
      </MenuItem>
      {dynamicCategories.map((category) => (
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
