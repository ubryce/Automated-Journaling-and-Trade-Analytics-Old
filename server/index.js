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
const journalRoutes = require('./routes/journalRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const tagRoutes = require('./routes/tagRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

// To accept JSON data
app.use(express.json()); 

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/user', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/tag', tagRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});