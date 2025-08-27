import React from 'react';
import { TrendingUp, BarChart3, Clock } from 'lucide-react';
import { MetalTile } from './MetalTile';

const metals = ['gold', 'silver', 'platinum', 'palladium'];

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Precious Metals Tracker</h1>
                <p className="text-gray-600">Real-time pricing for precious metals</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Live Prices</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Precious Metal Prices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get real-time pricing data for gold, silver, platinum, and palladium in Indian Rupees. 
            Click on any metal to view detailed market information and historical trends.
          </p>
        </div>

        {/* Market Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-lg font-semibold text-gray-900">Market Status</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live
              </span>
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Metal Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metals.map((metal) => (
            <MetalTile key={metal} metal={metal} />
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About Precious Metals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Real-Time Pricing</h4>
              <p className="text-gray-600">
                Our platform provides live pricing data for major precious metals, 
                updated every 30 seconds to ensure you have the most current market information.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Market Analysis</h4>
              <p className="text-gray-600">
                Access detailed market data including daily highs and lows, trading volume, 
                and percentage changes to make informed investment decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

