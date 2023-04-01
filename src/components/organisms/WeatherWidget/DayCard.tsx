import { Box } from '@mui/material';

import { Weather } from '@/lib/types';

interface Props {
  dayForecast: Weather['forecastsByDay'];
}

export default function DayCard({ dayForecast }: Props) {
  return <Box></Box>;
}
