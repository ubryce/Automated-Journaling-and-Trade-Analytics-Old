const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;
const { trades } = require("./data/data");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


// creating an end point "api"
//  If our react app makes a GET request to the route "api"
//      respond (using "res") with our JSON data
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/trade", (req, res) => {
  res.send(trades);
});
app.get("/api/trade/:id", (req, res) => {
  //console.log(req.params.id);
  const singleTrade = trades.find(c=> c._id === req.params.id);
  res.send(singleTrade);
});


app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});