const mongoose = require("mongoose");
const mongooseUrl = "mongodb://localhost:27017/inotebook";

const dbConnect = async () => {
    try{
        let response = await mongoose.connect(mongooseUrl);
        console.log("Connected to the data base");
        return response;
    }catch(error){
        console.error("MongoDB Connection failed:",error);
        // process.exit(1);
    }
}

module.exports = dbConnect;