class IntersectionObserverUtil {
  observer;
  intersectionCallback = () => null
  outersectionCallback = () => null
  constructor(target, options = {}) {
    this.target = target;
    this.options = options;
  }

  observe() {
    if (Array.isArray(this.target)) {
      this.target.forEach(el => {
        this.observer = new IntersectionObserver(this.#callback.bind(this), this.options);
        this.observer.observe(el);
      });
    } else {
      this.observer = new IntersectionObserver(this.#callback.bind(this), this.options);
      this.observer.observe(this.target);
    }
    return this;
  }

  onIntersect(callback) {
    this.intersectionCallback = callback;
    return this;
  }

  onOutersect(callback) {
    this.outersectionCallback = callback;
    return this;
  }

  #callback(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.intersectionCallback(entry);
      } else if (entry.intersectionRatio === 0) {
        // Element has left visible area completely

        // Optional: determine direction (up/down)
        if (entry.rootBounds) {
          const leavingTop =
            entry.boundingClientRect.top < entry.rootBounds.top;
          const leavingBottom =
            entry.boundingClientRect.bottom > entry.rootBounds.bottom;
          if (leavingTop || leavingBottom) {
            // Handle the case where the element is leaving the viewport
            this.outersectionCallback({entry, leavingTop, leavingBottom});
          }
        }
      }
    }
  }
}

export default IntersectionObserverUtil;
