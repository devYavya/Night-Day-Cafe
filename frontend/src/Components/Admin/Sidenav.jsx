import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCreditCard,
  FaUtensils,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./AdminSidebar.css";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} />
      </div>

      <div className={`sidebar ${isOpen ? "active" : "hidden"}`}>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/billing">
              <FaCreditCard /> Billing Management
            </Link>
          </li>
          <li>
            <Link to="/admin/menu">
              <FaUtensils /> Menu Management
            </Link>
          </li>
          <li>
            <Link to="/admin/customers">
              <FaUsers /> CMS
            </Link>
          </li>
          <li>
            <Link to="/admin/reports">
              <FaFileAlt /> Your Report
            </Link>
          </li>
          <li>
            <Link to="/admin/settings">
              <FaCog /> Settings
            </Link>
          </li>
          <li>
            <Link to="/admin/logout">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
