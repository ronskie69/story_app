const mongoose = require('mongoose');

const StoryChema = new mongoose.Schema({
    id: { type:Number },
    title:{ type:String, required: true },
    nickname: { type: String, required: true },
    story: { type: String, required: true },
    senderEmail: { type: String, required: true }
},{timestamps: true });

const Story = mongoose.model('stories', StoryChema);

module.exports = Story