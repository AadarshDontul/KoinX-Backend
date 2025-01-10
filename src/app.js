const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cron = require("node-cron");
const fetchCryptoData = require("./services/fetchCryptoData");
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware for JSON
app.use(express.json());

// Mount routes
app.use("/api/stats", statsRoute);
app.use("/api/deviation", deviationRoute);

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", () => {
    console.log("Fetching cryptocurrency data every 2 hours...");
    fetchCryptoData();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
