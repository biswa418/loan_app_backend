const mongoose = require('mongoose');

//warning supress
mongoose.set('strictQuery', false);

//local db
mongoose.connect(`mongodb://127.0.0.1:27017/loan_application`);
const db = mongoose.connection;

//exception
db.on('error', console.log.bind(console, "Error connecting to db"));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

module.exports = db;

