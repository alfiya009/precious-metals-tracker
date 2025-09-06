
# Precious Metals Tracker

A modern React app to track real-time prices for Gold, Silver, Platinum, and Palladium in Indian Rupees. Built with Vite, React, and Lucide icons.

## Tech Stack
- **Frontend:** React 19, Vite
- **Styling:** Custom CSS (with Tailwind-inspired gradients)
- **Icons:** Lucide React
- **Routing:** React Router
- **API:** Mocked in `src/services/metalPricesApi.jsx`

## Features
- Real-time pricing for major precious metals
- Beautiful card UI with color gradients
- Detail page for each metal with market info
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- npm

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/alfiya009/precious-metals-tracker.git
	cd precious-metals-tracker/my-app
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running Locally
Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```sh
npm run build
```
The output will be in the `dist` folder.

### Deploying
You can deploy the `dist` folder to any static hosting service (Netlify, Vercel, Render, GitHub Pages, etc.).

#### Netlify/Render Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Project Structure
```
my-app/
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.jsx
│   ├── main.jsx
│   └── main.css
├── package.json
├── vite.config.js
└── ...
```

## Environment Variables
No environment variables are required for this project.



---

