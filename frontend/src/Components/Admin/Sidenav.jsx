import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`sidebar ${isOpen ? "active" : "hidden"}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/billing">💳 Billing Management</Link>
          </li>
          <li>
            <Link to="/admin/menu">🍽️ Menu Management</Link>
          </li>
          <li>
            <Link to="/admin/customers">👥 Customer Management</Link>
          </li>
          <li>
            <Link to="/admin/logout">🚪 Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
