const CartUtil = {
  fetchCartFromLocalStorage() {
    const cart = localStorage.getItem('mycart');
    return cart ? JSON.parse(cart) : [];
  },
  
  saveCartToLocalStorage(cart) {
    localStorage.setItem('mycart', JSON.stringify(cart));
  },
  
  clearCartFromLocalStorage() {
    localStorage.removeItem('mycart');
  },

  getTotal(cart) {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
};

export default CartUtil;