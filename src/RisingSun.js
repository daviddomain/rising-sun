import styles from "./css/style.css?inline";
import registerCustomCSSProps from "../utilities/registerCustomCSSProps";
import intersectionObserver from "../utilities/intersectionObserver";

export class RisingSun extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get width() {
    return this.getAttribute("width");
  }

  get primaryColor() {
    return this.getAttribute("primary-color");
  }

  get secondaryColor() {
    return this.getAttribute("secondary-color");
  }

  get rootMargin() {
    return this.getAttribute("root-margin");
  }

  get scrollMargin() {
    return this.getAttribute("scroll-margin");
  }

  get threshold() {
    return this.getAttribute("threshold");
  }

  connectedCallback() {
    registerCustomCSSProps();

    this.shadowRoot.innerHTML = /* HTML */ `
      <style>
        ${styles}
      </style>
      <div id="sun"></div>
      <div id="background"></div>
      <div id="horizon"></div>
      <div id="reflection"></div>
    `;

    const observer = intersectionObserver(this.shadowRoot, {
      root: null,
      rootMargin: this.rootMargin || "0px",
      scrollMargin: this.scrollMargin || "0px",
      threshold: this.threshold || 0.5,
    });

    this.style.setProperty("--host-width", this.width);
    this.style.setProperty("--primary-color", this.primaryColor);
    this.style.setProperty("--secondary-color", this.secondaryColor);
  }
}

customElements.define("rising-sun", RisingSun);
