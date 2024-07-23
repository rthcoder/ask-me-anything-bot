import User from "../model/user.model.js"

// step 1 - start
// step 2 - send question

class Commands {
    user = User.find()
    // user = new PrismaClient().user;

    constructor(bot) {
        this.bot = bot;
        this.help();
        this.start();
    }

    help() {
        this.bot.help((ctx) => ctx.reply('Press /start to use the bot.'));
    }

    start() {
        this.bot.start(async (ctx) => {
            const { message } = ctx.update;
            const options = { new: true, upsert: true };

            const user = await User.findOneAndUpdate(
                {
                    tgId: `${message.from.id}`
                },
                {
                    step: 1, sendTo: '0'
                },
                {
                    ...options,
                    setDefaultsOnInsert: true, // Agar yangi hujjat yaratilsa, default qiymatlarni qo'llash
                    runValidators: true,       // Validatorlarni ishga tushirish
                }
            ).set('name', message.from.first_name).set('username', message.from.username);

            if (ctx.state.commands[1] && ctx.state.commands[1] !== user.id) {
                const receiverId = ctx.state.commands[1];
                const findUser = await User.findById({ _id: receiverId })

                if (findUser) {
                    await User.findByIdAndUpdate(
                        { _id: user._id },
                        {
                            $set: {
                                step: 2,
                                send_to: findUser?.tgId
                            }
                        }
                    )
                }

                ctx.reply(`Write your question: `);
            } else {
                ctx.reply(`Here is your personal link: \n\nt.me/ask_me_something_bot?start=${user.id}\n\nPost it on your channel and get anonymous questions from your followers`);
            }
        });
    }
}

export default function createCommands(bot) {
    return new Commands(bot);
} 