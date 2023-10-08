// routes/orders.js

import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Fetch orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ waiterID: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders.' });
    }
});

export default router;
