// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const env = require('./config/environment')
const logger = require('morgan');
const productRoutes = require('./routes/api/v1/products');
const mongoose = require('./config/mongoose'); // Import Mongoose configuration
const PORT = 8000;

const app = express();
app.use(express.json());
app.use(logger(env.morgan.mode, env.morgan.options));
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
