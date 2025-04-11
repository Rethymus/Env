"use client";

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getWeather, Weather} from "@/services/weather";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Icons} from "@/components/icons";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";

const apiKeyLocalStorageKey = 'openWeatherApiKey';

export default function Home() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [buzzerTimer, setBuzzerTimer] = useState<number>(0);
  const {toast} = useToast();

  useEffect(() => {
    const storedApiKey = localStorage.getItem(apiKeyLocalStorageKey);
    if (typeof window !== 'undefined') {
      setApiKey(localStorage.getItem(apiKeyLocalStorageKey) || '');
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      fetchWeatherData(apiKey);
    }
  }, [apiKey]);

  const fetchWeatherData = async (apiKey: string) => {
    try {
      const weatherData = await getWeather('CityName', apiKey);
      setWeather(weatherData);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
      toast({
        title: "Failed to fetch weather data",
        description: "Please check your API key and try again.",
        variant: "destructive",
      });
    }
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const handleApiKeySubmit = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(apiKeyLocalStorageKey, apiKey);
    }
    fetchWeatherData(apiKey);
    toast({
      title: "API Key Updated",
      description: "Your API key has been updated successfully.",
    });
  };

  const formatTime = (value: number): string => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background antialiased">
      <Toaster/>
      <header className="px-4 py-6 border-b">
        <h1 className="text-2xl font-semibold tracking-tight">EcoMonitor</h1>
      </header>
      <main className="container mx-auto p-4 flex flex-col gap-4">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Data</CardTitle>
              <CardDescription>Current temperature and humidity readings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <Icons.thermometer className="h-4 w-4 text-accent"/>
                  <span>Temperature: {temperature !== null ? `${temperature}°C` : 'N/A'}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Icons.humidity className="h-4 w-4 text-accent"/>
                  <span>Humidity: {humidity !== null ? `${humidity}%` : 'N/A'}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>Weather forecast information from OpenWeatherMap API.</CardDescription>
            </CardHeader>
            <CardContent>
              {weather ? (
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <Icons.cloud className="h-4 w-4 text-accent"/>
                    <span>City: {weather.city}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icons.thermometer className="h-4 w-4 text-accent"/>
                    <span>Temperature: {weather.temperature}°C</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icons.humidity className="h-4 w-4 text-accent"/>
                    <span>Humidity: {weather.humidity}%</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icons.sun className="h-4 w-4 text-accent"/>
                    <span>Conditions: {weather.conditions}</span>
                  </p>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buzzer Timer Setting</CardTitle>
              <CardDescription>Set a timer for the buzzer to turn on and off.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="buzzer-timer">Timer: {formatTime(buzzerTimer)}</Label>
              </div>
              <Slider
                id="buzzer-timer"
                min={0}
                max={1440}
                step={1}
                value={[buzzerTimer]}
                onValueChange={(value) => setBuzzerTimer(value[0])}
              />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key Configuration</CardTitle>
              <CardDescription>Enter your OpenWeatherMap API key.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="text"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                />
              </div>
              <Button onClick={handleApiKeySubmit}>Save API Key</Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="px-4 py-3 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EcoMonitor. All rights reserved.</p>
      </footer>
    </div>
  );
}
