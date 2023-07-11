const handleRequest = require('./handleRequest.js')
const dotenv = require('dotenv');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
dotenv.config();

console.log(`Your API key is ${process.env.PIXABY_KEY}`);

const port = 3000;
app.listen(port, listening);

function listening() {
    console.log('Server is running at http://localhost:' + port + '...');
}

// Get Route
app.get('/recent', function (req, res) {
    res.status(200).send(handleRequest.projectData);
});

// Post Route

app.post('/search', handleRequest.searchLocation)

