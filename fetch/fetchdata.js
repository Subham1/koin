// Load environment variables from .env file
require('dotenv').config();

const axios = require("axios");

// Access API URL and API key from environment variables
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const Fetchdata = async () => {
    try {
        // Make the API request using Axios
        const Response = await axios.get(API_URL, {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,matic-network,ethereum'
            },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': API_KEY
            }
        });

        // Return the API response data
        return Response.data;
    } catch (error) {
        // Log any errors
        console.log(error);
    }
};

module.exports = Fetchdata;
