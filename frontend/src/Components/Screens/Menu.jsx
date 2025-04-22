import React, { memo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Menu.css";
import { apiService } from "../../services/apiService";
import LoadingScreen from "./Loadingscreen";

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
  const [showScrollButton, setShowScrollButton] = useState(false);

  const sectionRefs = useRef({});
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

  menuSections.forEach((title) => {
    sectionRefs.current[title] =
      sectionRefs.current[title] || React.createRef();
  });

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
        setTimeout(() => setLoading(false), 3000);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const scrollToCategory = (category) => {
    sectionRefs.current[category]?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => navigate("/");
  const handleCheckout = () => navigate("/CheckoutPage", { state: { cart } });

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;
  if (!menuData) return <div>No data available</div>;

  const formattedSections = menuSections.map((title) => ({
    title,
    items: menuData[title.toLowerCase().replace(" ", "")] || [],
  }));

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
            onClick={() => scrollToCategory(title)}
            className="category-button"
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

      {formattedSections.map((section) => (
        <MenuSection
          key={section.title}
          title={section.title}
          items={section.items}
          onAddToCart={handleAddToCart}
          sectionRef={sectionRefs.current[section.title]}
        />
      ))}

      {/* Scroll-to-top Button (Visible inside menu-page) */}
      {showScrollButton && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default memo(Menu);
