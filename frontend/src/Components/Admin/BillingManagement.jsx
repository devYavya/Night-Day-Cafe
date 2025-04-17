import React, { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import "../Styles/BillingManagement.css";
import Sidenav from "./Sidenav";

const BillingManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeOrder = (order) => {
    const items = Array.isArray(order.Items) ? order.Items : [];

    return {
      id: order._id?.$oid || "N/A",
      customer: order.UserId || "Guest",
      table: order.TableNumber || "N/A",
      type: order.OrderType || "N/A",
      status: parseInt(order.Status?.$numberInt || "0"),
      total: parseFloat(order.TotalAmount || "0"),
      date: order.OrderDate?.$date?.$numberLong
        ? new Date(parseInt(order.OrderDate.$date.$numberLong))
        : new Date(),
      items: items.map((item) => ({
        name: item.Name,
        quantity: parseInt(item.Quantity?.$numberInt || "1"),
        price: parseFloat(item.Price?.$numberDecimal || "0"),
      })),
    };
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const rawOrders = await apiService.getOrders();
        const formatted = (rawOrders || []).map(normalizeOrder);
        setOrders(formatted);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="billing-management-container">
      <Sidenav />
      <div className="billing-content-container">
        <h2 className="billing-header">Billing Management</h2>

        <div className="billing-container">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-title">Table: {order.table}</div>
              <div className="order-detail">Type: {order.type}</div>
              <div className="order-detail">Amount: ₹{order.total}</div>
              <div className="order-detail">
                Date: {order.date.toLocaleString()}
              </div>

              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className={`status-badge status-${order.status}`}>
                {order.status === 0
                  ? "Pending"
                  : order.status === 1
                  ? "Completed"
                  : "Cancelled"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingManagement;
