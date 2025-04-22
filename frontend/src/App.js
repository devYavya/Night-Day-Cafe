import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Preloader from "./Components/Screens/Preloader";
import "./App.css";
import Homepage from "./Components/Homepage";
import  Menu from "./Components/Screens/Menu";
import UnderConstruction from "./Components/Screens/UnderConstruction";
import OrderConfirmation from "./Components/Screens/OrderConfirmation";

// Admin Pages
import Login from "./Components/Admin/Login";
import BillingManagement from "./Components/Admin/BillingManagement";
import MenuManagement from "./Components/Admin/MenuManagement";
import CustomerManagement from "./Components/Admin/CustomerManagement";
import Dashboard from "./Components/Admin/Dashboard";
import CheckoutPage from "./Components/Screens/Checkout";
import { apiService } from "./services/apiService";

const AppWithRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const placeOrder = async (customerData) => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        customer: customerData,
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      await apiService.placeOrder(orderData);
      setCart([]);
      navigate("/order-confirmation");
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error("Order submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {location.pathname === "/" && <Preloader />}
      <Routes>
        <Route path="*" element={<navigate to="/" replace />} />
        {/* Customer Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/CheckoutPage"
          element={
            <CheckoutPage
              cart={cart}
              placeOrder={placeOrder}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmation
              orderDetails={{
                items: cart,
                totalAmount: cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                ),
                orderDate: new Date().toISOString(),
              }}
              onClose={() => navigate("/")}
            />
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/admin/billing"
          element={
            isLoggedIn ? <BillingManagement /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/admin/menu"
          element={
            isLoggedIn ? <MenuManagement /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/admin/customers"
          element={
            isLoggedIn ? (
              <CustomerManagement />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/admin/reports" element={<UnderConstruction />} />
        <Route path="/admin/settings" element={<UnderConstruction />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWithRouter />
  </Router>
);

export default App;
