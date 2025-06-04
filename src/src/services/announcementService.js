const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const { getLastPostedId, updateLastPostedId } = require('../db/mongo');
const { baseUrl } = require('../utils/config');

async function fetchAnnouncements() {
    const html = fs.readFileSync('page source code.html', 'utf8');
    const $ = cheerio.load(html);
    const announcements = [];

    $('article.node-announcement').each((i, el) => {
        const article = $(el);
        const id = article.attr('id')?.replace('node-', '');
        const date = article.find('.date-display-single').text().trim();
        const headingLink = article.find('h2.page-h1 a');
        const heading = headingLink.text().trim();
        let link = headingLink.attr('href');
        if (link && !link.startsWith('http')) {
            link = baseUrl + link;
        }
        announcements.push({ id, date, heading, link });
    });

    return announcements;
}

async function getNewAnnouncements() {
    const announcements = await fetchAnnouncements();
    const lastPostedId = await getLastPostedId();
    return announcements.filter(ann => ann.id > lastPostedId);
}

async function markAnnouncementsAsPosted(announcements) {
    if (announcements.length > 0) {
        const latestId = announcements[0].id;
        await updateLastPostedId(latestId);
    }
}

module.exports = { getNewAnnouncements, markAnnouncementsAsPosted };