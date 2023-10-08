import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderID: String,
  waiterID: mongoose.Schema.Types.ObjectId,
  cashierID: mongoose.Schema.Types.ObjectId,
  waiterStatus: String,
  cashierStatus: String,
  cashAmount: Number,
  cashierModification: {
    modifiedAmount: Number,
    justification: String
  },
  statusLogs: [{
    status: String,
    changedBy: mongoose.Schema.Types.ObjectId,
    timestamp: Date
  }]
});

export default mongoose.model('Order', OrderSchema);
