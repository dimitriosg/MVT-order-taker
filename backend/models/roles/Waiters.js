// models/roles/Waiters.js

import mongoose from 'mongoose';

const waiterSchema = new mongoose.Schema({
    waiterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    assignedCashier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cashier'
    },
    assignedTables: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Table'
        }
    ],
    isDumbwaiter: {
        type: Boolean,
        default: false
    }
});

const Waiter = mongoose.model('Waiter', waiterSchema);

export default Waiter;
