export const weatherOptions = [
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy-day.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "mist",
    url: new URL("../assets/day/fog-day.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain-day.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow-day.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm-day.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/sunny-day.svg", import.meta.url).href,
  },

  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy-night.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "mist",
    url: new URL("../assets/night/fog-night.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/moon-night.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain-night.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow-night.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/storm-night.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    condition: "default",
    url: new URL("../assets/day/default-day.svg", import.meta.url).href,
  },
  night: {
    day: false,
    condition: "default",
    url: new URL("../assets/night/default-night.svg", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 42.5267443,
  longitude: -71.7614891,
};

export const apiKey = "e2a34c58e48498ea077d91007d38f1b2";
