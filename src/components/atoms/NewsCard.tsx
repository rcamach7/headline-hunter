import {} from '@mui/material';
import { Article } from '@/lib/types';

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  return (
    <>
      <p>{article.title}</p>
    </>
  );
}
