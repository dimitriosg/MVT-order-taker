import React from 'react';
import { ListGroup } from 'react-bootstrap';

function OrdersSummary() {
  const orders = ['Order 1', 'Order 2', 'Order 3'];  // Example orders

  return (
    <ListGroup>
      {orders.map(order => (
        <ListGroup.Item key={order}>{order}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default OrdersSummary;
