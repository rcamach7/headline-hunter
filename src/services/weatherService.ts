export function groupByDay(
  list: WeatherResponse['list']
): Map<string, CondensedWeatherResponse['fiveDays'][number][]> {
  const groupedByDay = new Map<
    string,
    CondensedWeatherResponse['fiveDays'][number][]
  >();
  list.forEach((item) => {
    const date = new Date(item.dt_text);
    const day = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const condensedItem = {
      day,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      description: item.weather[0].description,
    };

    if (groupedByDay.has(day)) {
      groupedByDay.get(day)!.push(condensedItem);
    } else {
      groupedByDay.set(day, [condensedItem]);
    }
  });

  return groupedByDay;
}

export function findAverageMinMax(
  group: CondensedWeatherResponse['fiveDays'][number][]
): CondensedWeatherResponse['fiveDays'][number] {
  let temp_min_sum = 0;
  let temp_max_sum = 0;
  group.forEach((item) => {
    temp_min_sum += item.temp_min;
    temp_max_sum += item.temp_max;
  });

  const avg_temp_min = temp_min_sum / group.length;
  const avg_temp_max = temp_max_sum / group.length;

  return {
    day: group[0].day,
    temp_min: avg_temp_min,
    temp_max: avg_temp_max,
    description: group[0].description,
  };
}

export function convertWeatherData(
  weatherData: WeatherResponse
): CondensedWeatherResponse {
  const groupedByDay = groupByDay(weatherData.list);
  const fiveDays: CondensedWeatherResponse['fiveDays'] = [];

  groupedByDay.forEach((group) => {
    const averageMinMax = findAverageMinMax(group);
    fiveDays.push(averageMinMax);
  });

  return {
    city: {
      id: weatherData.city.id,
      name: weatherData.city.name,
      country: weatherData.city.country,
    },
    fiveDays,
  };
}

interface WeatherResponse {
  city: {
    id: number;
    name: string;
    country: string;
  };
  list: [
    {
      dt: number;
      dt_text: string;
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
    }
  ];
}

interface CondensedWeatherResponse {
  city: {
    id: number;
    name: string;
    country: string;
  };
  fiveDays: {
    day: string;
    temp_min: number;
    temp_max: number;
    description: string;
  }[];
}
