// controllers/roleController.js

import mongoose from 'mongoose';
import User from '../models/User.js';

export const getAllRoles = async (req, res) => {
    console.log(`CONSOLE: Entered getAllRoles function`);

    try {
        // Get the enum values from the User schema
        const roles = User.schema.path('role').enumValues;
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error:', error);  // Log the error to the console
        res.status(500).json({ message: error.message });
    }
};

