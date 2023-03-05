import mongoose from "mongoose";

const  { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

export default new mongoose.model("User", UserSchema);
