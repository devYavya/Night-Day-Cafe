import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const customerName = state?.customerName || "Customer";
  const totalAmount = state?.totalAmount || 0;
  const orderTime = state?.orderTime || new Date().toLocaleString();

  return (
    <div className="order-confirmation">
      <h1>🎉 Order Confirmed!</h1>
      <p>
        Thank you, <strong>{customerName}</strong>!
      </p>
      <p>Your order has been placed successfully.</p>
      <p>
        <strong>Total:</strong> ₹{totalAmount}
      </p>
      <p>
        <strong>Time:</strong> {orderTime}
      </p>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default OrderConfirmation;
