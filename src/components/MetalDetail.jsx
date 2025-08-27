import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Clock, DollarSign, Activity } from 'lucide-react';
import { METALS } from '../constants/metals';
import { useMetalPrice } from '../hooks/useMetalPrice';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export function MetalDetail() {
  const { metalType } = useParams();
  const navigate = useNavigate();
  
  if (!metalType || !(metalType in METALS)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Metal Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const metal = metalType;
  const metalInfo = METALS[metal];
  const { price, loading, error, refetch } = useMetalPrice(metal);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4 text-lg">Loading {metalInfo.name} details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={refetch} />
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!price) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No data available for {metalInfo.name}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const isPositive = price.change >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg" style={{ background: metalInfo.bgColor }}>
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{metalInfo.name} ({metalInfo.symbol})</h1>
                <p className="text-gray-600">Detailed market information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Price Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Price</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price per Gram</p>
                  <p className="text-5xl font-bold text-gray-900">{formatPrice(price.price)}</p>
                </div>
                <div className={`flex items-center text-lg font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 mr-2" />
                  ) : (
                    <TrendingDown className="w-5 h-5 mr-2" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}{formatPrice(price.change)} ({isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Last updated: {formatDateTime(price.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">24h High</p>
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(price.high24h)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">24h Low</p>
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(price.low24h)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prev. Close</p>
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(price.previousClose)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prev. Open</p>
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(price.previousOpen)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Trading Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Trading Info</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price</span>
                <span className="font-medium">{formatPrice(price.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Close</span>
                <span className="font-medium">{formatPrice(price.previousClose)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Previous Open</span>
                <span className="font-medium">{formatPrice(price.previousOpen)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Change</span>
                <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPrice(price.change)}
                </span>
              </div>
            </div>
          </div>

          {/* Market Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Market Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">24h High</span>
                <span className="font-medium text-green-600">{formatPrice(price.high24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Low</span>
                <span className="font-medium text-red-600">{formatPrice(price.low24h)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Range</span>
                <span className="font-medium">{formatPrice(price.high24h - price.low24h)}</span>
              </div>
              {price.volume && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume</span>
                  <span className="font-medium">{formatNumber(price.volume)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className={`w-6 h-6 mr-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Change</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isPositive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Change Amount</span>
                <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{formatPrice(price.change)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From Open</span>
                <span className="font-medium">
                  {formatPrice(price.price - price.previousOpen)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Information */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About {metalInfo.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Market Overview</h4>
              <p className="text-gray-600 mb-4">
                {metalInfo.name} is a precious metal traded globally in grams. 
                Its price fluctuates based on various economic factors including inflation, 
                currency strength, and supply and demand dynamics.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Key Details</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Symbol: {metalInfo.symbol}</li>
                  <li>• Currency: INR</li>
                  <li>• Unit: Gram</li>
                  <li>• Updated: Every 30 seconds</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Price Factors</h4>
              <p className="text-gray-600 mb-4">
                {metalInfo.name} prices are influenced by economic indicators, 
                geopolitical events, mining supply, industrial demand, and investor sentiment 
                towards precious metals as safe-haven assets.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Last Update</span>
                  <span className="font-medium">{formatDateTime(price.timestamp)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Market Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MetalDetail;
