import { useState } from 'react';
import { default_categories } from '@/lib/categories';
import { TextField, Autocomplete, Box } from '@mui/material';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
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
      <SearchIcon />
      <Autocomplete
        id="search-categories"
        freeSolo
        sx={{ flexGrow: 1, pl: 0.5 }}
        options={default_categories}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          } else {
            return option.title;
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
          <li {...props}>
            <Link href={`/news/${option.slug}`}>
              <a style={{ color: 'inherit', textDecoration: 'none' }}>
                {option.title}
              </a>
            </Link>
          </li>
        )}
      />
    </Box>
  );
}
