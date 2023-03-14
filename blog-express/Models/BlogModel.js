import mongoose from "mongoose";

const { Schema } = mongoose


const commentSchema = new Schema({
    text: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const BlogSchema = new Schema({
    title: String,
    body: String,
    like: {
        type: Boolean, 
        default: false,
    },
    save: {
        type: Boolean, 
        default: false,
    },
    comment: [commentSchema],
    isChecked: {
        type: Boolean,
        default: false,
    },
    createdBy: String,
})

export default new mongoose.model("Blogs", BlogSchema);