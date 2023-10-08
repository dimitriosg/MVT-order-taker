// actions/orderActions.js
import Order from '../models/Orders.js';

export const createOrder = async (data) => {
    const { tableId, waiterID, cashierID, items, totalAmount } = data;
    
    const newOrder = new Order({
        tableId,
        waiterID,
        cashierID,
        items,
        totalAmount
    });
    
    try {
        const savedOrder = await newOrder.save();
        return savedOrder;
    } catch (error) {
        throw new Error("Error creating order: " + error.message);
    }
};

export const updateOrderStatus = async (orderId, status, userId) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        order.status = status;
        order.statusLog.push({
            status,
            changedBy: userId,
            changedAt: new Date()
        });

        const updatedOrder = await order.save();
        return updatedOrder;
    } catch (error) {
        throw new Error("Error updating order status: " + error.message);
    }
};
