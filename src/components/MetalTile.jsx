import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { METALS } from "../constants/metals";
import { useMetalPrice } from "../hooks/useMetalPrice";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import '../main.css';

export function MetalTile({ metal }) {
  const navigate = useNavigate();
  const { price, loading, error, refetch } = useMetalPrice(metal);
  const metalInfo = METALS[metal];
  const cardStyle = {
    background: metalInfo.bgColor,
    color: metalInfo.textColor,
  };

  const handleClick = () => {
    if (price && !loading && !error) {
      navigate(`/metal/${metal}`);
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const cardClass = `card ${metal}`;

  if (loading) {
    return (
      <div className={"card flex items-center justify-center h-64"} style={cardStyle}>
        <div className="text-center">
          <LoadingSpinner size="lg" color="text-gray" />
          <p className="text-gray mt-4 text-bold">
            Loading {metalInfo.name}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={"card h-64"} style={cardStyle}>
        <h3 className="text-bold mb-4">{metalInfo.name}</h3>
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!price) {
    return (
      <div className={"card h-64 flex items-center justify-center"} style={cardStyle}>
        <p className="text-gray">No data available</p>
      </div>
    );
  }

  const isPositive = price.change >= 0;

  return (
    <div
      onClick={handleClick}
      className={"card hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer h-64 relative overflow-hidden group"}
      style={cardStyle}
    >
      {/* Background pattern */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-xl" style={{ marginRight: '-4rem', marginTop: '-4rem' }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-xl" style={{ marginLeft: '-3rem', marginBottom: '-3rem' }}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-bold">{metalInfo.name}</h3>
            <span className="text-gray text-bold">{metalInfo.symbol}</span>
          </div>
          <div className="text-bold mb-4" style={{ fontSize: '2rem' }}>
            {formatPrice(price.price)}
          </div>
          <div className="text-gray mb-4">per gram</div>
        </div>

        <div className="gap-6">
          <div className={`flex items-center ${isPositive ? "text-bold" : "text-gray"}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="text-bold">
              {formatPrice(Math.abs(price.change))} (
              {Math.abs(price.changePercent).toFixed(2)}%)
            </span>
          </div>

          <div className="flex items-center text-gray">
            <Clock className="w-4 h-4 mr-1" />
            <span>Updated: {formatTime(price.timestamp)}</span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-gray rounded-xl flex items-center justify-center">
            <span className="text-bold" style={{ fontSize: '1.5rem' }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

MetalTile.propTypes = {
  metal: PropTypes.oneOf(["gold", "silver", "platinum", "palladium"]).isRequired,
};
