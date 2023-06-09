import { Box, Typography, Chip } from '@mui/material';
import { Textfit } from 'react-textfit';
import React from 'react';
import { formatDistance, intervalToDuration, formatDuration } from 'date-fns';

import { removeNewsSource, shortenParagraph } from '@/lib/helpers';
import { Article } from '@/lib/types';
import { ArticleActionButtons } from '@/components/molecules';

interface Props {
  article: Article;
  openSmartSummaryModal: (articleTitle: string, articleURL: string) => void;
}

export default function PrimaryArticleMeta({
  article,
  openSmartSummaryModal,
}: Props) {
  const { id, description, title, publishedAt, sourceName, url } = article;

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

  function isLessThanTwoDaysOld() {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const duration = intervalToDuration({ start: publishedDate, end: now });

    if (duration.days && duration.days >= 2) {
      return false;
    } else {
      return true;
    }
  }

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
          component="div"
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '14px' }}
          gutterBottom
        >
          {isLessThanTwoDaysOld() ? (
            <Chip
              label="New Article"
              variant="outlined"
              color="secondary"
              size="small"
            />
          ) : (
            generateTimeSincePublished()
          )}
        </Typography>
      </Box>
      <ArticleActionButtons
        articleTitle={title}
        articleURL={url}
        type="full"
        articleId={id}
        openSmartSummaryModal={openSmartSummaryModal}
      />
    </Textfit>
  );
}
