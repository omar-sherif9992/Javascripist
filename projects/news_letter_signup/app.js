const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const app = express();
const apiKey = "//";
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); // to be able to parsing into post request


app.get('/', function(req, res) {

    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName, lastName, email);


});

const port = 3000;
//note :form action should be written in it the route


app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`)
});
