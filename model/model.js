const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  current_price: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  high_24h: { type: Number, required: true },
  low_24h: { type: Number, required: true },
  market_cap_change_24h: { type: Number, required: true },
  last_updated: { 
    type: String, 
    required: true 
  }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;
