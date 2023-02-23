export type User = {
  name: string;
  email: string;
  image: string;
};

export type Category = {
  id: string;
  type: string;
  lastUpdated: Date;
  articles: Article[];
};

export type Article = {
  id: string;
  insertedAt: Date;
  author: string;
  title: string;
  description?: string;
  contend?: string;
  url: string;
  urlToImage?: string;
  publishedAt: Date;
  sourceId?: string;
  sourceName?: string;
  categories: Category[];
};

export type Preferences = {
  savedArticles: Article[];
  savedCategories: Category[];
  dislikedCategories: Category[];
};

export type UserContextType = {
  user: User | null;
  preferences: Preferences | null;
  setPreferences: (preferences: Preferences) => void;
  isLoading: boolean;
};
