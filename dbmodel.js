const mongoose = require("mongoose");

const login_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
module.exports = mongoose.model('login_schema',login_schema,'login_schema')