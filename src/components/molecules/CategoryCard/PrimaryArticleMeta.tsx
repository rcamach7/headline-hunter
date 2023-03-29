import { Box, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';
import React from 'react';
import { formatDistance } from 'date-fns';

import { removeNewsSource } from '@/lib/helpers';

interface Props {
  title: string;
  publishedAt: Date;
  sourceName: string;
}

export default function PrimaryArticleMeta({
  publishedAt,
  title,
  sourceName,
}: Props) {
  return (
    <Textfit
      mode="multi"
      max={40}
      min={1}
      style={{ width: '100%', paddingBottom: '.25em' }}
    >
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{ fontWeight: 'bold' }}
      >
        {removeNewsSource(title)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '14px' }}
          gutterBottom
        >
          {sourceName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '14px' }}
          gutterBottom
        >
          {formatDistance(new Date(publishedAt), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </Box>
    </Textfit>
  );
}
