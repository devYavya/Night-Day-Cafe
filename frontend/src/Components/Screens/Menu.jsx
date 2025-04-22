import React, { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Menu.css";
import { apiService } from "../../services/apiService";
import LoadingScreen from "./Loadingscreen";

const MenuItem = memo(({ item, onAddToCart }) => {
  return (
    <div className="menu-item fade-in">
      <div className="item-header">
        <h3>{item.name}</h3>
        <span className="price">₹{item.price}</span>
      </div>
      <p>{item.description || "No description available."}</p>
      <button className="add-to-cart-btn" onClick={() => onAddToCart(item)}>
        Order Now
      </button>
    </div>
  );
});

const MenuSection = memo(({ title, items, onAddToCart, sectionRef }) => (
  <section className="menu-section" ref={sectionRef}>
    <h2>{title}</h2>
    <div className="menu-items">
      {items.map((item, index) => (
        <MenuItem
          key={`${title}-${index}`}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  </section>
));

const Menu = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Coffee");

  const menuSections = [
    "Coffee",
    "Burgers",
    "Drinks",
    "Desserts",
    "Tea",
    "Sandwiches",
    "Starters",
    "Noodles",
    "Momos",
    "Chaat",
    "Rice",
    "Fries",
    "Maggie",
    "Pizza",
    "Egg Course",
    "Sizzlers",
    "Combos",
  ];

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await apiService.getMenuItems();
        const normalizeItems = (items, category) =>
          (items || []).map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.Price,
            description: item.Description,
            category,
            active: item.Active,
          }));

        const transformedData = {};
        for (const section of menuSections) {
          transformedData[section.toLowerCase().replace(" ", "")] =
            normalizeItems(
              data[section.toLowerCase().replace(" ", "")],
              section
            );
        }

        setMenuData(transformedData);
        setTimeout(() => setLoading(false), 6000);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setLoading(false), 6000);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.name === item.name && i.category === item.category
      );
      return existing
        ? prev.map((i) =>
            i.name === item.name && i.category === item.category
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleCheckout = () => navigate("/CheckoutPage", { state: { cart } });
  const handleBackToHome = () => navigate("/");

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;
  if (!menuData) return <div>No data available</div>;

  return (
    <div className="menu-page">
      <button className="back-button" onClick={handleBackToHome}>
        ← Back
      </button>
      <h1 className="menu-title">Our Menu</h1>

      <div className="category-navigation">
        {menuSections.map((title) => (
          <button
            key={title}
            onClick={() => setActiveCategory(title)}
            className={`category-button ${
              activeCategory === title ? "active" : ""
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Cart: {cart.reduce((t, i) => t + i.quantity, 0)} items</h3>
        <p>
          Total: ₹
          {cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}
        </p>
        {cart.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>
            Get Your Bill
          </button>
        )}
      </div>

      <div className="menu-sections-wrapper">
        <MenuSection
          key={activeCategory}
          title={activeCategory}
          items={menuData[activeCategory.toLowerCase().replace(" ", "")] || []}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default memo(Menu);
