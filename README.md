<p align="center">
<a href="">
<img width="300" src="public/logos/hh_long.svg">
</a>
</p>

<p align="center">
Check out Headline Hunter, a cool news site that brings together stories from lots of different sources and puts them all in one place. We use ChatGPT to allow you to summarize each article, so you can stay informed even when you're in a hurry!
</p>

<img src="https://res.cloudinary.com/de2ymful4/image/upload/v1687745105/presentation_final_xszheg.png">
<div align="center">

[Visit Headline Hunter](https://rcamach7.github.io/headline-hunter/)

</div>

## ✨ Key Features

- Implemented a user-friendly interface that displays a variety of news articles, allows users to save categories or articles, and generates smart summaries for articles using AI.
- Utilized Prisma and PostgreSQL to store user preferences, favorites, and saved articles, ensuring a seamless user experience across multiple devices.
- Integrated NextAuth to provide secure authentication and authorization for users, including social login options.
- Utilized Typescript to improve the codebase's readability, maintainability, and scalability.

## 💡 Technologies Used

| Category                 | Technologies (non extensive)                                                    |
| ------------------------ | ------------------------------------------------------------------------------- |
| Languages                | Typescript, and Javascript                                                      |
| Libraries and Frameworks | NextJS, React, NextAuth, MaterialUI, Date-FNS, Axios, UUID, Docker, and Railway |
| External APIs            | NewsAPI, WeatherAPI, and OpenAI's ChatGPT API                                   |
| Database and ORM         | PostgreSQL, Prisma                                                              |

<p align="center">
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1652491477/main-portfolio/tech-skills/typescript_v3ztli.png" width="40" height="40" alt="Typescript" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1660605410/main-portfolio/tech-skills/nextjs_mf7wiy.png" width="40" height="40" alt="NextJS" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1648514838/main-portfolio/animated-logos/react-anim_jqtsxo.gif" width="40" height="40" alt="React" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1655232059/main-portfolio/tech-skills/mui_p9jh58.png" width="40" height="40" alt="MaterialUI" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1680828474/main-portfolio/tech-skills/posgre_earnut.webp" width="40" height="40" alt="PostgreSQL" />
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1680828474/main-portfolio/tech-skills/prisma_pqxhjx.png" width="40" height="40" alt="Prisma">
  <img src="https://res.cloudinary.com/de2ymful4/image/upload/v1660605915/main-portfolio/tech-skills/nextAuth_crkr2f.png" width="40" height="40" alt="NextAuth">
</p>

## 💪 Challenges and Takeaways

- Learning SQL and Prisma to store user data in a PostgreSQL database was a challenge since these were all new technologies for me, but it was a great learning experience. I found creating relationships between my tables to be very effective in storing and retrieving data.
- I needed to create a system where we made sure we had up to date articles without making too many API calls. I created a check based on the category and controlled how often we would make an API call to get new articles.
- Pagination was a challenge. I needed a way to create a "endless" load more button that would load more articles or categories. I had to change the fundamental way I was fetching data from my backend to make this work.

## 💻 How to install and run?

To get this app up and running, you'll need to set up a few things in your .env file. Specifically, make sure to include the following environments and variables:

- DATABASE_URL (We use PostgreSQL + Prisma), GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, and NEXTAUTH_URL, NEWS_API_KEY, WEATHER_API_KEY, OPEN_AI_KEY, NEXT_PUBLIC_IS_TEST_ENV

```bash
# Clone this repository
  git clone https://github.com/rcamach7/headline-hunter
  cd headline-hunter

#  Run local server
  yarn install
  yarn dev
```
