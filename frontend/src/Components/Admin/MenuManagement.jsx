import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import "../Styles/MenuManagement.css";
import Sidenav from "./Sidenav";

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
      } catch (err) {
        console.error(err);
        setError("Failed to load menu.");
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
      } else {
        const newId = Date.now().toString();
        await apiService.addMenuItem({ ...newItem, _id: newId });
        setMenuData((prev) => [...prev, { ...newItem, _id: newId }]);
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
      setError("Failed to save item.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteMenuItem(id);
      setMenuData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete item.");
    }
  };

  const handleEdit = (item) => {
    setNewItem(item);
    setEditingItem(item);
    setShowForm(true);
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          flex: "0 0 250px",
          overflowY: "auto",
          borderRight: "1px solid #ccc",
        }}
      >
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
                  value={newItem.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newItem.description || ""}
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
                  value={newItem.price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  <h3>{item.name}</h3>
                  <span className="price">₹{item.price}</span>
                </div>
                <p>{item.description}</p>
                <small>Category: {item.category}</small>
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
    </div>
  );
};

export default MenuManagement;
