import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connect from "./database/Mongodb.js";
import router from "./routes/Register.js";
import router2 from "./routes/Home.js";

const app = express();
const Port = process.env.Port || 4000;
const allowedOrigins = ['http://localhost:3000', 'http://example.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use("/api", router);
app.use("/", router2);

await connect();

app.listen(Port, () => console.log(`server running on port ${Port}...`));
