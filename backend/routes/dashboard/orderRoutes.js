// backend/routes/dashboard/orderRoutes.js
import express from 'express';
import Table from '../../models/Table.js';

const router = express.Router();

// Get Orders for a Specific Table
router.get('/:waiterId', async (req, res) => {
    try {
        const tables = await Table.find({ waiter: req.params.waiterId });
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

export default router;
