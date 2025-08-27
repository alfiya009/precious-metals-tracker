// metalPricesService.jsx

class MetalPricesService {
  baseDelay = 800; // Base delay for realistic loading simulation

  generateMockPrice(metal) {
    // Latest approx rates per gram in INR (24k Gold)
    const baseRates = {
      gold: 10240,      // ₹10,240 per gram (24k)
      silver: 125,      // ₹125 per gram (approx)
      platinum: 3200,   // ₹3,200 per gram (approx)
      palladium: 4200,  // ₹4,200 per gram (approx)
    };

    const base = baseRates[metal];
    const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const price = base * (1 + variation);
    const change = (Math.random() - 0.5) * (base * 0.05); // ±5% variation
    const changePercent = (change / price) * 100;

    return {
      metal: metal.charAt(0).toUpperCase() + metal.slice(1),
      price: Math.round(price * 100) / 100, // per gram
      currency: "INR",
      unit: "gram", // ✅ Troy Ounce ke badle Gram
      purity: metal === "gold" ? "24K" : undefined, // ✅ Gold me purity bhi
      timestamp: new Date().toISOString(),
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      previousClose: Math.round((price - change) * 100) / 100,
      previousOpen: Math.round((price - change * 0.8) * 100) / 100,
      high24h: Math.round((price + Math.abs(change) * 1.2) * 100) / 100,
      low24h: Math.round((price - Math.abs(change) * 1.1) * 100) / 100,
      volume: Math.floor(Math.random() * 100000) + 50000,
    };
  }

  async fetchPrice(metal) {
    const delay = this.baseDelay + Math.random() * 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() < 0.05) {
          resolve({
            success: false,
            error: `Failed to fetch ${metal} price. Please try again.`,
          });
        } else {
          resolve({
            success: true,
            data: this.generateMockPrice(metal),
          });
        }
      }, delay);
    });
  }

  async fetchAllPrices() {
    const metals = ["gold", "silver", "platinum", "palladium"];
    const promises = metals.map((metal) =>
      this.fetchPrice(metal).then((response) => [metal, response])
    );
    const results = await Promise.all(promises);
    return Object.fromEntries(results);
  }
}

export const metalPricesService = new MetalPricesService();
