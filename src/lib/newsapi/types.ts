/**
 * The 2-letter ISO 3166-1 code of the country
 */
export type ApiNewsCountry =
  | 'ae'
  | 'ar'
  | 'at'
  | 'au'
  | 'be'
  | 'bg'
  | 'br'
  | 'ca'
  | 'ch'
  | 'cn'
  | 'co'
  | 'cu'
  | 'cz'
  | 'de'
  | 'eg'
  | 'fr'
  | 'gb'
  | 'gr'
  | 'hk'
  | 'hu'
  | 'id'
  | 'ie'
  | 'il'
  | 'in'
  | 'it'
  | 'jp'
  | 'kr'
  | 'lt'
  | 'lv'
  | 'ma'
  | 'mx'
  | 'my'
  | 'ng'
  | 'nl'
  | 'no'
  | 'nz'
  | 'ph'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'rs'
  | 'ru'
  | 'sa'
  | 'se'
  | 'sg'
  | 'si'
  | 'sk'
  | 'th'
  | 'tr'
  | 'tw'
  | 'ua'
  | 'us'
  | 've'
  | 'za';

/**
 * The 2-letter ISO-639-1 code of the language
 */
export type ApiNewsLanguage =
  | 'ar'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'he'
  | 'it'
  | 'nl'
  | 'no'
  | 'pt'
  | 'ru'
  | 'se'
  | 'ud'
  | 'zh';

/**
 * If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.
 */
export type ApiNewsResponseStatus = 'ok' | 'error';

/**
 * Possible category
 */
export type ApiNewsCategory =
  | 'business'
  | 'entertainment'
  | 'General'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'
  | 'environment'
  | 'politics'
  | 'gaming'
  | 'music'
  | 'travel'
  | 'tv-and-film'
  | 'world'
  | 'us'
  | 'books'
  | 'art'
  | 'automobiles'
  | 'culinary'
  | 'finance'
  | 'lifestyle'
  | 'real-estate'
  | 'fashion'
  | 'food';

/**
 * Possible options: relevancy, popularity, publishedAt.
 * - relevancy = articles more closely related to q come first.
 * - popularity = articles from popular sources and publishers come first.
 * - publishedAt = newest articles come first.
 */
export type ApiNewsSort = 'relevancy' | 'popularity' | 'publishedAt';

/**
 * Top headlines request parameters
 */
export interface INewsApiTopHeadlinesParams {
  /**
   * 	The 2-letter ISO 3166-1 code of the country you want to get headlines for.
   */
  country?: ApiNewsCountry;

  /**
   * The category you want to get headlines for.
   * Note: you can't mix this param with the sources param.
   */
  category?: ApiNewsCategory;

  /**
   * Array of identifiers for the news sources or blogs you want headlines from.
   * Use the /sources endpoint to locate these programmatically or look at the sources index.
   * Note: you can't mix this param with the country or category params.
   */
  sources?: Array<string>;

  /**
   * Keywords or a phrase to search for.
   */
  q?: string;

  /**
   * The number of results to return per page (request). 20 is the default, 100 is the maximum.
   */
  pageSize?: number;

  /**
   * Use this to page through the results if the total results found is greater than the page size.
   */
  page?: number;
}

/**
 * Response object for 'getTopHeadlines' and 'getEverything' endpoints.
 */
export interface INewsApiResponse {
  /**
   * If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.
   */
  status: ApiNewsResponseStatus;

  /**
   * Error code
   */
  code?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * The total number of results available for your request.
   */
  totalResults: number;

  /**
   * The results of the request.
   */
  articles: Array<INewsApiArticle>;
}

/**
 * The results of the request.
 */
export interface INewsApiArticle {
  /**
   * The identifier id and a display name.
   */
  source: INewsApiSource;

  /**
   * The author of the article.
   */
  author: string | null;

  /**
   * The headline or title of the article.
   */
  title: string;

  /**
   * A description or snippet from the article.
   */
  description: string | null;

  /**
   * The direct URL to the article.
   */
  url: string;

  /**
   * The URL to a relevant image for the article.
   */
  urlToImage: string | null;

  /**
   * The date and time that the article was published, in UTC (+000)
   */
  publishedAt: string;

  /**
   * The unformatted content of the article, where available. This is truncated to 200 chars.
   */
  content: string | null;

  /**
   * The category used to query the article.
   */
  category: ApiNewsCategory | null;
}

/**
 * The identifier id and a display name.
 */
export interface INewsApiSource {
  /**
   * The identifier id.
   */
  id: string | null;

  /**
   * Name for the source this article came from.
   */
  name: string;
}

/**
 * 'Everything' request parameters
 */
export interface INewsApiEverythingParams {
  /**
   * Keywords or phrases to search for in the article title and body. Advanced search is supported here:
   * - Surround phrases with quotes (") for exact match.
   * - Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
   * - Prepend words that must not appear with a - symbol. Eg: -bitcoin
   * - Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis.
   * Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
   */
  q?: string;

  /**
   * Keywords or phrases to search for in the article title only.
   * Advanced search is supported here:
   * - Surround phrases with quotes (") for exact match.
   * - Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
   * - Prepend words that must not appear with a - symbol. Eg: -bitcoin
   * - Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis.
   * Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
   */
  qInTitle?: string;

  /**
   * Array of identifiers for the news sources or blogs you want headlines from.
   * Use the /sources endpoint to locate these programmatically or look at the sources index.
   */
  sources?: Array<string>;

  /**
   * Array of domains ('eg bbc.co.uk', 'techcrunch.com', 'engadget.com') to restrict the search to.
   */
  domains?: Array<string>;

  /**
   * Array of domains ('eg bbc.co.uk', 'techcrunch.com', 'engadget.com') to remove from the results.
   */
  excludeDomains?: Array<string>;

  /**
   * A date and optional time for the oldest article allowed.
   * This should be in ISO 8601 format (e.g. 2020-06-06 or 2020-06-06T09:01:07)
   *
   *  Default: the oldest according to your plan.
   */
  from?: string;

  /**
   * A date and optional time for the newest article allowed.
   * This should be in ISO 8601 format (e.g. 2020-06-06 or 2020-06-06T09:01:07)
   *
   * Default: the newest according to your plan.
   */
  to?: string;

  /**
   * The 2-letter ISO-639-1 code of the language you want to get headlines for.
   * Possible options: 'ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh'.
   *
   * Default: all languages returned.
   */
  language?: ApiNewsLanguage;

  /**
   * The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
   * - relevancy = articles more closely related to q come first.
   * - popularity = articles from popular sources and publishers come first.
   * - publishedAt = newest articles come first.
   *
   * Default: publishedAt
   */
  sortBy?: ApiNewsSort;

  /**
   * The number of results to return per page. 20 is the default, 100 is the maximum.
   */
  pageSize?: number;

  /**
   * Use this to page through the results.
   */
  page?: number;
}

/**
 * 'Source' request parameters
 */
export interface INewsApiSourceParams {
  /**
   * Find sources that display news of this category.
   * Possible options: business entertainment general health science sports technology.
   *
   * Default: all categories.
   */
  category?: ApiNewsCategory;

  /**
   * Find sources that display news in a specific language.
   * Possible options: ar de en es fr he it nl no pt ru se ud zh.
   *
   * Default: all languages.
   */
  language?: ApiNewsLanguage;

  /**
   * Find sources that display news in a specific country.
   * Possible options: ae ar at au be bg br ca ch cn co cu cz de eg fr gb
   * gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro
   * rs ru sa se sg si sk th tr tw ua us ve za.
   *
   * Default: all
   */
  country?: ApiNewsCountry;
}

/**
 * Response object for 'getSources'.
 */
export interface INewsApiSourcesResponse {
  /**
   * If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.
   */
  status: ApiNewsResponseStatus;

  /**
   * Error code
   */
  code?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * The results of the request.
   */
  sources: Array<INewsApiSourceItem>;
}

/**
 * Source object
 */
export interface INewsApiSourceItem {
  /**
   * The identifier of the news source. You can use this with our other endpoints.
   */
  id: string;

  /**
   * The name of the news source.
   */
  name: string;

  /**
   * A description of the news source.
   */
  description: string;

  /**
   * The URL of the homepage.
   */
  url: string;

  /**
   * The type of news to expect from this news source.
   */
  category: ApiNewsCategory;

  /**
   * The language that this news source writes in.
   */
  language: ApiNewsLanguage;

  /**
   * The country this news source is based in (and primarily writes about).
   */
  country: ApiNewsCountry;
}
