import { Box } from '@mui/material';

import { Forecast } from '@/lib/types';

interface Props {
  dayForecast: Forecast;
}

export default function DayCard({ dayForecast }: Props) {
  const { date, avgtemp_f, maxtemp_f, mintemp_f, condition } = dayForecast;
  return <Box></Box>;
}
