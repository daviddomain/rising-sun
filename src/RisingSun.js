import styles from "./css/style.css?inline";

export class RisingSun extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["width"];
  }

  get width() {
    return this.getAttribute("width");
  }
  set width(value) {
    this.setAttribute("width", value);
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
  }
}

customElements.define("rising-sun", RisingSun);
