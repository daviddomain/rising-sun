export class RisingSun extends HTMLElement {
  connectedCallback() {
    const styles = /*css*/ `
      :host {
        display: block;
        padding: 16px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      p {
        color: #333;
        font-size: 16px;
        margin: 0;
      }
    `;
    this.innerHTML = /*html*/ `
      <style>${styles}</style>
      <p>Hello from RisingSun!</p>
    `;
  }
}

customElements.define("rising-sun", RisingSun);
