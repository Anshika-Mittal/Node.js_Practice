const mongoose = require('mongoose')
// const mongoURL = process.env.mongoDB_URL_LOCAL
const mongoURL = process.env.mongoDB_URL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("MongoDB connected");
})

db.on('error',(err)=>{
    console.log("MongoDB error");
    console.log(err);
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

module.exports = db;