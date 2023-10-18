import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.findIndex(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem === -1) {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  } else {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: ++item.quantity }
        : item
    );
    return updatedCartItems;
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const numberOfProductsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(numberOfProductsInCart);
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
