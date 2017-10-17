const express        = require('express');
const router         = express.Router();
const mongoose       = require('mongoose');

const ctrlMessage    = require('../Controllers/message.controller.js');

router
	.route('/contacts')
	.post(ctrlMessage.addContact)
	.get(ctrlMessage.listContacts);

router
	.route('/contacts/:contactId')
	.delete(ctrlMessage.deleteContact);

router
	.route('/message/')
	.post(ctrlMessage.sendMessage)
	.get(ctrlMessage.getNumbers);


router 
	.route('/messages/:number')
	.get(ctrlMessage.getMessagesByNumber);

router
	.route('/mynumber')
	.get(ctrlMessage.twilioNumber);
	
module.exports = router;