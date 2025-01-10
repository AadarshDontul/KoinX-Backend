const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cron = require("node-cron");
const fetchCryptoData = require("./services/fetchCryptoData");

//load env vars
dotenv.config();

//connect to the database
connectDB();

const app = express();

//middleware for json
app.use(express.json());

//placeholder for routes
//app.use("/api", require('./routes'));


// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", () => {
    console.log("Fetching cryptocurrency data every 2 hours...");
    fetchCryptoData();
});


//start the server 

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
