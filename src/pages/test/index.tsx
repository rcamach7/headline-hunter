import { useLoadingContext } from '@/context/LoadingContext';
import { useEffect } from 'react';
const { Readability } = require('@mozilla/readability');
import axios from 'axios';

export default function Test() {
  const { setIsPageLoading } = useLoadingContext();

  useEffect(() => {
    const fetchData = async (url: string) => {
      const data = await getWebsiteData(url);
      console.log(data);
    };
    setIsPageLoading(false);

    fetchData(
      'https://www.theguardian.com/culture/2023/apr/28/the-guide-ai-film-joe-russo'
    );
  }, []);

  return <>Test</>;
}

async function getWebsiteData(url: string) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const article = await axios.get(`/api/test/proxy?url=${encodedUrl}`);
    const parser = new DOMParser();

    const doc = parser.parseFromString(article.data, 'text/html');
    const articleContent = new Readability(doc).parse();

    return articleContent.textContent;
  } catch (error) {
    console.log(error);
  }
}
