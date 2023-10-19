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
  isProductDeleted: false,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const numberOfProductsInCart = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setCartCount(numberOfProductsInCart);
  }, [cartItems]);

  useEffect(() => {
    const cartItemsSum = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotal(cartItemsSum);
  }, [cartItems]);

  const decreaseProductQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: --item.quantity }
        : item
    );
    setCartItems(updatedCart);
  };

  const increaseProductQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: ++item.quantity } : item
    );
    setCartItems(updatedCart);
  };

  const deleteCartProduct = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    decreaseProductQuantity,
    increaseProductQuantity,
    deleteCartProduct,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
