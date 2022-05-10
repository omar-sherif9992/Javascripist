//jshint esversion:6
//Modules
const bodyParser = require('body-parser'); //for accessing the request body
const cors = require('cors');
const port = 3000; //note :form action should be written in it the route
const express = require("express");




// Setup empty JS object to act as endpoint for all routes
projectData = {};



// Require Express to run server and routes

// Start up an instance of app
const app = express();
app.use(express.json());//this will allow us to parse json because our server will send and recieve json




/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());//this is the cor middleware

// Initialize the main project folder
app.use(express.static('website'));


// Routes
app.get("/all", (req, res) => {
    res.send(projectData);
})

app.post("/add", (req, res) => {
    const { temp, content, date } = req.body;

    projectData = { temp, content, date };
    console.log(projectData);



})


// Setup Server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});