import mongoose from "mongoose";

const { Schema } = mongoose

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
})

export default new mongoose.model("Blogs", BlogSchema);