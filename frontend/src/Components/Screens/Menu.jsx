import React, { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Menu.css";
import { apiService } from "../../services/apiService";

const MenuItem = memo(({ item, onAddToCart }) => {
  return (
    <div className="menu-item">
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
  const [cart, setCart] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRefs = useRef({});

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
            category: category,
            active: item.Active,
          }));

        const transformedData = {
          coffee: normalizeItems(data.coffee, "coffee"),
          burgers: normalizeItems(data.burgers, "burgers"),
          drinks: normalizeItems(data.drinks, "drinks"),
          desserts: normalizeItems(data.desserts, "desserts"),
          tea: normalizeItems(data.tea, "tea"),
          sandwiches: normalizeItems(data.sandwiches, "sandwiches"),
          starters: normalizeItems(data.starters, "starters"),
          noodles: normalizeItems(data.noodles, "noodles"),
          momos: normalizeItems(data.momos, "momos"),
          chaat: normalizeItems(data.chaat, "chaat"),
          rice: normalizeItems(data.rice, "rice"),
          fries: normalizeItems(data.fries, "fries"),
          maggie: normalizeItems(data.maggie, "maggie"),
          pizza: normalizeItems(data.pizza, "pizza"),
          eggcourse: normalizeItems(data.eggcourse, "eggcourse"),
          sizzlers: normalizeItems(data.sizzlers, "sizzlers"),
          combos: normalizeItems(data.combos, "combos"),
        };

        setMenuData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.name === item.name && cartItem.category === item.category
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name && cartItem.category === item.category
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/CheckoutPage", { state: { cart } });
  };

  const scrollToCategory = (category) => {
    const sectionRef = sectionRefs.current[category];
    if (sectionRef) {
      sectionRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;
  if (!menuData) return <div>No menu items available</div>;

  const menuSections = [
    { title: "Coffee", items: menuData.coffee },
    { title: "Burgers", items: menuData.burgers },
    { title: "Drinks", items: menuData.drinks },
    { title: "Desserts", items: menuData.desserts },
    { title: "Tea", items: menuData.tea },
    { title: "Sandwiches", items: menuData.sandwiches },
    { title: "Starters", items: menuData.starters },
    { title: "Noodles", items: menuData.noodles },
    { title: "Momos", items: menuData.momos },
    { title: "Chaat", items: menuData.chaat },
    { title: "Rice", items: menuData.rice },
    { title: "Fries", items: menuData.fries },
    { title: "Maggie", items: menuData.maggie },
    { title: "Pizza", items: menuData.pizza },
    { title: "Egg Course", items: menuData.eggcourse },
    { title: "Sizzlers", items: menuData.sizzlers },
    { title: "Combos", items: menuData.combos },
  ];

  return (
    <div className="menu-page">
      <button className="back-button" onClick={handleBackToHome}>
        ← Back
      </button>
      <h1 className="menu-title">Our Menu</h1>

      <div className="category-navigation">
        {menuSections.map((section) => (
          <button
            key={section.title}
            onClick={() => scrollToCategory(section.title)}
            className="category-button"
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="cart-summary">
        <h3>
          Cart: {cart.reduce((total, item) => total + item.quantity, 0)} items
        </h3>
        <p>
          Total: ₹
          {cart
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        {cart.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>
            Get Your Bill
          </button>
        )}
      </div>

      {menuSections.map((section) => (
        <MenuSection
          key={section.title}
          title={section.title}
          items={section.items || []}
          onAddToCart={handleAddToCart}
          sectionRef={(el) => (sectionRefs.current[section.title] = el)}
        />
      ))}
    </div>
  );
};

export default memo(Menu);
