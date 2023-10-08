// routes/menu.js

import express from 'express';
import MenuItem from '../models/MenuItem.js'; // assuming you have a MenuItem model

const router = express.Router();

// Fetch all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items.' });
    }
});

export default router;
