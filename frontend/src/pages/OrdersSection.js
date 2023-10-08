// OrdersSection.js
export default function OrdersSection({ orders }) {
    return (
      <div>
        <h1>Orders</h1>
        <ul>
          {orders.map(order => (
            <li key={order.orderID}>
              Order ID: {order.orderID}, Status: {order.status}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  