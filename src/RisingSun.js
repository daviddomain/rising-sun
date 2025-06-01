export class RisingSun extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = /* HTML */ `
			<style>
				:host {
					display: grid;
					place-items: center;
				}
				#sun {
					width: 18rem;
					height: 9rem;
					background: #ff6160;
          background: radial-gradient(circle at top, #ffff80 0%, #ff6160 100%);
					border-radius: 9rem 9rem 0 0;
				}
				#horizon {
					width: 130%;

				}
				#horizon::before {
					content: '';
					display: block;
          border-top: 0.01rem solid #ffffff;
				}
				#horizon::after {
					content: '';
					display: block;
					height: 0.01rem;
					box-shadow: 0 8px 10px 0px #ff6160;
				}
				#reflection {
					width: 20rem;
					height: 10rem;
					background: #ff6160;
          background: radial-gradient(circle at bottom, #ffff80 0%, #ff6160 60%);
					border-radius: 0 0 10rem 10rem;
					filter: blur(2.25rem);
          zoom: 0.95;
				}
			</style>
			<div id="sun"></div>
			<div id="horizon"></div>
			<div id="reflection"></div>
		`;
	}
}

customElements.define('rising-sun', RisingSun);
