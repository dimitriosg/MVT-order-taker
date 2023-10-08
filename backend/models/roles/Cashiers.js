// models/roles/Cashiers.js

import mongoose from 'mongoose';

const cashierSchema = new mongoose.Schema({
    cashierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    assignedWaiters: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Waiter'
    }
    ],
    isDumbcashier: {
        type: Boolean,
        default: false
    }
});

const Cashier = mongoose.model('Cashier', cashierSchema);

export default Cashier;
