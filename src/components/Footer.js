import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("footer");
    footer.innerHTML = `<p>&copy; 2025 Corner🛒Shop</p>`;
    return footer;
  }
}
