import express from "express";
import db from "./database.js";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import dotenv from "dotenv"


// Routes
import UserRoutes from "./routes/user.js"

// models

import Users from "./models/users.js"
import Events from "./models/events.js"
import Workshops from "./models/workshops.js"

mongoose.Promise=global.Promise;
 
dotenv.config()

const app = express();

app.use(express.static("uploads"));

app.use("/user",UserRoutes)




const server = http.createServer(app);


const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Listening at port ${port || 8000}`);
    console.log(db);
});