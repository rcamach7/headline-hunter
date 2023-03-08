import { default_categories } from '@/lib/categories';
import { TextField, Autocomplete, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'auto',
      }}
    >
      <SearchIcon />
      <Autocomplete
        id="free-solo-demo"
        options={default_categories.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="Search..." variant="standard" />
        )}
      />
    </Box>
  );
}
