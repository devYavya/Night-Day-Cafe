import React, { useState } from "react";
import "../Styles/Checkout.css";

const CheckoutPage = ({ cart, placeOrder }) => {
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      await placeOrder(customer); 
    } catch (err) {
      setError("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-card">
        <h2 className="section-title">Customer Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customer.name}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={customer.phone}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>

      <div className="checkout-card">
        <h2 className="section-title">Order Summary</h2>
        {!Array.isArray(cart) || cart.length === 0 ? (
          <p className="empty-cart">No items in your cart.</p>
        ) : (
          cart.map((item, index) => (
            <p key={item.id || index} className="order-item">
              {item.name} x {item.quantity} = ₹{item.price * item.quantity || 0}
            </p>
          ))
        )}
        <p className="total-price">
          Total: ₹
          {Array.isArray(cart)
            ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
            : 0}
        </p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        className="checkout-button"
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
