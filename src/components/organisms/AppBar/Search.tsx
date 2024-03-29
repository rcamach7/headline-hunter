import { useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

import { Category } from '@/lib/types';

interface Props {
  categories: Category[];
}

export default function Search({ categories }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const searchStyle = {
    flexGrow: 1,
    display: 'flex',
    maxWidth: isFocused ? 250 : 200,
    ml: { xs: 'auto', sm: 0 },
    borderRadius: 1,
    p: 0.5,
    pl: 1,
    alignItems: 'center',
    backgroundColor: `${isFocused ? '#5D5D5D' : '#3b3b3b'}`,
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'text.primary',
    },
  };

  return (
    <Box sx={searchStyle}>
      <SearchIcon color="secondary" />
      <Autocomplete
        id="search-categories"
        freeSolo
        sx={{ flexGrow: 1, pl: 0.5 }}
        options={categories}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          } else {
            return option.type;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        renderOption={(props, option) => (
          <Link href={`/category/${option.id}`} key={option.id}>
            <a
              style={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'block',
                width: '100%',
              }}
            >
              <li {...props}>{option.type}</li>
            </a>
          </Link>
        )}
      />
    </Box>
  );
}
