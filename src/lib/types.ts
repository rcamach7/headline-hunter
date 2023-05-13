/**
 * @file Types for frontend
 */

export type Category = {
  id: string;
  lastUpdated: Date | string;
  type: string;
};

export type Article = {
  id: string;
  insertedAt: Date;
  author: string;
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: Date;
  sourceId?: string;
  sourceName?: string;
};

export type User = {
  name?: string;
  email?: string;
  image?: string;
  savedArticles: Article[];
  savedCategories: Category[];
  dislikedCategories: Category[];
};

export type CategoryArticles = Category & { articles: Article[] };

export type Forecast = {
  date: string;
  maxtemp_f: number;
  mintemp_f: number;
  avgtemp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
};

export type Weather = {
  country: string;
  name: string;
  region: string;
  forecastsByDay: Forecast[];
};

export type AlertMessage = {
  id?: string;
  severity: 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined' | 'standard';
  text: string;
  alertTitle?: string;
};
