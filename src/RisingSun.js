import styles from './css/style.css?inline';
import Motion from '../utilities/motion.js';
import registerCustomCSSProps from '../utilities/registerCustomCSSProps';
import IntersectionObserverUtil from '../utilities/intersectionObserver';


export class RisingSun extends HTMLElement {
	#hostStyles;
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	get width() {
		return (
			this.getAttribute('width') ||
			this.#hostStyles.getPropertyValue('--host-width').trim()
		);
	}

	get primaryColor() {
		return (
			this.getAttribute('primary-color') ||
			this.#hostStyles.getPropertyValue('--primary-color').trim()
		);
	}

	get secondaryColor() {
		return (
			this.getAttribute('secondary-color') ||
			this.#hostStyles.getPropertyValue('--secondary-color').trim()
		);
	}

  	get backgroundColor() {
		return (
			this.getAttribute('background-color') ||
			this.#hostStyles.getPropertyValue('--background-color').trim()
		);
	}

	connectedCallback() {
		registerCustomCSSProps();

		this.shadowRoot.innerHTML = /* HTML */ `
			<style>
				${styles}
			</style>
			<div id="container">
				<div id="sun"></div>
				<div id="background"></div>
				<div id="horizon"></div>
				<div id="reflection"></div>
			</div>
		`;

		this.#hostStyles = getComputedStyle(this);
		const container = this.shadowRoot.querySelector('#container');
    const sun = this.shadowRoot.querySelector('#sun');
    const horizon = this.shadowRoot.querySelector('#horizon');
    const reflection = this.shadowRoot.querySelector('#reflection');
		const observer = new IntersectionObserverUtil(container, {
			root: null,
			rootMargin: "0px 0px 0px 0px",
			threshold: [0]
		});


    const sunAnimation = new Motion(sun)
    .rise({ duration: 2300, easing: "ease-out", fill: "forwards"})
    .gradientYMove({duration: 850, ease: "ease-out", fill: "forwards"})
    .gradientXMove({duration: 1400, ease: "ease-in", fill: "forwards"})
    .build()

    const horizonAnimation = new Motion(horizon)
    .growX({ duration: 1750, easing: "ease-out", fill: "forwards" })
    .reveal({ duration: 1000, easing: "ease-in", fill: "forwards", delay: 200 })
    .build();

    const reflectionAnimation = new Motion(reflection)
    .rise({ duration: 600, easing: "ease-out", fill: "forwards" })
    .scale({ duration: 1950, easing: "ease-out", fill: "forwards" })
    .growX({ duration: 1950, easing: "ease-out", fill: "forwards" })
    .reveal({ duration: 1200, easing: "ease-in", fill: "forwards", delay: 200 })
    .build();

    observer.onIntersect((entry) => { 
      console.log('is intersecting', entry);
        sunAnimation.play()
        horizonAnimation.play();
        reflectionAnimation.play();
    })
    
    observer.observe()

		this.style.setProperty('--host-width', this.width);
		this.style.setProperty('--primary-color', this.primaryColor);
		this.style.setProperty('--secondary-color', this.secondaryColor);
    this.style.setProperty('--background-color', this.backgroundColor);
	}
}

customElements.define('rising-sun', RisingSun);
