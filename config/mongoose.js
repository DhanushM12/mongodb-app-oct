const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/subscriberoctdb');

const db = mongoose.connection;

db.on('error', console.log.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Successfully connected to MongoDB Database');
})

module.exports = db;


