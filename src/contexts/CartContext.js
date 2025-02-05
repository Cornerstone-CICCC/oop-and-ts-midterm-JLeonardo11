export class CartContext {
    constructor() {
      this.cart = []; 
      this.listeners = []; 
    }
  
    getCart() {
      return this.cart;
    }
  
    addProduct(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        this.cart = this.cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        this.cart.push({
          id: product.id,
          name: product.name || "No name available", 
          price: product.price || 0, 
          description: product.description || "No description available", 
          quantity: 1,
        });
      }
  
      this.notifyListeners(); 
    }
  
    updateQuantity(productId, quantity) {
      this.cart = this.cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(1, quantity) }; 
        }
        return item;
      });
  
      this.notifyListeners();
    }
  
    removeProduct(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      this.notifyListeners();
    }
  
    getTotalItems() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    notifyListeners() {
      this.listeners.forEach((listener) => listener(this.cart));
    }
  }