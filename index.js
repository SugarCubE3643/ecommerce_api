// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const productRoutes = require('./routes/api/v1/products');
const mongoose = require('./config/mongoose'); // Import Mongoose configuration
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
