import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.productList = new ProductList({ cartContext: this.props.cartContext });
  }

  fetchProducts(category = "all") {
    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url += `/category/${category}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.productList.updateProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  render() {
    const appContainer = document.createElement("div");
    appContainer.className = "app-container";

    // Header
    const header = new Header().render();
    appContainer.appendChild(header);

    // Listen for category clicks
    header.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const category = event.target.dataset.category;
        this.fetchProducts(category);
      });
    });

    // Main Content Area (Products + Cart)
    const mainContent = document.createElement("div");
    mainContent.className = "main-content";

    const productSection = document.createElement("main");
    productSection.className = "product-section";
    this.productList.mount(productSection);

    const cartSection = document.createElement("aside");
    cartSection.className = "cart-section hidden";
    const cartList = new CartList({ cartContext: this.props.cartContext }).render();
    cartSection.appendChild(cartList);

    mainContent.appendChild(productSection);
    mainContent.appendChild(cartSection);
    appContainer.appendChild(mainContent);

    // Footer
    const footer = new Footer().render();
    appContainer.appendChild(footer);

    // Cart Toggle Logic
    const cartIcon = header.querySelector(".CartIcon");
    cartIcon?.addEventListener("click", () => {
      cartSection.classList.toggle("hidden");
    });

    this.fetchProducts();

    return appContainer;
  }
}
