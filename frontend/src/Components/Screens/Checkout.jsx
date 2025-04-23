import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Checkout.css";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validatePhone = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  const handleConfirmOrder = async (e) => {
  e.preventDefault();

  if (!name.trim() || !phone.trim()) {
    toast.error("Please enter your name and phone number.");
    return;
  }

  if (!validatePhone(phone)) {
    toast.error("Please enter a valid 10-digit phone number.");
    return;
  }

  if (cart.length === 0) {
    toast.error("Cart is empty. Please add items before placing order.");
    return;
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderData = {
    customerName: name,
    customerPhone: phone,
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

  try {
    setLoading(true);
    await apiService.placeOrder(orderData);

    toast.success("Order placed successfully!");

    // Clear form fields
    setName("");
    setPhone("");

    // Redirect to confirmation page with order summary
    navigate("/order-confirmation", {
      state: {
        customerName: name,
        totalAmount,
        orderTime: new Date().toLocaleString(),
      },
    });
  } catch (err) {
    console.error("Error placing order:", err);
    toast.error("Failed to place order. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const handleBackToHome = () => navigate("/menu");

  return (
    <div className="checkout-page">
      <button className="back-button" onClick={handleBackToHome}>
        ← Back
      </button>
      <h1>Checkout</h1>
      <form onSubmit={handleConfirmOrder}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>
        <br />
        <label htmlFor="phone">
          Phone Number:
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </label>

        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} — ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>

        <p>
          <strong>Total:</strong> ₹{totalAmount}
        </p>

        <button className="confirm" type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
