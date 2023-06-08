import { Typography, Box } from '@mui/material';
import * as React from 'react';
import { formatDistance, intervalToDuration, formatDuration } from 'date-fns';

interface Props {
  sourceName: string;
  publishedAt: Date;
}

export default function CardActionBar({ sourceName, publishedAt }: Props) {
  function generateTimeSincePublished() {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const duration = intervalToDuration({ start: publishedDate, end: now });

    if (duration.days && duration.days >= 1) {
      return formatDistance(publishedDate, now, { addSuffix: true });
    } else {
      const formattedDuration = formatDuration(duration, {
        format: ['hours', 'minutes'],
      });

      return `${formattedDuration} ago`;
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {sourceName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {generateTimeSincePublished()}
      </Typography>
    </Box>
  );
}
