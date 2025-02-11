# Cryptocurrency Stats and Deviation API

## Overview
This project provides APIs to fetch cryptocurrency data and calculate the standard deviation of prices for specific cryptocurrencies. The backend is built using Node.js, Express.js, and MongoDB.

## Features
- Fetch price, marketcap,24 hr change
- Calculate the standard deviation of prices for a cryptocurrency.
- Automatically fetch and store cryptocurrency data every 2 hours using a cron job.
- RESTful API design.

## Prerequisites

Ensure the following tools and dependencies are installed:
- Node.js (v14.x or later)
- npm (comes with Node.js)
- MongoDB Atlas (or a local MongoDB instance)

## Project Structure
```
project/
|-- src/
|   |-- db.js          # MongoDB connection setup
|   |-- services/
|   |   |-- fetchCryptoData.js  # Service to fetch cryptocurrency data from an external API
|   |-- models/
|   |   |-- CryptoData.js       # Mongoose model for cryptocurrency data
|   |-- routes/
|       |-- stats.js    # API route for fetching cryptocurrency stats
|       |-- deviation.js # API route for calculating standard deviation
|-- app.js            # Main application entry point
|-- .env              # Environment variables
|-- package.json      # Node.js dependencies and scripts
```

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   ```

4. Start the application:
   ```bash
   node app.js
   ```

5. Access the API at `https://koinx-backend-48mx.onrender.com`.

## Deployment

This project can be deployed on platforms like Render, Heroku, or any cloud service that supports Node.js applications.

### Steps to Deploy on Render

1. Push your project to a Git repository (e.g., GitHub).
2. Create a new web service on Render and link your Git repository.
3. Set the environment variables (e.g., `MONGO_URI` and `PORT`) in the Render dashboard.
4. Deploy the service. Your deployed app will be accessible at the provided Render URL.

## API Endpoints

### Base URL
The base URL for the API:
```
https://<your-deployed-domain>/api
```

### 1. **Stats API**
Fetches the average, maximum, and minimum prices for a specific cryptocurrency.

**Endpoint:**
```
GET /stats
```

**Query Parameters:**
- `coin` (required): Cryptocurrency ID. Valid values are:
  - `bitcoin`
  - `matic-network`
  - `ethereum`

**Example Request:**
```
GET /stats?coin=bitcoin
```

**Example Response:**
```json
{
  "price": 94163,
  "marketCap": 1853405351279.02,
  "24hChange": 0.501211299457175
}
```

### 2. **Deviation API**
Calculates and returns the standard deviation of prices for a specific cryptocurrency.

**Endpoint:**
```
GET /deviation
```

**Query Parameters:**
- `coin` (required): Cryptocurrency ID. Valid values are:
  - `bitcoin`
  - `matic-network`
  - `ethereum`

**Example Request:**
```
GET /deviation?coin=ethereum
```

**Example Response:**
```json
{
  "deviation": "123.45"
}
```

## Cron Job
The application uses `node-cron` to fetch cryptocurrency data every 2 hours and store it in the MongoDB database. The data is fetched from the [CoinGecko API](https://www.coingecko.com/).

## Database Schema
The application uses MongoDB for data storage. The `CryptoData` collection has the following schema:

| Field        | Type    | Description                                  |
|--------------|---------|----------------------------------------------|
| `coin`       | String  | Cryptocurrency ID (e.g., bitcoin, ethereum) |
| `price`      | Number  | Current price in USD                        |
| `marketCap`  | Number  | Market capitalization in USD                |
| `change24h`  | Number  | 24-hour percentage price change             |
| `timestamp`  | Date    | Timestamp of the record                     |

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- Axios (for API requests)
- node-cron (for scheduled tasks)

## Testing
You can test the APIs using tools like:
- [Postman](https://www.postman.com/)
- cURL

**Example cURL Request for Stats API:**
```bash
curl -X GET "https://koinx-backend-48mx.onrender.com/stats?coin=matic-network"
```

**Example cURL Request for Deviation API:**
```bash
curl -X GET "https://koinx-backend-48mx.onrender.com/deviation?coin=bitcoin"
```

## Author
Aadarsh Dontul

---

If you have any questions or issues, feel free to reach out!

