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
		const rootMarginFromViewport =
			parseInt(this.width) - window.innerHeight / 2;

		const observer = new IntersectionObserverUtil(container, {
			root: null,
			rootMargin: this.rootMargin || `${rootMarginFromViewport}px 0px ${rootMarginFromViewport}px 0px`,
			threshold: [0, 0.8]
		});

    observer.onIntersect((entry) => { 
      console.log('is intersecting', entry);
        sun.style.animationPlayState = 'running';
        horizon.style.animationPlayState = 'running';
        reflection.style.animationPlayState = 'running';
    })

    observer.onOutersect(({entry, leavingTop, leavingBottom}) => {
      console.log('is leaving', entry);
      console.log('is leaving top', leavingTop);
      console.log('is leaving bottom', leavingBottom);
      sun.style.animationDirection = 'reverse';
      horizon.style.animationDirection = 'reverse';
      reflection.style.animationDirection = 'reverse';
    });

    observer.observe()

    console.log(observer)

		this.style.setProperty('--host-width', this.width);
		this.style.setProperty('--primary-color', this.primaryColor);
		this.style.setProperty('--secondary-color', this.secondaryColor);
	}
}

customElements.define('rising-sun', RisingSun);
