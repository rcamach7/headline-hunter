import { Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';

import { Forecast } from '@/lib/types';

interface Props {
  dayForecast: Forecast;
}

export default function DayCard({ dayForecast }: Props) {
  const { date, maxtemp_f, condition } = dayForecast;
  const iconUrl = `${window.location.protocol}${condition.icon}`;

  return (
    <Paper
      elevation={24}
      sx={{
        width: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0.5,
        borderRadius: 2,
        border: 1,
        borderColor: '#7e736c',
      }}
    >
      <Typography
        sx={{
          borderColor: '#7e736c',
          borderBottom: '1px solid #7e736c',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {format(new Date(date), 'EEEE, d MMMM yyyy')}
      </Typography>
      <Image alt="Weather Icon" src={iconUrl} width={65} height={65} />
      <Typography variant="h6" sx={{ fontSize: 16 }}>
        {maxtemp_f}°F
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 16 }}>
        {condition.text}
      </Typography>
    </Paper>
  );
}
