import { useState } from 'react';
import { default_categories } from '@/lib/categories';
import { TextField, Autocomplete, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
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
      }}
    >
      <SearchIcon />
      <Autocomplete
        id="search-categories"
        freeSolo
        options={default_categories.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        sx={{ flexGrow: 1, pl: 0.5 }}
      />
    </Box>
  );
}
