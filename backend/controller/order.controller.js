// CRud orders

import Order from '../models/order.model.js';

// Create and Save a new Order
export const create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    // Create an Order
    const order = new Order({
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        total: req.body.total
    });

    // Save Order in the database
    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        else res.send(data);
    });
};

// Retrieve all Orders from the database.
export const findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
};

// Find a single Order with a orderId

export const findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Order with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
}

// Update a Order identified by the orderId in the request

export const update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Order.updateById(
        req.params.orderId,
        new Order(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.orderId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.orderId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Order with the specified orderId in the request

export const deleteOrder = (req, res) => {
    Order.remove(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Order with id " + req.params.orderId
                });
            }
        } else res.send({ message: `Order was deleted successfully!` });
    });
};