export function condenseWeatherResponse(response: any) {
  const { name, region, country } = response.location;

  const forecastsByDay = response.forecast.forecastday.map((forecast: any) => {
    const { date, day } = forecast;
    const { maxtemp_f, mintemp_f, avgtemp_f, condition } = day;

    return {
      date,
      maxtemp_f,
      mintemp_f,
      avgtemp_f,
      condition,
    };
  });

  return {
    name,
    region,
    country,
    forecastsByDay,
  };
}
