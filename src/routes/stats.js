const express = require("express");  // Importing the Express library
const CryptoData = require("../models/CryptoData");  // Importing the CryptoData model

const router = express.Router();  // Creating an instance of a router to define routes

// Route to get stats of a specific cryptocurrency
router.get("/stats", async (req, res) => {
    const { coin } = req.query;  // Extracting the 'coin' query parameter from the request

    // Validate that the coin parameter is one of the accepted values
    if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
        return res.status(400).json({ error: "Invalid or missing coin parameter" });
    }

    try {
        // Fetch the latest record for the requested coin
        const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });

        // If no data is found, return a 404 error
        if (!latestData) {
            return res.status(404).json({ error: "Data not found for the specified coin" });
        }

        // Return the latest data for the coin, including price, market cap, and 24-hour change
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        // If there's any error during the database operation, respond with a 500 error
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router; 