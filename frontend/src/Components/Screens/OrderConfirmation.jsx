import React from 'react';
import '../Styles/OrderConfirmation.css';

const OrderConfirmation = ({ orderDetails, onClose }) => {
  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <h3>Order Details:</h3>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Amount: ₹{orderDetails.totalAmount}</p>
      <p>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default OrderConfirmation;
