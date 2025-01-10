const mongoose = require("mongoose");

const CryptoDataSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true,
        enum: ["bitcoin", "matic-network", "ethereum"],
    },
    price: {
        type: Number,
        required: true,
    },
    marketCap: {
        type: Number,
        required: true,
    },
    change24h: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("CryptoData", CryptoDataSchema);
