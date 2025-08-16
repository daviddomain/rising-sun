const intersectionObserver = (target, options = {}) => {
	const sun = target.querySelector('#sun');
	const horizon = target.querySelector('#horizon');
	const reflection = target.querySelector('#reflection');
	const targets = [sun, horizon, reflection];

	const callback = (entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// Element is (again) intersecting
				sun.style.animationPlayState = 'running';
				horizon.style.animationPlayState = 'running';
				reflection.style.animationPlayState = 'running';
				console.log('is intersecting');
			} else if (entry.intersectionRatio === 0) {
				// Element has left visible area completely

				console.log('sun is leaving visible area');
				//sun.style.animationPlayState = 'paused';

				// Optional: determine direction (up/down)
				// only makes sense if rootBounds exists (when root != null or in the viewport)
				if (entry.rootBounds) {
					const leavingTop =
						entry.boundingClientRect.top < entry.rootBounds.top;
					const leavingBottom =
						entry.boundingClientRect.bottom > entry.rootBounds.bottom;
					// do something with leavingTop / leavingBottom
					console.log('leavingTop:', leavingTop, 'leavingBottom:', leavingBottom);
          if (leavingTop || leavingBottom) {
            // Handle the case where the element is leaving the viewport
            console.log(document.getAnimations())
          }
				}
			}
		}
	};

	const observer = new IntersectionObserver(callback, options);
	for (const targetElement of targets) {
		observer.observe(targetElement);
	}
};

export default intersectionObserver;
