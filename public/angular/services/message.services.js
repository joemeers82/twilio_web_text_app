angular
	.module("texter")
	.factory('MessageService',MessageService);

function MessageService($http){
	const api = {
		listContacts        : listContacts,
		addContact          : addContact,
		deleteContact       : deleteContact,
		sendMessage         : sendMessage,
		getMessages         : getMessages,
		getMessagesByNumber : getMessagesByNumber
	};
	return api;



	function addContact(contact){
		return $http.post('api/contacts',contact);
	}

	function listContacts(){
		return $http.get('api/contacts');
	}

	function deleteContact(contactId){
		return $http.delete('api/contacts/'+contactId);
	}

	function sendMessage(messageData){
		return $http.post('api/message/',messageData);
	}

	function getMessages(){
		return $http.get('api/message/');
	}

	function getMessagesByNumber(number){
		return $http.get('api/messages/'+number);
	}
}