import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import "../Styles/MenuManagement.css";
import Sidenav from "./Sidenav";
import LoadingScreen from "./LoadinDas";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify

const MenuManagement = () => {
  const [menuData, setMenuData] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true,
  });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await apiService.getMenuItems();
        const flattened = Array.isArray(data)
          ? data
          : Object.values(data).flat();
        setMenuData(flattened);
        toast.success("Menu loaded successfully!"); // Success toast
      } catch (err) {
        console.error(err);
        toast.error("Failed to load menu."); // Error toast
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await apiService.updateMenuItem(editingItem._id, newItem);
        setMenuData((prev) =>
          prev.map((item) =>
            item._id === editingItem._id ? { ...item, ...newItem } : item
          )
        );
        toast.success("Item updated successfully!"); // Success toast
      } else {
        const newId = Date.now().toString();
        await apiService.addMenuItem({ ...newItem, _id: newId });
        setMenuData((prev) => [...prev, { ...newItem, _id: newId }]);
        toast.success("Item added successfully!"); // Success toast
      }

      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "",
        active: true,
      });
      setEditingItem(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save item."); // Error toast
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteMenuItem(id);
      setMenuData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item deleted successfully!"); // Success toast
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item."); // Error toast
    }
  };

  const handleEdit = (item) => {
    setNewItem({
      name: item.Name,
      description: item.Description,
      price: item.Price,
      category: item.Category, // Set category for editing
      active: item.Active,
    });
    setEditingItem(item);
    setShowForm(true);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div>
        <Sidenav />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="admin-menu-page">
          <h1>Menu Management</h1>
          <div className="top-actions">
            {!showForm && (
              <button className="add-new-btn" onClick={() => setShowForm(true)}>
                Add New Item
              </button>
            )}
          </div>
          {showForm && (
            <form className="menu-form" onSubmit={handleAddItem}>
              <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newItem.Description || "No Description"}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newItem.Price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newItem.Category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Tea">Tea</option>
                  <option value="Sandwiches">Sandwiches</option>
                  <option value="Starters">Starters</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Momos">Momos</option>
                  <option value="Chaat">Chaat</option>
                  <option value="Rice">Rice</option>
                  <option value="Fries">Fries</option>
                  <option value="Maggie">Maggie</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Egg Course">Egg Course</option>
                  <option value="Sizzlers">Sizzlers</option>
                  <option value="Combos">Combos</option>
                </select>
              </div>

              {/* Active Status */}
              <div className="form-group">
                <label htmlFor="active">Active</label>
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={newItem.active}
                  onChange={handleChange}
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="save-btn">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setNewItem({
                      name: "",
                      description: "",
                      price: "",
                      category: "",
                      active: true,
                    });
                    setEditingItem(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <h2>Menu Items</h2>
          <div className="menu-items">
            {menuData.map((item) => (
              <div className="menu-item" key={item._id}>
                <div className="item-header">
                  <h3>{item.Name}</h3>
                  <span className="price">₹{item.Price}</span>
                </div>
                <p>{item.Description}</p>
                <small>Category: {item.Category}</small>
                <div className="item-actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default MenuManagement;
