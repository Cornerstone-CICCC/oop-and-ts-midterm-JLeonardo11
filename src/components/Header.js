import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("header");
    header.innerHTML = `
      <div class="Logo">
        <h1>Corner🛒Shop</h1>
      </div>
      <nav>
        <a href="#" class="nav-category" data-category="">Home</a>
        <a href="#" class="nav-category" data-category="electronics">Electronics</a>
        <a href="#" class="nav-category" data-category="men's clothing">Fashion</a>
        <a href="#" class="nav-category" data-category="women's clothing">Sports & Outdoors</a>
      </nav>
      <div class="icons">
        <div class="CartIcon">
          <img src="/src/Shopping_cart.svg" alt="Cart"/>
        </div>
        <div class="UserIcon">
          <img src="/src/User_Profile.svg" alt="User"/>
        </div>
      </div>
    `;

    header.querySelectorAll(".nav-category").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        window.dispatchEvent(new CustomEvent("categoryChange", { detail: { category } }));
      });
    });

    return header;
  }
}
