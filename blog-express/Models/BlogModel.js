import mongoose from "mongoose";

const { Schema } = mongoose

const BlogSchema = new Schema({
    title: String,
    body: String,
})

export default new mongoose.model("Blogs", BlogSchema);