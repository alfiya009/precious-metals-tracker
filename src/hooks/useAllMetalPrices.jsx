import { useState, useEffect } from 'react';
import { metalPricesService } from '../services/metalPricesApi';

export default function useAllMetalPrices() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchAll() {
    setLoading(true);
    setError(null);
    try {
      const result = await metalPricesService.fetchAllPrices();
      const pricesObj = {};
      Object.keys(result).forEach((metal) => {
        const res = result[metal];
        pricesObj[metal] = res.success ? res.data : null;
      });
      setPrices(pricesObj);
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
}
