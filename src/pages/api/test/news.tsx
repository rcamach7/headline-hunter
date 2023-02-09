import Newsapi from 'newsapi';

export default async function handler(req, res) {
  const newsClient = new Newsapi(process.env.NEWS_API_KEY);

  newsClient.v2
    .topHeadlines({
      category: 'politics',
      language: 'en',
      country: 'us',
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
