// src/routes/menuItemsRoutes.js
import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { upload } from '../middleware/multer.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Assuming you have these middlewares set up.

const router = express.Router();

router.post('/addMenuItem', upload.single('image'), async (req, res) => {
    console.log(req.body);  // Should show your text fields
    console.log(req.file);  // Should show info about the uploaded file

    try {
        // const { name, price, description, category } = req.body;
        const imageUrl = req.file ? `/upload/${req.file.filename}` : undefined;

        const newItem = new MenuItem({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            imageUrl,
        });
        await newItem.save();
        res.status(201).json({ 
            success: true, 
            message: 'Menu item added successfully!', 
            data: newItem 
        });
    } catch (error) {
        console.log(`Req.headers: ${JSON.stringify(req.headers)}`);
        console.log(`Req.headers['content-type']: ${req.headers['content-type']}`);
        console.error("Error while adding the item:", error); // Log the error for debugging
        res.status(500).json({ 
            success: false, 
            error: `Failed to add the item. Reason: ${error.message}.` 
        });
    }
});

router.delete('/removeMenuItem/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const result = await MenuItem.findByIdAndDelete(itemId);

        if (!result) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.status(200).json({ message: 'Item removed successfully.' });
    } catch (error) {
        console.error(error);  // Log the detailed error for debugging
        res.status(500).json({ error: 'Failed to remove the item.', details: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
    }
        const items = await MenuItem.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items.' });
    }
});


router.get('/categories', async (req, res) => {
    try {
        const categories = await MenuItem.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories.' });
    }
});

export default router;