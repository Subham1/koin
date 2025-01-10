const Fetchdata = require('../fetch/fetchdata');
const storedata = require('../store/storedata');

// Function to fetch and store data
const fetchandstore = () => {
  // Define an async function to fetch and store data
  const fs = async () => {
    try {
      // Fetch data
      const data = await Fetchdata();
      console.log(data);
      
      // Store the fetched data
      await storedata(data);
    } catch (error) {
      // Handle any errors during the fetch or store process
      console.log("Error:", error.message);
    }
  };

  // Call the function once immediately
  fs();

  // Set an interval to call the function every 2 hours
  setInterval(fs, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
};
// Start the fetch and store process
fetchandstore();
// Only export the fetchandstore function, no need to call it immediately
module.exports = fetchandstore;
