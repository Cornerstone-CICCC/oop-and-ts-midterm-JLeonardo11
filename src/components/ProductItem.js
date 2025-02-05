import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.state = {
      showFullDescription: false,  
    };
  }

  handleAddToCart() {
    this.props.cartContext.addProduct({
      id: this.props.product.id,
      name: this.props.product.title,
      price: this.props.product.price,
      description: this.props.product.description,
    });
  }

  limitDescription(description, wordLimit) {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  }

  toggleDescription() {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  }

  render() {
    const product = document.createElement("div");
    product.className = "product-item";

    const truncatedDescription = this.limitDescription(this.props.product.description, 30);

    const descriptionText = this.state.showFullDescription
      ? this.props.product.description
      : truncatedDescription;

    product.innerHTML = `
      <img src="${this.props.product.image}" alt="${this.props.product.title}" />
      <h3>${this.props.product.title}</h3>
      <p>${descriptionText}</p>
      <p>Price: $${this.props.product.price}</p>
      <button class="add-cart-btn">Add to Cart</button>
    `;

    // Add 'Read More' link if the description was truncated
    if (this.props.product.description.split(' ').length > 30) {
      const readMoreLink = document.createElement('button');
      readMoreLink.className = 'read-more-btn';
      readMoreLink.textContent = this.state.showFullDescription ? 'Show Less' : 'Read More';
      readMoreLink.addEventListener('click', this.toggleDescription);
      product.appendChild(readMoreLink);
    }

    product.querySelector(".add-cart-btn").addEventListener("click", this.handleAddToCart);

    return product;
  }
}
