<p align="center">
<a href="">
<img width="300" src="[public/logos/hh_long.svg](https://res.cloudinary.com/de2ymful4/image/upload/v1680822430/main-portfolio/projects/a_fhaj2z.png)">
</a>
</p>
Check out Headline Hunter, a cool news site that brings together stories from lots of different sources and puts them all in one place. We use ChatGPT to allow you to summarize each article, so you can stay informed even when you're in a hurry!

![Website Image Preview](/a.png)

## Key Features ✨

- Enhanced SEO by taking advantage of Next.js' static generation and server-side rendering capabilities
- Utilized NextAuth to authenticate users and store their data in a MongoDB database
- Created a fully responsive design that works on all devices and screen sizes
- Incorporated a atomic design pattern that allows for easy scaling and maintenance

## How to install and run?

To get this app up and running, you'll need to set up a few things in your .env file. Specifically, make sure to include the following environments and variables:

- DATABASE_URL (We use PostgreSQL + Prisma), GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, and NEXTAUTH_URL, NEWS_API_KEY, WEATHER_API_KEY, OPEN_AI_KEY

```bash
# Clone this repository
  git clone https://github.com/rcamach7/headline-hunter
  cd headline-hunter

#  Run local server
  yarn install
  yarn dev
```
