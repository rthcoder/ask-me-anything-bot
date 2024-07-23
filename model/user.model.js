import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    tg_id: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String
    },
    step: {
        type: Number
    },
    send_to: {
        type: String
    }
},
    {
        timestamp: true
    },
);

export default mongoose.model("User", userSchema);