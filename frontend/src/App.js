import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Preloader from "./Components/Screens/Preloader";
import "./App.css";
import Homepage from "./Components/Homepage";
import Menu from "./Components/Screens/Menu";
import OrderConfirmation from "./Components/Screens/OrderConfirmation";
import PaidService from "./Components/Screens/PaidService";

// Admin Pages
import Login from "./Components/Admin/Login";
import BillingManagement from "./Components/Admin/BillingManagement";
import MenuManagement from "./Components/Admin/MenuManagement";
// import CustomerManagement from "./Components/Admin/CustomerManagement";
import Dashboard from "./Components/Admin/Dashboard";
import CheckoutPage from "./Components/Screens/Checkout";
import { apiService } from "./services/apiService";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/admin/login" />;
};

const AppWithRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store the login state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false"); // Clear the login state
    navigate("/admin/login");
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

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/admin/login") {
      navigate("/admin/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return (
    <>
      {location.pathname === "/" && <Preloader />}
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* Customer Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/checkout"
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
          element={
            <ProtectedRoute element={<Dashboard onLogout={handleLogout} />} />
          }
        />
        <Route
          path="/admin/billing"
          element={<ProtectedRoute element={<BillingManagement />} />}
        />
        <Route
          path="/admin/menu"
          element={<ProtectedRoute element={<MenuManagement />} />}
        />
        <Route
          path="/admin/customers"
          element={<ProtectedRoute element={<PaidService />} />}
        />
        <Route path="/admin/reports" element={<PaidService />} />
        <Route path="/admin/settings" element={<PaidService />} />
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
