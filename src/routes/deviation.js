const express = require("express");
const CryptoData = require("../models/CryptoData");
const router = express.Router(); 

// Route to calculate and return the standard deviation of prices for a cryptocurrency
router.get("/", async (req, res) => {
   
    const { coin } = req.query;

    
    // Ensure it is present and matches one of the valid cryptocurrency IDs
    if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
        return res.status(400).json({ error: "Invalid or missing coin parameter" });
    }

    try {
        
        const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);

        // If no records are found, return a 404 error with an appropriate message
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No records found for the specified coin" });
        }

        // Extract the prices from the fetched data
        const prices = data.map(record => record.price);

        // Calculate the mean (average) of the prices
        const mean = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;

        
        // Calculate the variance using the formula: Variance = Sum((price - mean)^2) / Number of prices
        const variance = prices.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / prices.length;

        // Calculate the standard deviation by taking the square root of the variance
        const standardDeviation = Math.sqrt(variance);

        // Respond with the calculated standard deviation, rounded to two decimal places
        res.json({ deviation: standardDeviation.toFixed(3) });
    } catch (error) {
        // Catch and handle any errors that occur during database operations or calculations
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
