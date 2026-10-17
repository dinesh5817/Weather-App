# Moonshot Weather App

Moonshot Weather App is a lightweight, browser-based weather lookup application. Enter a city to retrieve its current conditions from the OpenWeatherMap API and see the result in a simple weather card. The app presents the temperature in Fahrenheit, humidity, a short condition description, and an emoji that reflects the reported weather.

The project is built with plain HTML, CSS, and JavaScript, with no framework or build step. It was created by Dinesh Krishnan G. while participating in the NASA International SpaceApps Challenge 2026 and as a Junior Member of the NASA Cosmic Pathfinders Program.

## Features

- Look up current weather by city name.
- Display the city, temperature in Fahrenheit, humidity, and weather description.
- Show a condition-specific emoji for thunderstorms, drizzle, rain, snow, atmospheric conditions, clear skies, and clouds.
- Provide an in-page message when a city cannot be looked up or the city field is empty.
- Use a compact weather card and include creator contact and social links.

## Getting started

### Requirements

- A modern web browser.
- An API key from [OpenWeatherMap](https://openweathermap.org/api) with access to the Current Weather Data API.
- A local static web server. The app fetches its API-key configuration at runtime, so opening `index.html` directly with a `file://` URL may not work.

### Configure the API key

Create a file named `api_key.json` in the project root, next to `index.html`, with this structure:

```json
{
  "api_key": "YOUR_OPENWEATHERMAP_API_KEY"
}
```

`api_key.json` is intentionally excluded from Git. Do not commit your real API key or publish it in a public repository. This app makes requests directly from the browser, so an API key used this way can be seen by visitors; for a public or production deployment, route weather requests through a server-side endpoint and keep the key on the server.

### Deploy to GitHub Pages

The included GitHub Actions workflow publishes the static site and creates `api_key.json` from an Actions secret during deployment. To enable it:

1. In the repository on GitHub, open **Settings → Secrets and variables → Actions** and create a repository secret named `OPENWEATHER_API_KEY` containing a dedicated OpenWeatherMap key.
2. Open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Push a commit to the `main` branch, or manually run the **Deploy to GitHub Pages** workflow from the **Actions** tab.

The Actions secret keeps the key out of the repository history, but it does **not** make the deployed key private: the generated `api_key.json` is downloaded by the browser and can be viewed by site visitors. Use a dedicated key for this demo, apply any API restrictions and usage limits available in your OpenWeatherMap account, and monitor its usage. For a private key, use a server-side proxy instead.

### Run locally

From the project directory, start any static web server. For example, if Python is installed:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser. You can also use an editor extension such as Live Server.

## Usage

1. Enter a city name in the input field.
2. Select **Get Weather** or press Enter.
3. Read the current conditions displayed in the weather card.

The app requests weather data in metric units from OpenWeatherMap and converts the returned temperature to Fahrenheit for display. Weather descriptions are shown as provided by the API.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, city search form, and footer. |
| `styles.css` | Layout, weather card, and visual styling. |
| `script.js` | API-key loading, weather requests, result rendering, and error messages. |
| `api_key.json` | Local API-key configuration; create this yourself and keep it out of version control. |

## Technology

- HTML
- CSS
- JavaScript (Fetch API)
- [OpenWeatherMap Current Weather Data API](https://openweathermap.org/current)

## Credits

Created by **Dinesh Krishnan G.**

- Participating in the NASA International SpaceApps Challenge 2026
- Junior Member, NASA Cosmic Pathfinders Program

Social links and contact details are available in the app footer.
