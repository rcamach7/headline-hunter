/**
 * This file contains code from the ts-newsapi npm package.
 * The original code can be found at https://github.com/isolomak/ts-newsapi
 * The code is used under the MIT license.
 */
import fetch from 'node-fetch';
import querystring from 'querystring';
import {
  INewsApiEverythingParams,
  INewsApiResponse,
  INewsApiSourceParams,
  INewsApiSourcesResponse,
  INewsApiTopHeadlinesParams,
} from './types';
export * from './types';

/**
 * Breaking news headlines, and search for articles from news sources and blogs all over the web
 */
export default class NewsAPI {
  private static _URL = 'https://newsapi.org/v2';

  private readonly _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  /**
   * This endpoint provides live top and breaking headlines for a country,
   * specific category in a country, single source, or multiple sources.
   * You can also search with keywords.
   * Articles are sorted by the earliest date published first.
   * This endpoint is great for retrieving headlines for display on news tickers or similar.
   */
  public async getTopHeadlines(
    params: INewsApiTopHeadlinesParams = {}
  ): Promise<INewsApiResponse> {
    const endpointUrl = `${NewsAPI._URL}/top-headlines`;

    // validate sources param
    if (params.sources && params.sources.length) {
      if (params.country) {
        throw new Error(`you can't mix 'country' with the 'sources' param.`);
      }
      if (params.category) {
        throw new Error(`you can't mix 'category' with the 'sources' param.`);
      }
    }

    const queries: Array<string> = [
      querystring.stringify({ apiKey: this._apiKey }),
    ];

    if (params.q) {
      queries.push(querystring.stringify({ q: params.q }));
    }

    if (params.country) {
      queries.push(querystring.stringify({ country: params.country }));
    }

    if (params.category) {
      queries.push(querystring.stringify({ category: params.category }));
    }

    if (params.sources && params.sources.length) {
      queries.push(
        querystring.stringify({ sources: params.sources.join(',') })
      );
    }

    if (params.pageSize) {
      queries.push(querystring.stringify({ pageSize: params.pageSize }));
    }

    if (params.page) {
      queries.push(querystring.stringify({ page: params.page }));
    }

    const response = await fetch(`${endpointUrl}?${queries.join('&')}`);

    const data = await response.json();

    return data as INewsApiResponse;
  }

  /**
   * Search through millions of articles from over 50,000 large and small news sources and blogs.
   * This includes breaking news as well as lesser articles.
   * This endpoint suits article discovery and analysis,
   * but can be used to retrieve articles for display, too.
   */
  public async getEverything(
    params: INewsApiEverythingParams = {}
  ): Promise<INewsApiResponse> {
    const endpointUrl = `${NewsAPI._URL}/everything`;
    const queries: Array<string> = [
      querystring.stringify({ apiKey: this._apiKey }),
    ];

    if (params.q) {
      queries.push(querystring.stringify({ q: params.q }));
    }

    if (params.qInTitle) {
      queries.push(querystring.stringify({ qInTitle: params.qInTitle }));
    }

    if (params.sources && params.sources.length) {
      queries.push(
        querystring.stringify({ sources: params.sources.join(',') })
      );
    }

    if (params.domains && params.domains.length) {
      queries.push(
        querystring.stringify({ domains: params.domains.join(',') })
      );
    }

    if (params.excludeDomains && params.excludeDomains.length) {
      queries.push(
        querystring.stringify({
          excludeDomains: params.excludeDomains.join(','),
        })
      );
    }

    if (params.from) {
      queries.push(querystring.stringify({ from: params.from }));
    }

    if (params.to) {
      queries.push(querystring.stringify({ to: params.to }));
    }

    if (params.language) {
      queries.push(querystring.stringify({ language: params.language }));
    }

    if (params.sortBy) {
      queries.push(querystring.stringify({ sortBy: params.sortBy }));
    }

    if (params.pageSize) {
      queries.push(querystring.stringify({ pageSize: params.pageSize }));
    }

    if (params.page) {
      queries.push(querystring.stringify({ page: params.page }));
    }

    const response = await fetch(`${endpointUrl}?${queries.join('&')}`);

    const data = await response.json();

    return data as INewsApiResponse;
  }

  /**
   * This endpoint returns the subset of news publishers that top headlines are available from.
   * It's mainly a convenience endpoint that you can use to keep track of the publishers available on the API,
   * and you can pipe it straight through to your users.
   */
  public async getSources(
    params: INewsApiSourceParams = {}
  ): Promise<INewsApiSourcesResponse> {
    const endpointUrl = `${NewsAPI._URL}/sources`;

    const queries: Array<string> = [
      querystring.stringify({ apiKey: this._apiKey }),
    ];

    if (params.category) {
      queries.push(querystring.stringify({ category: params.category }));
    }

    if (params.language) {
      queries.push(querystring.stringify({ language: params.language }));
    }

    if (params.country) {
      queries.push(querystring.stringify({ country: params.country }));
    }

    const response = await fetch(`${endpointUrl}?${queries.join('&')}`);

    const data = await response.json();

    return data as INewsApiSourcesResponse;
  }
}
