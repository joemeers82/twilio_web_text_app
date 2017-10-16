//Import mongoose module
const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/socketTexter';

//Default Connection
mongoose.Promise = global.Promise;
mongoose.connect(dburl);

//Get the default connection
const db = mongoose.connection;

db.on('connected',()=>{
	console.log('Mongoose connected to ' + dburl);
});

db.on('disconnected',()=>{
	console.log('Mongoose disconnected');
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


require('./contacts.model.js');


