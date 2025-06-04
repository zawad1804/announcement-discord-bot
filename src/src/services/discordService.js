const axios = require('axios');
const { DISCORD_WEBHOOK_URL } = require('../utils/config');

async function postToDiscord(announcement) {
    const message = {
        content: `**${announcement.heading}**\nPublished on: ${announcement.date}\n${announcement.link}`
    };
    await axios.post(DISCORD_WEBHOOK_URL, message);
}

module.exports = {
    postToDiscord
};