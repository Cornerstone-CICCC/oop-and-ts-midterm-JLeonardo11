import { Component } from "../common/Component.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] }; 
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart); 
  }

  updateCart(cart) {
    this.state.cart = cart;
    this.render(); 
  }

  render() {
    let aside = document.querySelector("aside");
    if (!aside) {
      aside = document.createElement("aside");
      aside.id = "cart-aside";
      document.body.appendChild(aside); 
    }

    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";

    const title = document.createElement("h2");
    title.textContent = "Shopping Cart";
    cartContainer.appendChild(title);

    const itemList = document.createElement("ul");
    itemList.className = "cart-items";

    this.state.cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "cart-item";

      listItem.innerHTML = `
        <span>${item.name || "No name available"}</span>
        <div class="quantity-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
        </div>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      `;

      listItem.querySelector(".increase-btn").addEventListener("click", () => {
        this.props.cartContext.updateQuantity(item.id, item.quantity + 1);
      });

      listItem.querySelector(".decrease-btn").addEventListener("click", () => {
        if (item.quantity > 1) {
          this.props.cartContext.updateQuantity(item.id, item.quantity - 1);
        }
      });

      listItem.querySelector(".remove-btn").addEventListener("click", () => {
        this.props.cartContext.removeProduct(item.id);
      });

      itemList.appendChild(listItem);
    });

    cartContainer.appendChild(itemList);

    // Totales
    const totals = document.createElement("div");
    totals.className = "cart-totals";
    totals.innerHTML = `
      <p>Total Items: ${this.props.cartContext.getTotalItems()}</p>
      <p>Total Price: $${this.props.cartContext.getTotalPrice()}</p>
    `;
    cartContainer.appendChild(totals);

    const existingContainer = aside.querySelector(".cart-container");
    if (existingContainer) {
      existingContainer.replaceWith(cartContainer);
    } else {
      aside.appendChild(cartContainer);
    }

    return cartContainer;
  }
}