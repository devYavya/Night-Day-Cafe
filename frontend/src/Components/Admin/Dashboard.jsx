import React, { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import "./Dashboard.css";
import Sidenav from "./Sidenav";
import LoadingScreen from "./LoadinDas";
import {
  FaShoppingCart,
  FaHourglassHalf,
  FaDollarSign,
  FaUsers,
  FaBars,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    revenue: "₹0.00",
    customers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use apiService to get stats from the backend
        const response = await apiService.getDashboardStats();
        setStats(response); // Set the stats to the state
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats(); // Call the function to fetch the stats
  }, []); // Empty dependency array means this runs only once, when the component mounts

  if (loading) return <LoadingScreen />; // Show loading screen until stats are fetched

  return (
    <div className="layout-container">
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidenav />
      </div>

      <div className="dashboard-content">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <h1 className="dashboard-title">📊 Dashboard Overview</h1>

        <div className="dashboard-stats">
          <div className="card">
            <FaShoppingCart className="card-icon" />
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="card">
            <FaHourglassHalf className="card-icon" />
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
          <div className="card">
            <FaDollarSign className="card-icon" />
            <h3>Revenue</h3>
            <p>{stats.revenue}</p>
          </div>
          <div className="card">
            <FaUsers className="card-icon" />
            <h3>Customers</h3>
            <p>{stats.customers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
