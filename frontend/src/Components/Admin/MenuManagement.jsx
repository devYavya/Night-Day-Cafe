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
    Name: "",
    Description: "",
    Price: "",
    Category: "",
    Active: true,
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
        // Map Id to _id for consistency with frontend usage
        const mapped = flattened.map(item => ({ ...item, _id: item.Id }));
        setMenuData(mapped);
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
        const createdItem = await apiService.addMenuItem(newItem);
        // Map Id to _id for consistency
        const itemWithId = { ...createdItem, _id: createdItem.Id };
        setMenuData((prev) => [...prev, itemWithId]);
        toast.success("Item added successfully!"); // Success toast
      }

      setNewItem({
        Name: "",
        Description: "",
        Price: "",
        Category: "",
        Active: true,
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
    setNewItem(item);
    setEditingItem(item);
    setShowForm(true);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidenav */}
      <div>
        <Sidenav />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="admin-menu-page">
          <h1>Menu Management</h1>

          {/* Show "Add New Item" button if form is not visible */}
          <div className="top-actions">
            {!showForm && (
              <button className="add-new-btn" onClick={() => setShowForm(true)}>
                Add New Item
              </button>
            )}
          </div>

          {/* Show form if 'showForm' state is true */}
          {showForm && (
            <form className="menu-form" onSubmit={handleAddItem}>
              <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>

              {/* Item Name */}
              <div className="form-group">
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  id="name"
                  name="Name"
                  value={newItem.Name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="Description"
                  value={newItem.Description || "No Description"}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="Price"
                  value={newItem.Price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="Category"
                  value={newItem.Category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Active Status */}
              <div className="form-group">
                <label htmlFor="active">Active</label>
                <input
                  type="checkbox"
                  id="active"
                  name="Active"
                  checked={newItem.Active}
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
