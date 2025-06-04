const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI; // MongoDB connection string from .env
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client.db('announcementBot'); // Replace with your database name
}

async function getLastPostedArticleId() {
    const db = await connectToDatabase();
    const collection = db.collection('announcements');
    const lastAnnouncement = await collection.findOne({}, { sort: { postedAt: -1 } });
    return lastAnnouncement ? lastAnnouncement.id : null;
}

async function updateLastPostedArticleId(id) {
    const db = await connectToDatabase();
    const collection = db.collection('announcements');
    await collection.updateOne(
        { id },
        { $set: { postedAt: new Date() } },
        { upsert: true }
    );
}

module.exports = {
    connectToDatabase,
    getLastPostedArticleId,
    updateLastPostedArticleId
};