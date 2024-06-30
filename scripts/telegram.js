const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config()

const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY || "";
const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });
const baseUrl = process.env.NODE_ENV === "development" ? "https://www.prolegalsolutions.pl/" : "http://localhost:3000/"

bot.on("message", async (msg) => {
    try {
        const response = await fetch(`${baseUrl}api/interfaces/telegram`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatId: msg.chat.id,
                username: msg.chat.username
            })
        });
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error('Error sending POST request:', error);
    }
    // bot.sendMessage(msg.chat.id, 'Received your message');
});