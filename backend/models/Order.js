// models/Orders.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  waiterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cashierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Sent', 'In Progress', 'READY!', 'COMPLETE', 'Cancelled'],
    default: 'sent'
  },
  statusLog: [
    {
      status: String,
      changedBy: mongoose.Schema.Types.ObjectId,
      changedAt: Date
    }
  ]
});

export default mongoose.model('Order', OrderSchema);
