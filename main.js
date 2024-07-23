import { token } from './config/config.js';
import { Telegraf } from 'telegraf';
import commands from './commands/index.js';
import controllers from './controllers/controller.js';
import middleware from './middleware/index.js';
import db from "./config/db.js"

const bot = new Telegraf(token);
db()
middleware(bot);
commands(bot);
controllers(bot);
bot.launch();