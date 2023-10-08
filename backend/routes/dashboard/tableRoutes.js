// backend/routes/dashboard/tableRoutes.js
import express from 'express';
import Order from '../../models/Order.js';

const router = express.Router();

router.get('/table/:tableId', async (req, res) => {
    try {
        const orders = await Order.find({ table: req.params.tableId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.get('/api/tables', async (req, res) => {
    // Logic for fetching assigned tables
});

router.post('/table/:tableId', async (req, res) => {
    try {
        const newOrder = new Order({
            table: req.params.tableId,
            items: req.body.items,
        });
        const savedOrder = await newOrder.save();
        res.json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request', error });
    }
});

export default router;
