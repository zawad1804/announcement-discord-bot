const dotenv = require('dotenv');

dotenv.config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    DISCORD_WEBHOOK_URL,
    MONGODB_URI
};