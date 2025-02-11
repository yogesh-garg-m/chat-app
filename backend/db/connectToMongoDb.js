const mongoose = require("mongoose");

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Error connecting to mongoDb: ", error.message);
    }
}

module.exports = connectToMongoDb;