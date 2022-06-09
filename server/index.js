const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;
const { trades } = require("./data/data");
const connectDB = require('./config/db');
connectDB()

const userRoutes = require('./routes/userRoutes');

// To accept JSON data
app.use(express.json()); 

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


// creating an end point "api"
//  If our react app makes a GET request to the route "api"
//      respond (using "res") with our JSON data
app.use('/api/user', userRoutes)


app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});