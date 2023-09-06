// Require the product model
const Product = require('../../../models/product');

// Create a new product and save it to the database
exports.createProduct = async (req, res) => {
    try {
        // Get the name and quantity from the request body
        const { name, quantity, ...extraFields } = req.body;

        // Validate the request body
        if (!name || typeof name !== 'string' || !quantity || typeof quantity !== 'number') {
            return res.status(400).json({ error: 'Invalid or empty request data' });
        }

        // Check if there are any extra fields in the request body
        if (Object.keys(extraFields).length > 0) {
            return res.status(400).json({ error: 'Extra fields in the request body are not allowed' });
        }

        // Create a new product instance with the name and quantity
        const product = new Product({ name, quantity });

        // Save the product to the database
        await product.save();

        // Send a 201 status code (status code for created) and the product as a response
        return res.status(201).json({
            data: {
                product: {
                    name: product.name,
                    quantity: product.quantity
                }
            }
        });

    } catch (error) {
        // console.log(error, error.name, error.code);
        // Handle specific errors and provide informative responses
        if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate key error (duplicate name)
            return res.status(400).json({ error: 'Product with the same name already exists' });
        } else {
            // Generic server error
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// List all the products from the database
exports.listProducts = async (req, res) => {
    try {
        // Find all the products from the database
        const products = await Product.find({}).select('-_id id name quantity'); // Exclude __v and _id fields

        // Manually reorder fields for each product
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity
        }));
        // Send the products as a response with a 200 OK status
        return res.status(200).json({
            data: {
                products: formattedProducts
            }
        });
    } catch (error) {
        // If there is an error, send a 500 status code and an error message as a response
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a product by its id from the database
exports.deleteProduct = async (req, res) => {
    try {
        // Get the id from the request parameters
        const { id } = req.params;

        // Find and delete the product by its id from the database
        const deletedProduct = await Product.findOneAndDelete({ id });

        // Check if the product exists in the database
        if (!deletedProduct) {
            // Product not found, respond with a 404 status and a message
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        // Send a message as a response
        return res.status(200).json({
            data: {
                message: 'Product deleted'
            }
        });

    } catch (error) {
        // If there is an error, send a 500 status code and an error message as a response
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Update the quantity of a product by its id from the database
exports.updateQuantity = async (req, res) => {
    try {
        // Get the id from the request parameters
        const { id } = req.params;

        // Get the number from the request query parameter
        const { number } = req.query;

        // Validate if the number is a valid integer
        const parsedNumber = parseInt(number);

        if (isNaN(parsedNumber) || parsedNumber === 0) {
            return res.status(400).json({ error: 'Invalid number parameter' });
        }

        // Find the product by its id from the database
        const product = await Product.findOne({ id });

        // If the product is not found, send a 404 status code and an error message
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }


        // Handling the case if the updated quantity is negative
        const updatedQuantity = product.quantity + parsedNumber;
        if (updatedQuantity < 0) {
            return res.status(400).json({ error: 'Invalid quantity after update' });
        }

        // Update the product quantity
        product.quantity = updatedQuantity;

        // Save the updated product to the database
        await product.save();

        // Send the product and a message as a response
        res.status(200).json({
            data: {
                product: {
                    id: product.id,
                    name: product.name,
                    quantity: product.quantity
                }
            },
            message: 'Updated successfully'
        });

    } catch (error) {
        // If there is an error, send a 500 status code and an error message as a response
        return res.status(500).json({ error: 'Internal server error' });
    }
};
