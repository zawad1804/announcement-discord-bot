# Announcement Discord Bot

This project automates the posting of announcements to a Discord channel using a Node.js script. It scrapes announcements from a specified webpage, checks for new announcements, and posts them to Discord. The project uses MongoDB to track the last posted article ID.

## Project Structure

```
announcement-discord-bot
├── src
│   ├── index.js               # Entry point of the application
│   ├── db
│   │   └── mongo.js           # MongoDB connection handling
│   ├── services
│   │   ├── announcementService.js # Scraping announcements
│   │   └── discordService.js   # Posting to Discord
│   └── utils
│       └── config.js          # Configuration constants
├── package.json                # NPM configuration file
├── vercel.json                 # Vercel deployment configuration
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd announcement-discord-bot
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   Add your MongoDB connection string and Discord webhook URL to the `.env` file:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   DISCORD_WEBHOOK_URL=<your_discord_webhook_url>
   ```

4. **Run the application:**
   ```
   node src/index.js
   ```

## Usage Guidelines

- The application will automatically scrape announcements and post them to the specified Discord channel.
- It checks for new announcements based on the last posted article ID stored in MongoDB.
- Ensure that your MongoDB instance is running and accessible.

## Deployment

This project can be deployed on Vercel. Ensure that the environment variables are set in the Vercel dashboard to match those in your `.env` file.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.