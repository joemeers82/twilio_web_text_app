const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
	name:{
		type:String
	},
	number:{
		type:String
	}
});

module.exports = mongoose.model('Contact',contactSchema);