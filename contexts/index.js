import { useContext, createContext, useState, useEffect } from "react";
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
  });

  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleCartOpen = () => {
    setIsBackdropOpen(true);
    document.body.style.maxHeight = "100vh";
  };

  const handleCartClose = () => {
    setIsBackdropOpen(false);
    document.body.style.maxHeight = null;
  };

  const handleAddToCart = (product, quantity) => {
    const existedProduct = cartList.find((item) => item.slug === product.slug);
    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQty((prev) => prev + quantity);
    if (existedProduct) {
      setCartList(() => {
        return cartList.map((item) => {
          if (item.slug === product.slug) {
            return { ...item, qty: item.qty + quantity };
          }
          return item;
        });
      });
    } else {
      setCartList((prev) => [...prev, { ...product, qty: quantity }]);
    }
  };
  // add qty per click 'plus'

  const handleAddQty = (product) => {
    setTotalQty((prev) => prev + 1);
    setTotalPrice((prev) => prev + product.price);
    setCartList(() => {
      return cartList.map((item) => {
        if (item.slug === product.slug) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
    });
  };

  // subtract qty per click 'minus'

  const handleSubtractQty = (product) => {
    const existedProduct = cartList.find((item) => item.slug === product.slug);
    setTotalQty((prev) => prev - 1);
    setTotalPrice((prev) => prev - product.price);
    if (existedProduct.qty - 1 < 1) {
      setCartList(cartList.filter((item) => item.slug !== existedProduct.slug));
    } else {
      setCartList(() => {
        return cartList.map((item) => {
          if (item.slug === product.slug) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        });
      });
    }
  };

  //total price

  const contextValue = {
    handleCartOpen,
    handleCartClose,
    isBackdropOpen,
    handleAddToCart,
    handleAddQty,
    cartList,
    totalQty,
    handleSubtractQty,
    totalPrice,
    handleToggleTheme,
    theme,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
