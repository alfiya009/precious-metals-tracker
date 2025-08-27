import { useState, useEffect, useCallback } from 'react';
import { metalPricesService } from '../services/metalPricesApi';

export function useMetalPrice(metal) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await metalPricesService.fetchPrice(metal);

      if (response.success && response.data) {
        setPrice(response.data);
      } else {
        setError(response.error || 'Failed to fetch price');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, [metal]);

  const refetch = () => {
    fetchPrice();
  };

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [fetchPrice]); // ✅ now dependency is included safely

  return { price, loading, error, refetch };
}
