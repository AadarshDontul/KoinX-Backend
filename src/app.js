const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

//load env vars
dotenv.config();

//connect to the database
connectDB();

const app = express();

//middleware for json
app.use(express.json());

//placeholder for routes
//app.use("/api", require('./routes'));

//start the server 

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
