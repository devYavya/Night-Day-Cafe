import React, { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import "./Dashboard.css";
import Sidenav from "./Sidenav";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    revenue: "$0.00",
    customers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="dashboard-container">
      <Sidenav />
      <div className="dashboard-content">
        <h1>Dashboard</h1>

        <div className="dashboard-stats">
          <div className="card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>{stats.revenue}</p>
          </div>
          <div className="card">
            <h3>Customers</h3>
            <p>{stats.customers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
