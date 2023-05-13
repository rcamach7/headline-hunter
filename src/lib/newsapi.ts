import axios from 'axios';

type TopHeadlineParams = {
  query: string;
  country?: string;
  pageSize: number;
};

type EverythingParams = {
  query: string;
  pageSize: number;
  to: Date;
  from: Date;
};

export default class NewsAPI {
  private static _URL = 'https://newsapi.org/v2';
  private readonly _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  async getTopHeadlines({ query, country, pageSize }: TopHeadlineParams) {
    const endpoint = `${NewsAPI._URL}/top-headlines?apiKey=${
      this._apiKey
    }&q=${encodeURIComponent(query)}&pageSize=${pageSize}${
      country ? `&country=${country}` : ''
    }}`;

    try {
      const response = await axios.get(endpoint);

      return response.data;
    } catch (error) {
      console.error('Failed to fetch top headlines:', error);
      throw new Error('Failed to fetch top headlines.');
    }
  }

  async getEverything({ query, pageSize, to, from }: EverythingParams) {
    const toFormatted = to.toISOString().split('T')[0];
    const fromFormatted = from.toISOString().split('T')[0];

    const endpoint = `${NewsAPI._URL}/everything?apiKey=${
      this._apiKey
    }&q=${encodeURIComponent(query)}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(endpoint);

      return response.data;
    } catch (error) {
      console.error('Failed to fetch news articles:', error);
      throw new Error('Failed to fetch news articles.');
    }
  }
}
