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
        width: 'clamp(125, 100vw, 300px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        borderRadius: 4,
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
        }}
      >
        {format(new Date(date), 'EEEE, d MMMM yyyy')}
      </Typography>
      <Image src={iconUrl} width={75} height={75} />
      <Typography variant="h6">{maxtemp_f}°F</Typography>
      <Typography variant="h6">{condition.text}</Typography>
    </Paper>
  );
}
