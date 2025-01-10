const express = require('express');
const connectDB = require('./config/mongdb'); 
const fetchandstore = require('./interval/interval'); 
const Crypto=require("./model/model");
const app = express();
const math = require('mathjs');

connectDB();
// Fetch and store data every 2 hours
   //works at intervals.js

// Endpoint to get statistics for a specific coin
app.get('/stats', async (req, res) => {
    try {
        const coin = req.query.coin;
        
        // Ensure coin is provided
        if (!coin) {
            console.log("pls provide data");
        }

        // Fetch the latest data for the coin
        const updatedata = await Crypto.findOne({ id: coin }).sort({ last_updated: -1 });

        // Handle case where coin is not found
        if (!updatedata) {
            console.log("coin not found");
        }

        // Prepare and return statistics
        const stats = {
            id: updatedata.id,
            current_price: updatedata.current_price,
            change24: updatedata.market_cap_change_24h,
            price_change_percentage_24h: updatedata.price_change_percentage_24h,
        high_24h: updatedata.high_24h,
        low_24h: updatedata.low_24h,
        last_updated: updatedata.last_updated

        };
        res.status(200).json(stats);
    } catch (error) {
        console.log(error);
    }
});

// Endpoint to calculate and return the standard deviation of coin prices
app.get('/deviation', async (req, res) => {
    const { coin } = req.query;

    
    if (!coin) {
        return res.status(400).json({ message: 'Coin is required' });
    }

    try {
        // Fetch the last 100 records for the coin
        const data = await Crypto.find({ id: coin })
                                 .sort({ last_updated: -1 }) // Sort by latest updated
                                 .limit(100); // Get the last 100 records

        
        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found for the requested coin' });
        }

        // Extract prices and calculate standard deviation
        const prices = data.map(record => record.current_price);
        const deviation = math.std(prices);

        // Return the result
        res.json({ deviation: deviation.toFixed(2) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error calculating standard deviation', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
