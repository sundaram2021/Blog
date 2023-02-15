import mongoose from "mongoose";

const { Schema } = mongoose

const RegistrationSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

export default new mongoose.model("Registration ", RegistrationSchema);