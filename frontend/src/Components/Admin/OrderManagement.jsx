import React, { useState } from "react";

function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      items: [
        { name: "Cappuccino", quantity: 2, price: 4.5 },
        { name: "Croissant", quantity: 1, price: 3.25 },
      ],
      total: 12.25,
      status: "Completed",
      timestamp: "2025-03-23T10:23:45",
    },
    {
      id: 2,
      customer: "Jane Smith",
      items: [
        { name: "Green Tea", quantity: 1, price: 3.5 },
        { name: "Avocado Toast", quantity: 1, price: 8.95 },
      ],
      total: 12.45,
      status: "In Progress",
      timestamp: "2025-03-23T11:15:20",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      items: [
        { name: "Blueberry Muffin", quantity: 2, price: 3.75 },
        { name: "Cappuccino", quantity: 2, price: 4.5 },
      ],
      total: 16.5,
      status: "Pending",
      timestamp: "2025-03-23T11:45:10",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Order Management</h1>

      <div className="card" style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by order ID or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label>Filter by Status</label>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items.length} items</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{new Date(order.timestamp).toLocaleString()}</td>
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      backgroundColor:
                        order.status === "Completed"
                          ? "#d4edda"
                          : order.status === "Pending"
                          ? "#fff3cd"
                          : order.status === "Cancelled"
                          ? "#f8d7da"
                          : "#cce5ff",
                      color:
                        order.status === "Completed"
                          ? "#155724"
                          : order.status === "Pending"
                          ? "#856404"
                          : order.status === "Cancelled"
                          ? "#721c24"
                          : "#004085",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: "5px" }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>Order #{selectedOrder.id} Details</h2>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {new Date(selectedOrder.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
            </div>

            <h3>Items</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={{ textAlign: "right" }}>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>${selectedOrder.total.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
              <h3>Update Status</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn"
                  style={{ backgroundColor: "#fff3cd", color: "#856404" }}
                  onClick={() =>
                    handleUpdateStatus(selectedOrder.id, "Pending")
                  }
                  disabled={selectedOrder.status === "Pending"}
                >
                  Pending
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#cce5ff", color: "#004085" }}
                  onClick={() =>
                    handleUpdateStatus(selectedOrder.id, "In Progress")
                  }
                  disabled={selectedOrder.status === "In Progress"}
                >
                  In Progress
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#d4edda", color: "#155724" }}
                  onClick={() =>
                    handleUpdateStatus(selectedOrder.id, "Completed")
                  }
                  disabled={selectedOrder.status === "Completed"}
                >
                  Completed
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
                  onClick={() =>
                    handleUpdateStatus(selectedOrder.id, "Cancelled")
                  }
                  disabled={selectedOrder.status === "Cancelled"}
                >
                  Cancelled
                </button>
              </div>
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                className="btn btn-primary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
