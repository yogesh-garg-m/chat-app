const express = require('express');
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes")
const connectToMongoDb = require("./db/connectToMongoDb.js")

const port = process.env.PORT || 5000;

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectToMongoDb();
})