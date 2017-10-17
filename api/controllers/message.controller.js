const mongoose      = require('mongoose');
const Contact       = mongoose.model('Contact');
const dotenv        = require('dotenv/config');
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

const client        = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID, //Twilio Account Number
  process.env.TWILIO_AUTH_TOKEN   //Twilio Account Number
);

module.exports.twilioNumber = function(req,res){
	res.status(201).json(TWILIO_NUMBER);
}

//Get Active Message Phone Numbers
module.exports.getNumbers = function(req,res){
	client.messages.list(function(err, data) {
	    const messages  =[];
		data.forEach(function(message) {
    		if(message.from !== TWILIO_NUMBER){
    			messages.push(message.from);
    		}
	    });
	    const filteredMessages = Array.from(new Set(messages));
		if(err){
	    	res.status(400).json(err);
	    }
	    else{
	    	res.status(201).json(filteredMessages);
	    }
	    
	});
}

//Seperate Text Messages By Conversation
module.exports.getMessagesByNumber = function(req,res){
	const number = req.params.number;
	const recievedMessages = [];
	client.messages.list(function(err, data) {
		data.forEach(function(message) {
			if(message.from == number || message.to == number){
	        	recievedMessages.push({
	        		message : message.body,
	        		date    : message.dateCreated,
	        		from    : message.from,
	        		to      : message.to
	        	})
	        }
	    })
		if(err){
	    	res.status(400).json(err);
	    }
	    else{
	    	const allMessages = {
	    		recieved : recievedMessages
	    		
	    	};
			res.status(201).json(allMessages);
			console.log(allMessages);
	    }

    })
}

//Add New Contact 
module.exports.addContact = function(req,res){
	const name   = req.body.name;
	const number = req.body.number;

	const contact = {
		name   : name,
		number : number
	};

	Contact.create(contact,function(err,contact){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}
		else{
			console.log('contact created',contact);
			res.status(201).json(contact);
		}
	});
	
};

//List All Contacts
module.exports.listContacts = function(req,res){
	Contact.find()
	.exec(function(err,contact){
		if(err){
			console.log('error');
			res.status(400).json(err);
		}
		else{
			res.status(201).json(contact);
		}
	});
};

//Delete Contact
module.exports.deleteContact = function(req,res){
	const contactId = req.params.contactId;
	
	Contact.findByIdAndRemove(contactId,function(err,raw){
		if(err){
			res.send(err);
			console.log(err);
		}
		else{
			console.log(raw);
		}
	});
};

//Send Message
module.exports.sendMessage = function(req,res){
	const number = req.body.number;
	const message = req.body.message;
	client.messages.create({
	  	from: process.env.TWILIO_NUMBER,
  		to: "+"+number,
  		body: message
	},function(err,message){
		if(err){
			console.log(err);
		}
		else{
			console.log('hurrah! Message Sent. '+message);
		}
	})

}