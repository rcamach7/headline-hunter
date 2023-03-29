import { Box, Typography } from '@mui/material';
import { Textfit } from 'react-textfit';
import React from 'react';
import { formatDistance } from 'date-fns';

import { removeNewsSource, shortenParagraph } from '@/lib/helpers';

interface Props {
  title: string;
  publishedAt: Date;
  sourceName: string;
  description: string;
  url: string;
}

export default function PrimaryArticleMeta({
  publishedAt,
  title,
  sourceName,
  description,
  url,
}: Props) {
  return (
    <Textfit
      mode="multi"
      max={40}
      min={1}
      style={{ width: '100%', paddingLeft: '6px', paddingRight: '6px' }}
    >
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{ fontWeight: 'bold' }}
      >
        <a
          style={{ color: 'inherit', textDecoration: 'none' }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {removeNewsSource(title)}
        </a>
      </Typography>
      <Typography
        gutterBottom
        variant="body2"
        component="div"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {shortenParagraph(description, 25)}
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
