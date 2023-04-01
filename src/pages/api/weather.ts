import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { condenseWeatherResponse } from '@/services/weatherService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Missing latitude or longitude' });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`;
  switch (req.method) {
    case 'GET':
      try {
        const response = await axios.get(url);
        const condensedResponse = condenseWeatherResponse(response.data);
        return res.status(200).json({ weather: condensedResponse });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
