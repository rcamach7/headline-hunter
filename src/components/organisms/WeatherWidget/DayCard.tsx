import { Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';

import { Forecast } from '@/lib/types';

interface Props {
  dayForecast: Forecast;
}

export default function DayCard({ dayForecast }: Props) {
  const { date, avgtemp_f, maxtemp_f, mintemp_f, condition } = dayForecast;
  const iconUrl = `${window.location.protocol}${condition.icon}`;

  return (
    <Paper
      elevation={4}
      sx={{
        width: 'clamp(125, 100vw, 300px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        borderRadius: 4,
        border: 1,
      }}
    >
      <Typography variant="h6">
        {format(new Date(date), 'EEEE, d MMMM yyyy')}
      </Typography>
      <Image src={iconUrl} width={50} height={50} />
      <Typography variant="h6">
        {maxtemp_f}°F / {mintemp_f}°F
      </Typography>
      <Typography variant="h6">{condition.text}</Typography>
    </Paper>
  );
}
