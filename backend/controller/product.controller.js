// CRUD product
import Product from '../models/product.model.js';

// Create and Save a new Product
export const create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
        message: 'Product name can not be empty',
        });
    }
    
    // Create a Product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description : req.body.description,
        images: req.body.images,
        quantity: req.body.quantity,
    });
    
    // Save Product in the database
    product
        .save()
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Product.',
        });
        });
    }

// Retrieve and return all products from the database.
export const findAll = (req, res) => {
    Product.find()
        .then((products) => {
        res.send(products);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving products.',
        });
        });
    }

// Find a single product with a productId
export const findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then((product) => {
        if (!product) {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        res.send(product);
        })
        .catch((err) => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        return res.status(500).send({
            message: 'Error retrieving product with id ' + req.params.productId,
        });
        });
    }

// Update a product identified by the productId in the request
export const update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
        message: 'Product name can not be empty',
        });
    }
    
    // Find product and update it with the request body
    Product.findByIdAndUpdate(
        req.params.productId,
        {
        name: req.body.name,
        price: req.body.price,
        description : req.body.description,
        images: req.body.images,
        quantity: req.body.quantity,
        },
        { new: true }
    )
        .then((product) => {
        if (!product) {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        res.send(product);
        })
        .catch((err) => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        return res.status(500).send({
            message: 'Error updating product with id ' + req.params.productId,
        });
        });
    }

// Delete a product with the specified productId in the request
export const deleteOne = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then((product) => {
        if (!product) {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        res.send({ message: 'Product deleted successfully!' });
        })
        .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
            message: 'Product not found with id ' + req.params.productId,
            });
        }
        return res.status(500).send({
            message: 'Could not delete product with id ' + req.params.productId,
        });
        });
    }
