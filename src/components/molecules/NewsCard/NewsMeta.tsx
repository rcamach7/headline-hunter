import { Typography, Box } from '@mui/material';
import * as React from 'react';
import { formatDistance } from 'date-fns';

interface Props {
  sourceName: string;
  publishedAt: Date;
}

export default function CardActionBar({ sourceName, publishedAt }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        px: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {sourceName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDistance(new Date(publishedAt), new Date(), {
          addSuffix: true,
        })}
      </Typography>
    </Box>
  );
}
