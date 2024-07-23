import User from "../model/user.model.js"

class Controllers {
    // user = User.find()

    constructor(bot) {
        this.bot = bot;
        this.anyMessage();
    }

    anyMessage() {
        this.bot.on('text', async (ctx) => {
            const { message } = await ctx.update;
            let user = await User.find({ tgId: `${message.from.id}` })

            user = user[0]
            if (user?.step === 2) {
                await ctx.telegram.sendMessage(user?.send_to, `<b>You have received a new message:</b>\n\n${message.text}\n<a href="http://t.me/ask_me_something_bot?start=${user.id}">[Answer]</a>`, { parse_mode: 'HTML', disable_web_page_preview: true });
                await ctx.reply('Your question is sent to the user.\n\nPress /start to use the bot.');
                await User.findOneAndUpdate(
                    { tgId: `${message.from.id}` },
                    {
                        $set: {
                            step: 1,
                            send_to: '0'
                        }
                    }
                )
            } else {
                await ctx.reply('Press /start to use the bot.');
            }
        });
    }
}

export default function createControllers(bot) {
    return new Controllers(bot);
}