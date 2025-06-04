const mongoose = require('mongoose');
const { fetchAnnouncements } = require('./services/announcementService');
const { postToDiscord } = require('./services/discordService');
const { connectToDatabase, getLastPostedId, updateLastPostedId } = require('./db/mongo');

const main = async () => {
    await connectToDatabase();

    const lastPostedId = await getLastPostedId();
    const announcements = await fetchAnnouncements();

    for (const announcement of announcements) {
        if (announcement.id === lastPostedId) {
            break;
        }
        await postToDiscord(announcement);
        console.log(`Posted: ${announcement.heading}`);
        await updateLastPostedId(announcement.id);
    }
};

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});