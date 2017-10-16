'use strict'

const express = require('express');
const app = express();
const path = require('path');
const mongoose      = require('mongoose');
const bodyParser = require('body-parser');
const dotenv        = require('dotenv/config');

//Connecting to Mongo Database
require('./api/data/db.js');


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname+'/public'));
app.use('/node_modules', express.static(__dirname +'/node_modules'));

//Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());


//Routing
const routes = require('./api/routes');
app.use('/api/', routes);




//Listen for requests
const server = app.listen(app.get('port'), ()=>{
	const port = server.address().port;
	console.log('Magic happens on port ' + port);	
});


