import mongoose from "mongoose";

const connect = async() => {
    await mongoose.connect('mongodb+srv://blog-react:9dQ4sSR3Ino8taXs@cluster0.kqfao1o.mongodb.net/?retryWrites=true&w=majority');
    console.log('server is connected to the database...');
}

export default connect;