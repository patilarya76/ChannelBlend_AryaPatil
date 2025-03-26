import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (newCart) => {
    setCartCount(newCart.length);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        toast.info('This item is already in your cart!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return prevCart;
      }
      
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      updateCartCount(newCart);
      
      toast.success('Item added to cart!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item._id !== productId);
      updateCartCount(newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast.success('🎉 Congratulations! Your order has been placed successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    clearCart();
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      handleCheckout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}