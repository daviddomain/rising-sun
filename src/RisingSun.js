import styles from "./css/style.css?inline";

export class RisingSun extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["width", "primary-color"];
  }

  get width() {
    return this.getAttribute("width");
  }

  set width(value) {
    this.setAttribute("width", value);
  }

  get primaryColor() {
    return this.getAttribute("primary-color");
  }

  set primaryColor(value) {
    this.setAttribute("primary-color", this.primaryColor);
  }

  get secondaryColor() {
    return this.getAttribute("secondary-color");
  }

  set secondaryColor(value) {
    this.setAttribute("secondary-color", this.secondaryColor);
  }

  connectedCallback() {
    const customCssProperties = [
      {
        name: "--sun-gradient-y",
        syntax: "<percentage>",
        inherits: false,
        initialValue: "200%",
      },
      {
        name: "--sun-gradient-x",
        syntax: "<percentage>",
        inherits: false,
        initialValue: "5%",
      },
    ];
    if (CSS?.registerProperty) {
      try {
        customCssProperties.forEach((prop) => CSS.registerProperty(prop));
      } catch {}
    }

    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        ${styles}
      </style>
      <div id="sun"></div>
      <div id="background"></div>
      <div id="horizon"></div>
      <div id="reflection"></div>
    `;

    console.dir(this.shadowRoot);
    this.style.setProperty("--host-width", this.width);
    this.style.setProperty("--primary-color", this.primaryColor);
    this.style.setProperty("--secondary-color", this.secondaryColor);
  }
}

customElements.define("rising-sun", RisingSun);
