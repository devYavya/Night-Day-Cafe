import React, { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import Sidenav from "./Sidenav";
import LoadingScreen from "./LoadinDas";
import {
  FaShoppingCart,
  FaHourglassHalf,
  FaDollarSign,
  FaUsers,
  FaBars,
  FaStar,
  FaClock,
  FaUtensils,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";

const mockOrderData = [
  { date: "Mon", orders: 10 },
  { date: "Tue", orders: 14 },
  { date: "Wed", orders: 8 },
  { date: "Thu", orders: 17 },
  { date: "Fri", orders: 20 },
  { date: "Sat", orders: 24 },
  { date: "Sun", orders: 18 },
];

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 250,
    pendingOrders: 0,
    revenue: "₹34000.00",
    customers: 250,
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchStats = async () => {
        try {
          const response = await apiService.getDashboardStats();
          setStats(response);
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="layout-container gradient-bg">
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidenav />
      </div>

      <div className="dashboard-content fade-in">
        <h1 className="dashboard-title">📊 Dashboard Overview</h1>

        <div className="dashboard-stats">
          <div className="card glow">
            <FaShoppingCart className="card-icon" />
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="card glow">
            <FaHourglassHalf className="card-icon" />
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
          <div className="card glow">
            <FaDollarSign className="card-icon" />
            <h3>Revenue</h3>
            <p>{stats.revenue}</p>
          </div>
          <div className="card glow">
            <FaUsers className="card-icon" />
            <h3>Customers</h3>
            <p>{stats.customers}</p>
          </div>
        </div>

        <div className="chart-section glass-card">
          <h2 className="chart-title">📈 Orders This Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mockOrderData}
              margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-stats">
          <div className="card glow">
            <FaStar className="card-icon" />
            <h4>Top Item</h4>
            <p>Cold Coffee</p>
          </div>
          <div className="card glow">
            <FaClock className="card-icon" />
            <h4>Avg. Order Time</h4>
            <p>12 mins</p>
          </div>
          <div className="card glow">
            <FaUtensils className="card-icon" />
            <h4>Total Menu Items</h4>
            <p>145</p>
          </div>
          <div className="card glow">
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
