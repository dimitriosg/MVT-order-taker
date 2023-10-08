// models/Table.js
import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    number: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    waiterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Waiter'
    },
    status: {
        type: String,
        enum: ['FREE', 'OCCUPIED', 'RESERVED'],
        default: 'FREE'
    }
});

const Table = mongoose.model('Table', tableSchema);

export default Table;
