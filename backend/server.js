const express = require('express');
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes.js");
const cookieParser = require("cookie-parser");
const connectToMongoDb = require("./db/connectToMongoDb.js");

const port = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectToMongoDb();
})