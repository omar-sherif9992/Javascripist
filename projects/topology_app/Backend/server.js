//jshint esversion:6
//Modules
import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url';
import topology from './api/topology.route.js'
import bodyParser from 'body-parser'
const port = 8080; //note :form action should be written in it the route
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.json());//this will allow us to parse json because our server will send and recieve json and no need for body-parse
app.use(express.static(path.join(__dirname, 'public'))); // 
app.use(cors());//this is the cor middleware

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',"*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/', topology);
app.use("*", (req, res) => res.status(404).json({ error: "No API was found" }));// if the route didnt exist in the route folder



//404 page
app.use((req, res) => {
    res.status(404).json("Error : No API was found");
});


export default app;