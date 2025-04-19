import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const handleConfirmOrder = async () => {
    try {
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderData = {
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
        })),
        totalAmount,
        orderDate: new Date().toISOString(),
        status: 0,
        tableNumber: "Table 1",
        orderType: "dine-in",
      };

      await apiService.placeOrder(orderData);
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} × {item.quantity} — ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total:</strong> ₹
        {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      </p>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default CheckoutPage;
