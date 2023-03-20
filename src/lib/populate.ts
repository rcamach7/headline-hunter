import { v4 } from 'uuid';
import prisma from '@/lib/prisma';

export async function populateCategories() {
  for (const category of default_categories) {
    const cat = await prisma.category.findFirst({
      where: {
        type: category.title,
      },
    });
    if (!cat) {
      const today = new Date(); // get today's date
      const oneDay = 24 * 60 * 60 * 1000; // calculate one day in milliseconds
      const yesterday = new Date(today.getTime() - oneDay); // subtract one day from today's date

      await prisma.category.create({
        data: {
          type: category.title,
          id: v4(),
          lastUpdated: yesterday,
        },
      });
    }
  }
}

export type Category = {
  title: string;
  slug: string;
};

export type Categories = Category[];

export const default_categories: Categories = [
  { title: 'World News', slug: 'world-news' },
  { title: 'U.S. News', slug: 'us-news' },
  { title: 'Business', slug: 'business' },
  { title: 'Technology', slug: 'technology' },
  { title: 'Entertainment', slug: 'entertainment' },
  { title: 'Sports', slug: 'sports' },
  { title: 'Health', slug: 'health' },
  { title: 'Science', slug: 'science' },
  { title: 'Education', slug: 'education' },
  { title: 'Politics', slug: 'politics' },
  { title: 'Environment', slug: 'environment' },
  { title: 'Weather', slug: 'weather' },
  { title: 'Crime', slug: 'crime' },
  { title: 'Religion', slug: 'religion' },
  { title: 'Travel', slug: 'travel' },
  { title: 'Food', slug: 'food' },
  { title: 'Arts', slug: 'arts' },
  { title: 'Fashion', slug: 'fashion' },
  { title: 'Music', slug: 'music' },
  { title: 'Movies', slug: 'movies' },
  { title: 'TV', slug: 'tv' },
  { title: 'Books', slug: 'books' },
  { title: 'Automotive', slug: 'automotive' },
  { title: 'Real Estate', slug: 'real-estate' },
  { title: 'Personal Finance', slug: 'personal-finance' },
  { title: 'Stocks', slug: 'stocks' },
  { title: 'Cryptocurrency', slug: 'cryptocurrency' },
  { title: 'Gaming', slug: 'gaming' },
  { title: 'Social Media', slug: 'social-media' },
  { title: 'Celebrities', slug: 'celebrities' },
  { title: 'Fitness', slug: 'fitness' },
  { title: 'Beauty', slug: 'beauty' },
  { title: 'Pets', slug: 'pets' },
  { title: 'DIY', slug: 'diy' },
  { title: 'Family', slug: 'family' },
  { title: 'Parenting', slug: 'parenting' },
  { title: 'Military', slug: 'military' },
  { title: 'Aviation', slug: 'aviation' },
  { title: 'Space', slug: 'space' },
  { title: 'Energy', slug: 'energy' },
  { title: 'Transportation', slug: 'transportation' },
  { title: 'Artificial Intelligence', slug: 'artificial-intelligence' },
  { title: 'Social Issues', slug: 'social-issues' },
  { title: 'History', slug: 'history' },
  { title: 'Psychology', slug: 'psychology' },
  { title: 'Philosophy', slug: 'philosophy' },
  { title: 'Art', slug: 'art' },
  { title: 'Design', slug: 'design' },
  { title: 'Architecture', slug: 'architecture' },
  { title: 'Engineering', slug: 'engineering' },
];
