import { default_categories } from '@/lib/categories';
import { TextField, Autocomplete } from '@mui/material';

export default function Search() {
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      options={default_categories.map((option) => option.title)}
      renderInput={(params) => <TextField {...params} label="freeSolo" />}
    />
  );
}
