require("dotenv").config();
const mongoose = require("mongoose")
const url = process.env.mongourl;
const connectdb = ()=>{
    return mongoose.connect(url);
}

module.exports = connectdb;