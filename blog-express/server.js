import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Cors from 'cors';
import connect from './database/Mongodb.js';
import router from './routes/Register.js'
import router2 from './routes/Home.js';

const app = express();
const Port = process.env.Port || 4000;

app.use(express.json());
app.use(Cors());
app.use('/api',router);
app.use("/", router2);

connect();

app.listen(Port, () => console.log(`server running on port ${Port}...`))