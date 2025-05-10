
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import ReactDOMServer from "react-dom/server";
import "./MapComponent.css";
const MapComponent = () => {
  const mapRef = useRef(null);
  const markerLayer = useRef(null);
  const weatherCache = useRef({});
  // Memoized Cities
  const cities = useMemo(
    () => [
       {name: "Delhi", lat: 28.6139, lon: 77.2090},
  {name: "Mumbai", lat: 19.0760, lon: 72.8777},
  {name: "Bengaluru", lat: 12.9716, lon: 77.5946},
  {name: "Chennai", lat: 13.0827, lon: 80.2707},
  {name: "Kolkata", lat: 22.5726, lon: 88.3639},
  {name: "Hyderabad", lat: 17.3850, lon: 78.4867},
  {name: "Ahmedabad", lat: 23.0225, lon: 72.5714},
  {name: "Pune", lat: 18.5204, lon: 73.8567},
  {name: "Jaipur", lat: 26.9124, lon: 75.7873},
  {name: "Surat", lat: 21.1702, lon: 72.8311},
  {name: "Lucknow", lat: 26.8467, lon: 80.9462},
  {name: "Kanpur", lat: 26.4499, lon: 80.3319},
  {name: "Nagpur", lat: 21.1458, lon: 79.0882},
  {name: "Indore", lat: 22.7196, lon: 75.8577},
  {name: "Vadodara", lat: 22.3072, lon: 73.1812},
  {name: "Bhopal", lat: 23.2599, lon: 77.4126},
  {name: "Vijayawada", lat: 16.5064, lon: 80.6480},
  {name: "Visakhapatnam", lat: 17.6869, lon: 83.2185},
  {name: "Rajahmundry", lat: 17.0000, lon: 81.7833},
  {name: "Guntur", lat: 16.3067, lon: 80.4365}
    ],
    []
  );
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WiDaySunny size={20} color="gold" />;
      case "clouds":
        return <WiCloud size={20} color="gray" />;
      case "rain":
        return <WiRain size={20} color="blue" />;
      case "snow":
        return <WiSnow size={20} color="lightblue" />;
      case "thunderstorm":
        return <WiThunderstorm size={20} color="purple" />;
      default:
        return <WiDaySunny size={20} color="gold" />;
    }
  };
  const fetchWeather = useCallback(async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (weatherCache.current[city.name]) {
      return weatherCache.current[city.name];
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      weatherCache.current[city.name] = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      return null;
    }
  }, []);
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [20.5937, 78.9629],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      L.tileLayer(
        "https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=FAvGc8Zzbxq4CnFZHwdlPV2KUcs9G9NeBntu49ngNLLLAYAHKavKGerIVeMuG4dX",
        {
          attribution:
            '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>',
        }
      ).addTo(mapRef.current);
      markerLayer.current = L.layerGroup().addTo(mapRef.current);
      const fetchAllCitiesWeather = async () => {
        for (const city of cities) {
          const weather = await fetchWeather(city);
          if (weather) {
            const condition = weather.weather[0].main;
            const temp = weather.main.temp;
            const feelsLike = weather.main.feels_like;
            const description = weather.weather[0].description;
            // Convert React icon to HTML string for Leaflet
            const iconMarkup = ReactDOMServer.renderToString(
              getWeatherIcon(condition)
            );
            // Create a custom Leaflet icon
            const markerIcon = L.divIcon({
              html: `<div class="leaflet-weather-icon">${iconMarkup}</div>`,
              className: "custom-icon", // Add styling in CSS
              iconSize: [20, 20], // Adjust size as needed
            });
            // Marker popup content
            const popupContent = `
              <div class="popup-content">
                <b>${city.name}</b><br>
                Temperature: ${temp}°C<br>
                Condition: ${description}<br>
                Feels Like: ${feelsLike}°C
              </div>
            `;
            L.marker([city.lat, city.lon], { icon: markerIcon })
              .addTo(markerLayer.current)
              .bindPopup(popupContent);
          }
        }
      };
      fetchAllCitiesWeather();
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [cities, fetchWeather]);
  return (
    <div className="map-container">
      <h1 className="heading" style={{ color: "white" }}>Global Weather Data</h1>
      <div id="map" className="map"></div>
    </div>
  );
};
export default MapComponent;
