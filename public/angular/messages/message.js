angular.module('texter')

.controller('messageCtrl',messageCtrl);

function messageCtrl($http,$scope,$route,MessageService){
	const vm = this;

	//List Contacts
	MessageService.listContacts().then(function(response){
		vm.contacts = response.data;
	});

	//Get Messages Recieved
	MessageService.getMessages().then(function(response){
		vm.messages = response.data;
		console.log(vm.messages);

	});

	//Add Contact
	vm.addContact = function(name,number){
		const contact = {
			name   : name,
			number : number
		};

		MessageService.addContact(contact).then(function(response){
			console.log(response);
			$route.reload();
		});
	};

	//Delete Contact
	vm.deleteContact = function(contactId){
		MessageService.deleteContact(contactId).then(function(response){
			console.log(response);
		});
		$route.reload();
	};

	//Send Messages
	vm.sendMessage = function(contact,message){
		const messageData = {
			number  : contact.number,
			message : message
		};

		MessageService.sendMessage(messageData).then(function(response){
			console.log(response);
		});
		$route.reload();
	};

	//List Messages
	vm.showMessages = function(number){
		console.log(number);
		MessageService.getMessagesByNumber(number).then(function(response){
			vm.specific = response.data;
		});
	}
};