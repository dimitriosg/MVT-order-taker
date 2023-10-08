// src/dashboard/dashFunctions/OrderManager.js

import React from 'react';

const OrderManager = ({ table }) => {
    return (
        <div className="order-manager">
            <h2>Table: {table.name}</h2>
            {/* Display orders and controls for creating/updating orders here */}
        </div>
    );
};

export default OrderManager;
