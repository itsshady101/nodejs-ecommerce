const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/user');


mongoose.connect(process.env.DB_URL, (err) => {
	if (err) { 
		console.error(err);
	} else {
		console.log('connected :)');
	}
})

// Middlewares
app.use(morgan('dev')); // morgan
app.use(bodyParser.json()); // bodyparser
app.use(bodyParser.urlencoded({extended: true}));

app.post('/create-user', (req, res) => {
	let user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save((err) => {
		if (err) return next(err);
		res.json('User created');
	})
})

app.listen(3000, (err) => {
	if(err) throw err;
	console.log('Server is running');
});