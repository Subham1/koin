const Crypto = require('../model/model');
const storedata = async (data) => {
  try {
    for (const coin of data) {
      const crypto = new Crypto({
        id: coin.id,
        current_price: coin.current_price,
        market_cap_change_24h: coin.market_cap_change_24h,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        market_cap_change_24h: coin.market_cap_change_24h,
        last_updated:coin.last_updated
      });

      await crypto.save();
    }
    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error.message);
  }
};

module.exports = storedata;