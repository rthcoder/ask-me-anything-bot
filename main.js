import { token } from './config/config.js';
import { Telegraf } from 'telegraf';
import commands from './commands/index.js';
import controllers from './controllers/controller.js';
import middleware from './middleware/index.js';
import db from "./config/db.js"
import express from "express";

const app = express()

const PORT = process.env.PORT || 8888

const bot = new Telegraf(token);
middleware(bot);
commands(bot);
controllers(bot);
bot.launch();


//start server
!async function () {
    try {
        db()
    } catch (error) {
        console.log(error);
    }
    app.listen(PORT, () => console.log(`🚀 BackEnd server is running http://localhost:` + PORT))
}();