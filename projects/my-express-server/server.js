//jshint esversion:6
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');// for getting the request body req.body.weight 
app.use(bodyParser.urlencoded({ extended: true }));

var result = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');//__dirname it gets the directory name

});
app.post('/', (req, res) => {
    var h = Number(req.body.height);
    var w = Number(req.body.weight);




    res.send("Your BMI" + (h * w / 2));

});
app.get('/results', function(req, res) {

    var x = $('#text').text;
    res.sendFile(__dirname + 'index.html');
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
