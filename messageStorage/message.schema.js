// make the necessary imports here
import mongoose from "mongoose"
// implement the below schema
const messageSchema = mongoose.Schema({
    text: String,
    username: String,
    room: String,
    timestamp: Date
});

export const messageModel = mongoose.model("Message",messageSchema);




