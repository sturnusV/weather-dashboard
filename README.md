# WeatherScope 🌦️

A responsive weather dashboard with React and OpenWeatherMap API.

## 🚀 Live Demo  
▶️ [Try it here](https://weather-dashboard-60sfw134u-yusuf-atakans-projects.vercel.app)  

## ✨ Features
- Real-time weather conditions
- 5-day interactive forecast
- Dynamic city photo backgrounds
- Mobile-responsive design
- Accessible UI components

## 🛠️ Setup
```bash
# 1. Clone repository
git clone https://github.com/sturnusV/weather-dashboard.git
cd weather-dashboard

# 2. Configure environment variables
cp .env.example .env
# Add your API keys in the .env file

# 3. Install dependencies and run
npm install
npm run dev
```

## 🔑 API Keys Required
| Service | Link |
|---------|------|
| OpenWeatherMap | [Get Key](https://openweathermap.org/api) |
| Unsplash | [Get Key](https://unsplash.com/developers) |

## Technical Highlights
- React hooks for state management
- Axios for API requests
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Accessibility best practices

## Optimization Techniques
- Image lazy loading
- Reduced layout shifts
- Efficient API calls with Promise.all