require('dotenv').config();
const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

bot.start((ctx) => {
  ctx.reply("Hi! I'm Gemini AI 🤖. Ask me anything.");
});

bot.on('text', async (ctx) => {
  try {
    const prompt = ctx.message.text;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    ctx.reply(text);
  } catch (err) {
    console.error(err);
    ctx.reply("⚠️ Sorry, something went wrong.");
  }
});

bot.launch();
console.log("🚀 Gemini Telegram Bot is running...");
