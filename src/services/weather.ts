/**
 * Represents weather information, including temperature and conditions.
 */
export interface Weather {
  /**
   * The temperature in Celsius.
   */
  temperature: number;
  /**
   * The weather conditions (e.g., Sunny, Cloudy, Rainy).
   */
  conditions: string;
  /**
   * The city name.
   */
  city: string;
  /**
   * The humidity percentage
   */
  humidity: number;
}

/**
 * Asynchronously retrieves weather information for a given city.
 *
 * @param city The city for which to retrieve weather data.
 * @param apiKey The OpenWeatherMap API key.
 * @returns A promise that resolves to a Weather object containing temperature and conditions.
 */
export async function getWeather(city: string, apiKey: string): Promise<Weather> {
  // TODO: Implement this by calling the OpenWeatherMap API.
  // Example API call:
  // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  // const data = await response.json();

  // Placeholder data for demonstration purposes
  return {
    temperature: 22.5,
    conditions: 'Clear sky',
    city: 'CityName',
    humidity: 57,
  };
}

/**
 * Fetches data from a local server, including temperature, conditions, city,
 * humidity, and buzzer status.
 *
 * @returns A promise that resolves to an object containing the fetched data,
 *          or null if an error occurs. The object includes temperature,
 *          conditions, city, humidity, and a boolean indicating buzzer status.
 */

export async function fetchLocalData() {
  try {
    const response = await fetch('http://localhost:3001/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching local data:', error);
    return null;
  }
}