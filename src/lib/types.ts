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
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  sourceId;
  string;
  sourceName: string;
  categories: Category[];
};

export type User = {
  name?: string;
  email?: string;
  image?: string;
};

export type Preferences = {
  savedArticles: Article[];
  savedCategories: Category[];
  dislikedCategories: Category[];
};

export {};
