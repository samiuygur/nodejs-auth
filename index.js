const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('connected to db')
);

//Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3001, () => console.log('Server up and running'));