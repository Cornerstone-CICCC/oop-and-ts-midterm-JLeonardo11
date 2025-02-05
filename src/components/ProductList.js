import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  fetchProducts(category = "") {
    let url = "https://fakestoreapi.com/products";
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.state.products = data;
        this.update(); 
      })
      .catch((err) => console.error("Error fetching products:", err));
  }

  mount(container) {
    this.container = container;
    this.fetchProducts(); 
    this.container.appendChild(this.render());

    window.addEventListener("categoryChange", (event) => {
      this.fetchProducts(event.detail.category);
    });
  }

  update() {
    if (this.container) {
      this.container.innerHTML = ""; 
      this.container.appendChild(this.render());
    }
  }

  render() {
    const productList = document.createElement("div");
    productList.className = "product-list";

    this.state.products.forEach((product) => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
      });
      productList.appendChild(productItem.render());
    });

    return productList;
  }
}
